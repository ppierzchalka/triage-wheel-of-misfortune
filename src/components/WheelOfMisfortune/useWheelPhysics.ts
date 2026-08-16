import { useCallback, useEffect, useRef, useState } from 'react';
import type React from 'react';
import { normalizeAngle, segmentAtAngle, WHEEL_CENTER } from './wheelMath';

const FRAME_MS = 1000 / 60;
const FRICTION = 0.985;
const MIN_VELOCITY = 0.02;
const MAX_DRAG_VELOCITY = 45;
const MIN_FLING_VELOCITY = 12;
const MAX_FLING_VELOCITY = 30;
const VELOCITY_SMOOTHING = 0.55;

export type WheelPhysics = {
    groupRef: React.RefObject<SVGGElement | null>;
    isDragging: boolean;
    isSpinning: boolean;
    winnerIndex: number | null;
    pointerHandlers: {
        onPointerDown: (event: React.PointerEvent<SVGSVGElement>) => void;
        onPointerMove: (event: React.PointerEvent<SVGSVGElement>) => void;
        onPointerUp: (event: React.PointerEvent<SVGSVGElement>) => void;
        onPointerCancel: (event: React.PointerEvent<SVGSVGElement>) => void;
    };
    fling: () => void;
    dismissWinner: () => void;
    reset: () => void;
};

const pointerAngleAt = (clientX: number, clientY: number, target: SVGSVGElement): number => {
    const rect = target.getBoundingClientRect();
    const x = clientX - (rect.left + rect.width / 2);
    const y = clientY - (rect.top + rect.height / 2);
    return normalizeAngle((Math.atan2(x, -y) * 180) / Math.PI);
};

export const useWheelPhysics = (segmentCount: number): WheelPhysics => {
    const [isDragging, setIsDragging] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [winnerIndex, setWinnerIndex] = useState<number | null>(null);

    const groupRef = useRef<SVGGElement | null>(null);
    const angleRef = useRef(0);
    const velocityRef = useRef(0);
    const lastPointerAngleRef = useRef(0);
    const lastTimeRef = useRef(0);
    const rafRef = useRef<number | null>(null);
    const draggingRef = useRef(false);

    const applyAngle = (angle: number) => {
        groupRef.current?.setAttribute(
            'transform',
            `rotate(${angle} ${WHEEL_CENTER} ${WHEEL_CENTER})`
        );
    };

    const stopAnimation = useCallback(() => {
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    }, []);

    const settle = useCallback(() => {
        setWinnerIndex(segmentAtAngle(angleRef.current, segmentCount));
    }, [segmentCount]);

    const startSpin = useCallback(() => {
        stopAnimation();
        setIsSpinning(true);
        lastTimeRef.current = performance.now();
        const frame = (time: number) => {
            const dt = Math.max(time - lastTimeRef.current, 0.5);
            lastTimeRef.current = time;
            const frameDelta = dt / FRAME_MS;
            const velocity = velocityRef.current * Math.pow(FRICTION, frameDelta);
            velocityRef.current = velocity;
            angleRef.current = normalizeAngle(angleRef.current + velocity * frameDelta);
            applyAngle(angleRef.current);
            if (Math.abs(velocity) > MIN_VELOCITY) {
                rafRef.current = requestAnimationFrame(frame);
            } else {
                rafRef.current = null;
                setIsSpinning(false);
                settle();
            }
        };
        rafRef.current = requestAnimationFrame(frame);
    }, [settle, stopAnimation]);

    const onPointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
        if (isSpinning) {
            return;
        }
        stopAnimation();
        event.currentTarget.setPointerCapture(event.pointerId);
        draggingRef.current = true;
        setIsDragging(true);
        setWinnerIndex(null);
        velocityRef.current = 0;
        lastPointerAngleRef.current = pointerAngleAt(
            event.clientX,
            event.clientY,
            event.currentTarget
        );
        lastTimeRef.current = event.timeStamp;
    };

    const onPointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
        if (!draggingRef.current) {
            return;
        }
        const currentAngle = pointerAngleAt(event.clientX, event.clientY, event.currentTarget);
        let delta = currentAngle - lastPointerAngleRef.current;
        if (delta > 180) {
            delta -= 360;
        }
        if (delta < -180) {
            delta += 360;
        }
        lastPointerAngleRef.current = currentAngle;
        const dt = Math.max(event.timeStamp - lastTimeRef.current, 0.5);
        lastTimeRef.current = event.timeStamp;
        angleRef.current = normalizeAngle(angleRef.current + delta);
        applyAngle(angleRef.current);
        const instantVelocity = (delta * FRAME_MS) / dt;
        velocityRef.current =
            velocityRef.current * (1 - VELOCITY_SMOOTHING) + instantVelocity * VELOCITY_SMOOTHING;
        velocityRef.current = Math.max(
            Math.min(velocityRef.current, MAX_DRAG_VELOCITY),
            -MAX_DRAG_VELOCITY
        );
    };

    const endDrag = () => {
        if (!draggingRef.current) {
            return;
        }
        draggingRef.current = false;
        setIsDragging(false);
        if (Math.abs(velocityRef.current) > MIN_VELOCITY) {
            startSpin();
        } else {
            settle();
        }
    };

    const onPointerUp = () => {
        endDrag();
    };

    const onPointerCancel = () => {
        endDrag();
    };

    const fling = useCallback(() => {
        if (draggingRef.current || isSpinning) {
            return;
        }
        const direction = Math.random() < 0.5 ? -1 : 1;
        velocityRef.current =
            direction *
            (MIN_FLING_VELOCITY + Math.random() * (MAX_FLING_VELOCITY - MIN_FLING_VELOCITY));
        setWinnerIndex(null);
        startSpin();
    }, [isSpinning, startSpin]);

    const dismissWinner = useCallback(() => {
        setWinnerIndex(null);
    }, []);

    const reset = useCallback(() => {
        stopAnimation();
        angleRef.current = 0;
        velocityRef.current = 0;
        draggingRef.current = false;
        applyAngle(0);
        setIsDragging(false);
        setIsSpinning(false);
        setWinnerIndex(null);
    }, [stopAnimation]);

    useEffect(() => stopAnimation, [stopAnimation]);

    return {
        groupRef,
        isDragging,
        isSpinning,
        winnerIndex,
        pointerHandlers: {
            onPointerDown,
            onPointerMove,
            onPointerUp,
            onPointerCancel,
        },
        fling,
        dismissWinner,
        reset,
    };
};

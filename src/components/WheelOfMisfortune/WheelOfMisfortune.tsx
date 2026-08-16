import { Button } from '@heroui/react';
import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Placeholder } from './Placeholder';
import { Triangle } from './Triangle';
import { useWheelPhysics } from './useWheelPhysics';
import { WinnerDialog } from './WinnerDialog';
import {
    assignSegmentColors,
    buildWheelLabel,
    describeArc,
    FULL_TURN,
    HUB_RADIUS,
    PIN_DISTANCE,
    PIN_SIZE,
    polarToCartesian,
    shuffle,
    textColorFor,
    WHEEL_CENTER,
    WHEEL_RADIUS,
    WHEEL_SIZE,
    type WheelLabelLayout,
} from './wheelMath';
import type { WheelPhysics } from './useWheelPhysics';

export type WheelParticipant = {
    id: string;
    label: string;
};

export type WheelSegment = {
    id: string;
    name: string;
    color: string;
    textColor: string;
    path: string;
    startAngle: number;
    midAngle: number;
    label: WheelLabelLayout;
};

export type WheelOfMisfortuneProps = {
    participants: WheelParticipant[];
    onOpenDrawer: VoidFunction;
};

const MIN_PARTICIPANTS = 2;
const MAX_PARTICIPANTS = 49;

const buildSegments = (participants: WheelParticipant[]): WheelSegment[] => {
    const segmentAngle = FULL_TURN / participants.length;
    const colors = assignSegmentColors(participants.length);
    return participants.map((participant, index) => {
        const startAngle = index * segmentAngle;
        const midAngle = startAngle + segmentAngle / 2;
        const color = colors[index];
        return {
            id: participant.id,
            name: participant.label,
            color,
            textColor: textColorFor(color),
            path: describeArc(
                WHEEL_CENTER,
                WHEEL_CENTER,
                WHEEL_RADIUS,
                startAngle,
                startAngle + segmentAngle
            ),
            startAngle,
            midAngle,
            label: buildWheelLabel(participant.label, midAngle),
        };
    });
};

type WheelGraphicProps = {
    segments: WheelSegment[];
    physics: WheelPhysics;
};

const WheelGraphic = ({ segments, physics }: WheelGraphicProps) => {
    return (
        <div className={'relative h-full w-full'}>
            <Triangle
                className={
                    'absolute -top-8 left-1/2 z-10 w-10 -translate-x-1/2 rotate-180 drop-shadow-sm sm:w-12'
                }
                color1={'#6366f1'}
                color2={'#4f46e5'}
            />
            <svg
                className={`wof__svg h-full w-full${physics.isDragging ? ' wof__svg--dragging' : ''}`}
                viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
                role="img"
                aria-label="Wheel of misfortune"
                {...physics.pointerHandlers}
            >
                <g ref={physics.groupRef}>
                    {segments.map((segment, index) => (
                        <g
                            key={segment.id}
                            className={`wof__segment${
                                physics.winnerIndex === index ? ' wof__segment--winner' : ''
                            }`}
                        >
                            <path
                                d={segment.path}
                                fill={segment.color}
                                className={'wof__segment-path'}
                            />
                            {segment.label.lines.map((line, lineIndex) => {
                                const position = polarToCartesian(
                                    WHEEL_CENTER,
                                    WHEEL_CENTER,
                                    line.radius,
                                    segment.midAngle
                                );
                                return (
                                    <text
                                        key={lineIndex}
                                        className={'wof__label'}
                                        transform={`rotate(${segment.label.rotation} ${position.x} ${position.y})`}
                                        x={position.x}
                                        y={position.y}
                                        fontSize={line.fontSize}
                                        textAnchor="end"
                                        dominantBaseline="middle"
                                        fill={segment.textColor}
                                    >
                                        {line.text}
                                    </text>
                                );
                            })}
                        </g>
                    ))}
                    {segments.map((segment) => {
                        const pin = polarToCartesian(
                            WHEEL_CENTER,
                            WHEEL_CENTER,
                            PIN_DISTANCE,
                            segment.startAngle
                        );
                        return (
                            <circle
                                key={`pin-${segment.id}`}
                                className={'wof__pin'}
                                cx={pin.x}
                                cy={pin.y}
                                r={PIN_SIZE}
                            />
                        );
                    })}
                    <circle
                        className={'wof__hub'}
                        cx={WHEEL_CENTER}
                        cy={WHEEL_CENTER}
                        r={HUB_RADIUS}
                    />
                </g>
            </svg>
        </div>
    );
};

type MeasuredSquareProps = {
    children: ReactNode;
    className?: string;
};

const MeasuredSquare = ({ children, className }: MeasuredSquareProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [size, setSize] = useState(0);

    useLayoutEffect(() => {
        const element = containerRef.current;
        if (!element) {
            return;
        }
        const update = () => {
            setSize(Math.max(0, Math.min(element.clientWidth, element.clientHeight)));
        };
        update();
        if (typeof ResizeObserver === 'undefined') {
            return;
        }
        const observer = new ResizeObserver(update);
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className={className}>
            <div style={{ width: size || WHEEL_SIZE, height: size || WHEEL_SIZE }}>{children}</div>
        </div>
    );
};

export const WheelOfMisfortune = memo(({ participants, onOpenDrawer }: WheelOfMisfortuneProps) => {
    const [round, setRound] = useState(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- round forces a reshuffle
    const shuffled = useMemo(() => shuffle(participants), [participants, round]);

    const isWheelVisible =
        shuffled.length >= MIN_PARTICIPANTS && shuffled.length <= MAX_PARTICIPANTS;

    const segments = useMemo(
        () => (isWheelVisible ? buildSegments(shuffled) : []),
        [shuffled, isWheelVisible]
    );
    const physics = useWheelPhysics(segments.length);
    const winner = physics.winnerIndex !== null ? segments[physics.winnerIndex] : null;

    useEffect(() => {
        physics.reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps -- reset only on reshuffle
    }, [round]);

    return (
        <div className="flex w-full flex-1 min-h-0 flex-col items-center">
            {isWheelVisible ? (
                <MeasuredSquare className="flex h-full w-full min-h-0 flex-1 items-center justify-center">
                    <WheelGraphic segments={segments} physics={physics} />
                </MeasuredSquare>
            ) : (
                <div className="flex h-full w-full min-h-0 flex-1 items-center justify-center">
                    <Placeholder onOpenDrawer={onOpenDrawer} />
                </div>
            )}
            {isWheelVisible && (
                <div className={'mt-4 flex shrink-0 flex-col items-center gap-2'}>
                    <p className="text-sm text-muted">Grab the wheel and spin it, or:</p>
                    <Button
                        variant="primary"
                        onPress={physics.fling}
                        isDisabled={physics.isSpinning || physics.isDragging}
                        className="min-w-44"
                    >
                        Give it a spin
                    </Button>
                </div>
            )}
            <WinnerDialog
                winner={winner}
                onClose={physics.dismissWinner}
                onSpinAgain={() => setRound((currentRound) => currentRound + 1)}
            />
        </div>
    );
});

WheelOfMisfortune.displayName = 'WheelOfMisfortune';

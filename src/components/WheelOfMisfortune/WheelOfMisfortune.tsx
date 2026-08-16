import { Button } from '@heroui/react';
import { memo, useMemo, useState } from 'react';
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

type WheelSurfaceProps = {
    participants: WheelParticipant[];
    onSpinAgain: VoidFunction;
};

const WheelSurface = ({ participants, onSpinAgain }: WheelSurfaceProps) => {
    const segments = useMemo(() => buildSegments(participants), [participants]);
    const physics = useWheelPhysics(segments.length);
    const winner = physics.winnerIndex !== null ? segments[physics.winnerIndex] : null;

    return (
        <div className={'flex flex-col items-center'}>
            <div className={'relative'}>
                <Triangle
                    className={
                        'absolute -top-9 left-1/2 z-10 w-12 -translate-x-1/2 rotate-180 drop-shadow-sm'
                    }
                    color1={'#6366f1'}
                    color2={'#4f46e5'}
                />
                <svg
                    className={`wof__svg max-w-[86vw] sm:max-w-none${physics.isDragging ? ' wof__svg--dragging' : ''}`}
                    width={WHEEL_SIZE}
                    height={WHEEL_SIZE}
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
            <div className={'mt-6 flex flex-col items-center gap-2'}>
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
            <WinnerDialog
                winner={winner}
                onClose={physics.dismissWinner}
                onSpinAgain={onSpinAgain}
            />
        </div>
    );
};

export const WheelOfMisfortune = memo(({ participants, onOpenDrawer }: WheelOfMisfortuneProps) => {
    const [round, setRound] = useState(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- round forces a reshuffle
    const shuffled = useMemo(() => shuffle(participants), [participants, round]);

    if (shuffled.length < MIN_PARTICIPANTS || shuffled.length > MAX_PARTICIPANTS) {
        return (
            <div className={'flex flex-col items-center'}>
                <Placeholder onOpenDrawer={onOpenDrawer} />
            </div>
        );
    }

    return (
        <WheelSurface
            key={round}
            participants={shuffled}
            onSpinAgain={() => setRound((currentRound) => currentRound + 1)}
        />
    );
});

WheelOfMisfortune.displayName = 'WheelOfMisfortune';

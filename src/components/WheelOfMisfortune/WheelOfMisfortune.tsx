import { Button, Slider, Typography } from '@material-ui/core';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Winwheel from 'winwheel';
import { Triangle } from './Triangle';

export enum SpinDirection {
    Clockwise = 'clockwise',
    CounterClockwise = 'counterclockwise',
}
export enum SettingType {
    Duration = 'duration',
    Spins = 'spins',
}
export type Participant = {
    text: string;
    fillStyle: string;
};
export type Participants = Participant[];

export type WheelOfMisfortuneProps = {
    participants: Participants;
};

export const WheelOfMisfortune: React.FC<WheelOfMisfortuneProps> = ({ participants }) => {
    const [hasBeenSpinned, setHasBeenSpinned] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>(10);
    const [spins, setSpins] = useState<number>(10);
    const winWheelRef = useRef<Winwheel | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const spin = () => {
        if (winWheelRef.current !== null && !hasBeenSpinned) {
            winWheelRef.current.startAnimation();
            setHasBeenSpinned(true);
        }
    };

    const reset = () => {
        if (winWheelRef.current !== null && hasBeenSpinned) {
            winWheelRef.current.stopAnimation();
            setHasBeenSpinned(false);
        }
    };

    const setSliderValue = (value: number, settingType: SettingType) => {
        switch (settingType) {
            case 'duration':
                setDuration(value);
                break;
            case 'spins':
                setSpins(value);
                break;
        }
    };

    useEffect(() => {
        if (canvasRef?.current) {
            winWheelRef.current = new Winwheel({
                canvasId: canvasRef.current.id,
                outerRadius: 200,
                textFontSize: 15,
                textAlignment: 'center',
                numSegments: participants.length,
                segments: participants,
                animation: {
                    type: 'spinToStop',
                    easing: 'Power4.easeOut',
                    duration,
                    spins,
                },
                pins: {
                    number: participants.length,
                    fillStyle: 'silver',
                    outerRadius: 5,
                },
            });
        }
    }, [participants, winWheelRef, canvasRef, hasBeenSpinned, duration, spins]);

    return (
        <div className={'wof__container'}>
            <div className={'wof-canvas__wrapper'}>
                <Triangle className={'wof__pointer'} color1={'#ff7961'} color2={'#f44336'} />
                <canvas ref={canvasRef} id={'wof-canvas'} width="402" height="402" />
            </div>
            <div className={'wof-settings__wrapper'}>
                <Typography gutterBottom>Duration</Typography>
                <Slider
                    value={duration}
                    valueLabelDisplay="auto"
                    min={1}
                    max={50}
                    onChange={(_event: ChangeEvent<{}>, value: number | number[]) =>
                        setSliderValue(value as number, SettingType.Duration)
                    }
                />
                <Typography gutterBottom>Spins</Typography>
                <Slider
                    value={spins}
                    valueLabelDisplay="auto"
                    min={1}
                    max={50}
                    onChange={(_event: ChangeEvent<{}>, value: number | number[]) =>
                        setSliderValue(value as number, SettingType.Spins)
                    }
                />
                <Button
                    classes={{ root: 'wof-settings__button' }}
                    color="primary"
                    variant="contained"
                    disabled={hasBeenSpinned}
                    onClick={spin}
                >
                    Spin the Wheel
                </Button>
                <Button
                    classes={{ root: 'wof-settings__button' }}
                    color="primary"
                    variant="contained"
                    disabled={!hasBeenSpinned}
                    onClick={reset}
                >
                    Reset
                </Button>
            </div>
        </div>
    );
};

// const { members, teams, selection: selectionData } = useSelector(
//     (state: RootStateType) => state
// );
// const participants = useSelection(members, teams, selectionData);

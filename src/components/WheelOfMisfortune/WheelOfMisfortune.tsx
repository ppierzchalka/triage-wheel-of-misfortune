import { Button, Slider, Typography } from '@material-ui/core';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Winwheel from 'winwheel';
import { Placeholder } from './Placeholder';
import { Triangle } from './Triangle';
import { randomInt } from './utils';

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
    const [duration, setDuration] = useState<number>(3);
    const [spins, setSpins] = useState<number>(4);
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
                outerRadius: 185,
                textFontSize: 13,
                textAlignment: 'center',
                numSegments: participants.length,
                segments: participants,
                animation: {
                    type: 'spinToStop',
                    easing: 'Power4.easeOut',
                    duration: randomInt(duration, 10),
                    spins: randomInt(spins, 10),
                },
                pins: {
                    number: participants.length,
                    fillStyle: 'silver',
                    outerRadius: 5,
                },
            });
        }
    }, [participants, winWheelRef, canvasRef, hasBeenSpinned, duration, spins]);

    useEffect(() => {
        reset();
        // eslint-disable-next-line
    }, [participants]);

    return (
        <div className={'wof__container'}>
            {participants.length >= 2 && participants.length < 50 ? (
                <React.Fragment>
                    <div className={'wof-canvas__wrapper'}>
                        <Triangle
                            className={'wof__pointer'}
                            color1={'#ff7961'}
                            color2={'#f44336'}
                        />
                        <canvas ref={canvasRef} id={'wof-canvas'} width="380" height="380" />
                    </div>
                    <div className={'wof-settings__wrapper'}>
                        <Typography gutterBottom>Duration</Typography>
                        <Slider
                            value={duration}
                            valueLabelDisplay="auto"
                            min={1}
                            max={10}
                            onChange={(_event: ChangeEvent<{}>, value: number | number[]) =>
                                setSliderValue(value as number, SettingType.Duration)
                            }
                        />
                        <Typography gutterBottom>Spins</Typography>
                        <Slider
                            value={spins}
                            valueLabelDisplay="auto"
                            min={1}
                            max={10}
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
                </React.Fragment>
            ) : (
                <Placeholder />
            )}
        </div>
    );
};

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Winwheel from 'winwheel';
import { RootStateType } from '../../reducers';
import pointer from './basic_pointer.png';
import { useSelection } from './useSelection';
import { getRandomColor } from './utils';

export const WheelOfMisfortuneWrapper: React.FC = () => {
    const [hasBeenSpinned, setHasBeenSpinned] = useState<boolean>(false);
    const winWheelRef = useRef<Winwheel | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const { members, teams, selection: selectionData } = useSelector(
        (state: RootStateType) => state
    );
    const participants = useSelection(members, teams, selectionData);

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

    useEffect(() => {
        if (canvasRef?.current) {
            winWheelRef.current = new Winwheel({
                canvasId: canvasRef.current.id,
                outerRadius: 200,
                textFontSize: 15,
                textAlignment: 'center',
                numSegments: 5,
                segments: [
                    { fillStyle: getRandomColor(), text: 'Michał' },
                    { fillStyle: getRandomColor(), text: 'Krzysiek' },
                    { fillStyle: getRandomColor(), text: 'Jacek' },
                    { fillStyle: getRandomColor(), text: 'Piotrek' },
                    { fillStyle: getRandomColor(), text: 'Łukasz' },
                ],
                animation: {
                    type: 'spinToStop',
                    duration: 10, // slider
                    spins: 10, // slider
                    easing: 'Power4.easeOut',
                    direction: 'clockwise', // toggle / button group
                },
                pins: {
                    number: 5,
                    fillStyle: 'silver',
                    outerRadius: 5,
                },
            });
        }
    }, [participants, winWheelRef, canvasRef, hasBeenSpinned]);

    return (
        <div className={'winwheel__container'}>
            <div className={'winwheel-canvas__wrapper'}>
                <img src={pointer} alt="pointer" className={'winwheel__pointer'} />
                <canvas ref={canvasRef} id={'winwheel-canvas'} width="400" height="400" />
            </div>
            <button onClick={spin}>Spin the Wheel</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
};

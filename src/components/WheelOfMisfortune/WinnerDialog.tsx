import { Button } from '@heroui/react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Modal } from '../overlay/Modal';
import { textColorFor } from './wheelMath';
import type { WheelSegment } from './WheelOfMisfortune';

export type WinnerDialogProps = {
    winner: WheelSegment | null;
    onClose: VoidFunction;
    onSpinAgain: VoidFunction;
};

export const WinnerDialog: React.FC<WinnerDialogProps> = ({ winner, onClose, onSpinAgain }) => {
    useEffect(() => {
        if (winner) {
            try {
                confetti({
                    particleCount: 140,
                    spread: 70,
                    startVelocity: 40,
                    origin: { y: 0.7 },
                    colors: [winner.color, '#6366f1', '#0ea5e9'],
                });
            } catch {
                // canvas-confetti is unavailable in test environments
            }
        }
    }, [winner]);

    return (
        <Modal isOpen={winner !== null} onClose={onClose} size="sm">
            {winner && (
                <motion.div
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    className="flex flex-col items-center gap-4 p-6 text-center sm:p-8"
                >
                    <p className="text-xs font-medium uppercase tracking-widest text-muted">
                        The lucky winner is
                    </p>
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 240, damping: 16, delay: 0.1 }}
                        className="flex size-36 items-center justify-center rounded-full shadow-lg ring-4 ring-white/25 sm:size-40"
                        style={{ background: winner.color }}
                    >
                        <span
                            className="winner-name break-words px-6 text-lg font-semibold sm:text-xl"
                            style={{ color: textColorFor(winner.color) }}
                        >
                            {winner.name}
                        </span>
                    </motion.div>
                    <div className="flex w-full justify-center gap-2">
                        <Button variant="ghost" onPress={onClose}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onPress={() => {
                                onClose();
                                onSpinAgain();
                            }}
                        >
                            Spin again
                        </Button>
                    </div>
                </motion.div>
            )}
        </Modal>
    );
};

import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import type { ReactNode } from 'react';

export type DrawerProps = {
    isOpen: boolean;
    onClose: VoidFunction;
    children: ReactNode;
};

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        if (!isOpen) {
            return;
        }
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div
                        className="absolute inset-0 bg-backdrop"
                        onClick={onClose}
                        aria-hidden="true"
                    />
                    <motion.aside
                        role="dialog"
                        aria-modal="true"
                        aria-label="Participants"
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'tween', duration: 0.22, ease: 'easeOut' }}
                        className="absolute left-0 top-0 flex h-full w-full flex-col border-r border-border bg-overlay text-overlay-foreground sm:max-w-96"
                    >
                        {children}
                    </motion.aside>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

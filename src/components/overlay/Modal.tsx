import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import type { ReactNode } from 'react';

export type ModalProps = {
    isOpen: boolean;
    onClose: VoidFunction;
    title?: string;
    children: ReactNode;
    size?: 'sm' | 'md';
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
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
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-backdrop p-4 sm:items-center sm:p-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    onClick={onClose}
                >
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={title}
                        onClick={(event) => event.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.96, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 12 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className={`flex max-h-[90vh] w-full flex-col overflow-hidden rounded-2xl border border-border bg-overlay text-overlay-foreground shadow-xl ${
                            size === 'sm' ? 'max-w-sm' : 'max-w-lg'
                        }`}
                    >
                        {title && (
                            <div className="flex items-center justify-between border-b border-border px-5 py-3">
                                <h2 className="text-base font-semibold">{title}</h2>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    aria-label="Close"
                                    className="rounded-lg p-1.5 text-muted transition hover:bg-background-secondary hover:text-foreground"
                                >
                                    <X className="size-4" />
                                </button>
                            </div>
                        )}
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

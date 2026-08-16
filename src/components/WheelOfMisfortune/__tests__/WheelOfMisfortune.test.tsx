import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { WheelOfMisfortune } from '../WheelOfMisfortune';

const participants = [
    { id: '1', label: 'John Doe' },
    { id: '2', label: 'Jane Doe' },
    { id: '3', label: 'Jack Doe' },
];

const noop = () => {};

describe('WheelOfMisfortune', () => {
    it('renders all participants and the spin button', () => {
        render(<WheelOfMisfortune participants={participants} onOpenDrawer={noop} />);
        for (const participant of participants) {
            expect(screen.getByText(participant.label.split(' ')[0])).toBeInTheDocument();
        }
        expect(screen.getByRole('button', { name: 'Give it a spin' })).toBeInTheDocument();
    });

    it('renders an empty state when there are too few participants', () => {
        render(
            <WheelOfMisfortune
                participants={[{ id: '1', label: 'Solo Dev' }]}
                onOpenDrawer={noop}
            />
        );
        expect(screen.getByText('No participants yet')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Give it a spin' })).not.toBeInTheDocument();
    });

    it('renders an empty state when there are too many participants', () => {
        const many = Array.from({ length: 50 }, (_, index) => ({
            id: String(index),
            label: `Dev ${index}`,
        }));
        render(<WheelOfMisfortune participants={many} onOpenDrawer={noop} />);
        expect(screen.getByText('No participants yet')).toBeInTheDocument();
    });

    it('opens the participants drawer via the empty state button', () => {
        const onOpenDrawer = vi.fn();
        render(
            <WheelOfMisfortune
                participants={[{ id: '1', label: 'Solo Dev' }]}
                onOpenDrawer={onOpenDrawer}
            />
        );
        screen.getByRole('button', { name: 'Add participants' }).click();
        expect(onOpenDrawer).toHaveBeenCalledTimes(1);
    });
});

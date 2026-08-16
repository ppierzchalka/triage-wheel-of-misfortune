import { render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { App } from '../App';

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
});

describe('App', () => {
    it('renders the header, guide and empty state', () => {
        render(<App />);
        expect(
            screen.getByRole('heading', { name: 'Triage Wheel of Misfortune' })
        ).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'How to use it?' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'How to use it?' })).toBeInTheDocument();
        expect(screen.getByText('No participants yet')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Add participants' })).toBeInTheDocument();
    });
});

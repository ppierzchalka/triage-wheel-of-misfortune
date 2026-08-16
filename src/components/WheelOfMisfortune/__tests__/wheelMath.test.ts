import { describe, expect, it } from 'vitest';
import {
    assignSegmentColors,
    buildWheelLabel,
    hueDistance,
    normalizeAngle,
    segmentAtAngle,
    shuffle,
    textColorFor,
    truncateLabel,
    describeArc,
    polarToCartesian,
    WHEEL_COLORS,
} from '../wheelMath';

describe('normalizeAngle', () => {
    it('keeps angles in range', () => {
        expect(normalizeAngle(90)).toBe(90);
    });

    it('wraps negative angles', () => {
        expect(normalizeAngle(-90)).toBe(270);
    });

    it('wraps angles over a full turn', () => {
        expect(normalizeAngle(370)).toBe(10);
    });

    it('normalizes full turns to zero', () => {
        expect(normalizeAngle(720)).toBe(0);
    });
});

describe('polarToCartesian', () => {
    it('maps zero degrees to the top', () => {
        const point = polarToCartesian(100, 100, 50, 0);
        expect(point.x).toBeCloseTo(100);
        expect(point.y).toBeCloseTo(50);
    });

    it('maps 90 degrees to the right', () => {
        const point = polarToCartesian(100, 100, 50, 90);
        expect(point.x).toBeCloseTo(150);
        expect(point.y).toBeCloseTo(100);
    });
});

describe('describeArc', () => {
    it('builds a wedge path', () => {
        const path = describeArc(100, 100, 50, 0, 90);
        expect(path).toMatch(/^M 100 100 L 100 50 A 50 50 0 0 1 150 100 Z$/);
    });
});

describe('segmentAtAngle', () => {
    it('returns the first segment when wheel is not rotated', () => {
        expect(segmentAtAngle(0, 4)).toBe(0);
    });

    it('returns the segment under the pointer for a rotated wheel', () => {
        expect(segmentAtAngle(90, 4)).toBe(3);
    });

    it('handles multi-turn angles', () => {
        expect(segmentAtAngle(450, 4)).toBe(3);
    });

    it('stays in bounds near a full turn', () => {
        expect(segmentAtAngle(359.99, 4)).toBe(0);
    });

    it('returns -1 when there are no segments', () => {
        expect(segmentAtAngle(42, 0)).toBe(-1);
    });
});

describe('shuffle', () => {
    it('returns a permutation of the input', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        const output = shuffle(input);
        expect(output).toHaveLength(input.length);
        expect([...output].sort()).toEqual([...input].sort());
    });

    it('does not mutate the input', () => {
        const input = [1, 2, 3, 4];
        shuffle(input);
        expect(input).toEqual([1, 2, 3, 4]);
    });
});

describe('truncateLabel', () => {
    it('truncates long labels with an ellipsis', () => {
        expect(truncateLabel('Very Long Name', 8)).toBe('Very Lo…');
    });

    it('keeps short labels intact', () => {
        expect(truncateLabel('Short', 8)).toBe('Short');
    });
});

describe('assignSegmentColors', () => {
    it('returns nothing for zero segments', () => {
        expect(assignSegmentColors(0)).toEqual([]);
    });

    it('uses only colors from the wheel palette', () => {
        const paletteHexes = new Set(WHEEL_COLORS.map((color) => color.hex));
        for (const hex of assignSegmentColors(30)) {
            expect(paletteHexes.has(hex)).toBe(true);
        }
    });

    it('keeps adjacent segments visually distinct for all supported sizes', () => {
        for (let count = 2; count <= 49; count += 1) {
            const colors = assignSegmentColors(count);
            for (let i = 1; i < colors.length; i += 1) {
                const previous = WHEEL_COLORS.find((color) => color.hex === colors[i - 1])!;
                const current = WHEEL_COLORS.find((color) => color.hex === colors[i])!;
                expect(hueDistance(previous.hue, current.hue)).toBeGreaterThanOrEqual(40);
            }
        }
    });
});

describe('textColorFor', () => {
    it('uses dark text on bright colors', () => {
        expect(textColorFor('#eab308')).toBe('#0b0e14');
    });

    it('uses light text on dark colors', () => {
        expect(textColorFor('#8b5cf6')).toBe('#f4f7ff');
    });
});

describe('buildWheelLabel', () => {
    it('splits names into two radial lines', () => {
        const label = buildWheelLabel('John Kowalski', 0);
        expect(label.lines).toHaveLength(2);
        expect(label.lines[0].text).toBe('John');
        expect(label.lines[1].text).toBe('Kowalski');
    });

    it('places the first name near the rim and the last name right after it', () => {
        const label = buildWheelLabel('John Kowalski', 0);
        expect(label.lines[0].radius).toBeGreaterThan(label.lines[1].radius);
        const firstNameWidth = label.lines[0].text.length * label.lines[0].fontSize * 0.62;
        expect(label.lines[1].radius).toBeCloseTo(label.lines[0].radius - firstNameWidth, 1);
    });

    it('uses a single line when there is no last name', () => {
        const label = buildWheelLabel('Madonna', 0);
        expect(label.lines).toHaveLength(1);
        expect(label.lines[0].text).toBe('Madonna');
    });

    it('sizes the font to fit long names within the slot', () => {
        const long = buildWheelLabel('Aleksander Kowalczyk', 0);
        const short = buildWheelLabel('Ann Lee', 0);
        expect(long.lines[0].fontSize).toBeLessThanOrEqual(short.lines[0].fontSize);
        expect(long.lines[0].fontSize).toBeGreaterThanOrEqual(7);
    });

    it('keeps a uniform radial orientation around the whole wheel', () => {
        for (const midAngle of [0, 45, 90, 135, 180, 225, 270, 315]) {
            const label = buildWheelLabel('John Doe', midAngle);
            expect(normalizeAngle(label.rotation)).toBe(normalizeAngle(midAngle - 90));
        }
    });
});

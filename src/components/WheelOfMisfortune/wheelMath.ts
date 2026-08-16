export const FULL_TURN = 360;
export const WHEEL_SIZE = 380;
export const WHEEL_CENTER = WHEEL_SIZE / 2;
export const WHEEL_RADIUS = 174;
export const PIN_DISTANCE = WHEEL_RADIUS + 8;
export const PIN_SIZE = 3.5;
export const HUB_RADIUS = 34;

export type PaletteColor = {
    hex: string;
    hue: number;
};

export const WHEEL_COLORS: PaletteColor[] = [
    { hex: '#6366f1', hue: 239 },
    { hex: '#0ea5e9', hue: 199 },
    { hex: '#10b981', hue: 158 },
    { hex: '#f59e0b', hue: 38 },
    { hex: '#ef4444', hue: 0 },
    { hex: '#8b5cf6', hue: 259 },
    { hex: '#06b6d4', hue: 187 },
    { hex: '#f97316', hue: 25 },
    { hex: '#84cc16', hue: 78 },
    { hex: '#ec4899', hue: 330 },
    { hex: '#14b8a6', hue: 173 },
    { hex: '#3b82f6', hue: 217 },
    { hex: '#eab308', hue: 53 },
    { hex: '#22c55e', hue: 142 },
];

const MIN_ADJACENT_HUE_DISTANCE = 40;

export const normalizeAngle = (angle: number): number =>
    ((angle % FULL_TURN) + FULL_TURN) % FULL_TURN;

export const hueDistance = (a: number, b: number): number => {
    const diff = Math.abs(a - b) % FULL_TURN;
    return Math.min(diff, FULL_TURN - diff);
};

export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const normalized = hex.replace('#', '');
    const value = parseInt(normalized, 16);
    return {
        r: (value >> 16) & 255,
        g: (value >> 8) & 255,
        b: value & 255,
    };
};

export const textColorFor = (hex: string): string => {
    const { r, g, b } = hexToRgb(hex);
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance > 150 ? '#0b0e14' : '#f4f7ff';
};

export const assignSegmentColors = (count: number): string[] => {
    if (count <= 0) {
        return [];
    }
    const result: string[] = [WHEEL_COLORS[0].hex];
    let previousHue = WHEEL_COLORS[0].hue;
    const lastUsedAt = new Array<number>(WHEEL_COLORS.length).fill(-Infinity);
    lastUsedAt[0] = 0;

    for (let i = 1; i < count; i += 1) {
        let bestIndex = -1;
        let bestScore = -Infinity;
        for (let j = 0; j < WHEEL_COLORS.length; j += 1) {
            const distance = hueDistance(WHEEL_COLORS[j].hue, previousHue);
            if (distance < MIN_ADJACENT_HUE_DISTANCE) {
                continue;
            }
            const recencyBonus = Math.min(i - lastUsedAt[j], 4) * 25;
            const score = distance + recencyBonus;
            if (score > bestScore) {
                bestScore = score;
                bestIndex = j;
            }
        }
        if (bestIndex === -1) {
            bestIndex = i % WHEEL_COLORS.length;
        }
        result.push(WHEEL_COLORS[bestIndex].hex);
        lastUsedAt[bestIndex] = i;
        previousHue = WHEEL_COLORS[bestIndex].hue;
    }
    return result;
};

export const polarToCartesian = (
    cx: number,
    cy: number,
    radius: number,
    angleDeg: number
): { x: number; y: number } => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
        x: cx + radius * Math.sin(rad),
        y: cy - radius * Math.cos(rad),
    };
};

export const describeArc = (
    cx: number,
    cy: number,
    radius: number,
    startAngle: number,
    endAngle: number
): string => {
    const start = polarToCartesian(cx, cy, radius, startAngle);
    const end = polarToCartesian(cx, cy, radius, endAngle);
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
};

export const segmentAtAngle = (wheelAngle: number, segmentCount: number): number => {
    if (segmentCount <= 0) {
        return -1;
    }
    const segmentAngle = FULL_TURN / segmentCount;
    const pointerAngleOnWheel = normalizeAngle(FULL_TURN - wheelAngle);
    return Math.min(Math.floor(pointerAngleOnWheel / segmentAngle), segmentCount - 1);
};

export const shuffle = <T>(items: readonly T[]): T[] => {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export const truncateLabel = (label: string, maxLength: number): string =>
    label.length > maxLength ? `${label.slice(0, maxLength - 1)}…` : label;

export type WheelLabelLine = {
    text: string;
    radius: number;
    fontSize: number;
};

export type WheelLabelLayout = {
    lines: WheelLabelLine[];
    rotation: number;
};

const MIN_LABEL_FONT_SIZE = 7;
const MAX_LABEL_FONT_SIZE = 15;
const LABEL_MARGIN = 8;
const CHAR_WIDTH_RATIO = 0.62;

const fitFontSize = (text: string, band: number): number =>
    Math.max(
        MIN_LABEL_FONT_SIZE,
        Math.min(MAX_LABEL_FONT_SIZE, Math.floor(band / (CHAR_WIDTH_RATIO * text.length)))
    );

const textWidth = (text: string, fontSize: number): number =>
    text.length * fontSize * CHAR_WIDTH_RATIO;

export const buildWheelLabel = (fullName: string, midAngle: number): WheelLabelLayout => {
    const [firstName, ...rest] = fullName.trim().split(/\s+/);
    const lastName = rest.join(' ');
    const span = WHEEL_RADIUS - HUB_RADIUS - LABEL_MARGIN * 2;
    const rimRadius = HUB_RADIUS + LABEL_MARGIN + span;

    const texts =
        firstName && lastName
            ? [truncateLabel(firstName, 14), truncateLabel(lastName, 14)]
            : [truncateLabel(fullName || '?', 14)];

    if (texts.length === 2) {
        const band = span / 2;
        let firstNameFontSize = fitFontSize(texts[0], band);
        let lastNameFontSize = fitFontSize(texts[1], band);
        let firstNameWidth = textWidth(texts[0], firstNameFontSize);
        const lastNameWidth = textWidth(texts[1], lastNameFontSize);
        if (firstNameWidth + lastNameWidth > span) {
            const scale = span / (firstNameWidth + lastNameWidth);
            firstNameFontSize = Math.max(
                MIN_LABEL_FONT_SIZE,
                Math.floor(firstNameFontSize * scale)
            );
            lastNameFontSize = Math.max(MIN_LABEL_FONT_SIZE, Math.floor(lastNameFontSize * scale));
            firstNameWidth = textWidth(texts[0], firstNameFontSize);
        }
        return {
            lines: [
                { text: texts[0], radius: rimRadius, fontSize: firstNameFontSize },
                { text: texts[1], radius: rimRadius - firstNameWidth, fontSize: lastNameFontSize },
            ],
            rotation: midAngle - 90,
        };
    }

    return {
        lines: [{ text: texts[0], radius: rimRadius, fontSize: fitFontSize(texts[0], span) }],
        rotation: midAngle - 90,
    };
};

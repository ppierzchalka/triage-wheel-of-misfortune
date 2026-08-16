import { memo } from 'react';

const STEPS = [
    {
        number: '01',
        title: 'Add participants',
        text: 'Open the drawer and paste a list of names, or create teams with chips.',
    },
    {
        number: '02',
        title: 'Select who plays',
        text: 'Tick individual members or whole teams in the drawer.',
    },
    {
        number: '03',
        title: 'Spin the wheel',
        text: 'Grab and fling it, or hit the button. Names shuffle every round.',
    },
];

export const Guide = memo(() => {
    return (
        <section className="w-full max-w-3xl">
            <h2 className="mb-3 text-lg font-semibold tracking-tight">How to use it?</h2>
            <div className="grid gap-3 sm:grid-cols-3">
                {STEPS.map((step) => (
                    <div
                        key={step.number}
                        className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-4"
                    >
                        <span className="text-xs font-semibold tabular-nums text-accent">
                            {step.number}
                        </span>
                        <h3 className="text-sm font-semibold">{step.title}</h3>
                        <p className="text-xs leading-relaxed text-muted">{step.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
});

Guide.displayName = 'Guide';

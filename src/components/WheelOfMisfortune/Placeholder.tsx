import { Button } from '@heroui/react';
import { UserPlus, Users } from 'lucide-react';

export type PlaceholderProps = {
    onOpenDrawer: VoidFunction;
};

export const Placeholder: React.FC<PlaceholderProps> = ({ onOpenDrawer }) => {
    return (
        <div className="flex w-full max-w-sm flex-col items-center gap-5 rounded-2xl border border-border bg-surface p-10 text-center shadow-sm">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-accent/10">
                <Users className="size-8 text-accent" />
            </div>
            <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-semibold">No participants yet</h3>
                <p className="text-sm leading-relaxed text-muted">
                    Add your teammates and select who enters the lottery — the wheel will appear
                    here.
                </p>
            </div>
            <Button variant="primary" className="gap-2" onPress={onOpenDrawer}>
                <UserPlus className="size-4" />
                Add participants
            </Button>
        </div>
    );
};

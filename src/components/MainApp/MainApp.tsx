import { Info } from 'lucide-react';
import { useState } from 'react';
import { useMembers, useSelectionState, useTeams } from '../../state/store';
import { Guide, GuideSteps } from '../Guide/Guide';
import { Modal } from '../overlay/Modal';
import { useSelection } from '../WheelOfMisfortune/useSelection';
import { WheelOfMisfortune } from '../WheelOfMisfortune/WheelOfMisfortune';

export type MainAppProps = {
    onOpenDrawer: VoidFunction;
};

export const MainApp: React.FC<MainAppProps> = ({ onOpenDrawer }) => {
    const members = useMembers();
    const teams = useTeams();
    const { selection, selectionType } = useSelectionState();
    const participants = useSelection(members, teams, selection, selectionType);
    const [isGuideOpen, setIsGuideOpen] = useState(false);

    return (
        <main className="min-h-0 w-full flex-1 overflow-hidden">
            <div className="mx-auto flex h-full w-full max-w-6xl flex-col items-center gap-4 px-4 py-4 lg:flex-row lg:items-stretch lg:gap-8">
                <div className="flex min-h-0 w-full flex-1 flex-col items-center">
                    <WheelOfMisfortune participants={participants} onOpenDrawer={onOpenDrawer} />
                    <button
                        type="button"
                        onClick={() => setIsGuideOpen(true)}
                        className="mt-3 inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted transition hover:bg-background-secondary hover:text-foreground lg:hidden"
                    >
                        <Info className="size-3.5" />
                        How to use it?
                    </button>
                </div>
                <aside className="hidden w-72 shrink-0 lg:block">
                    <Guide />
                </aside>
            </div>
            <Modal
                isOpen={isGuideOpen}
                onClose={() => setIsGuideOpen(false)}
                title="How to use it?"
            >
                <div className="p-5">
                    <GuideSteps />
                </div>
            </Modal>
        </main>
    );
};

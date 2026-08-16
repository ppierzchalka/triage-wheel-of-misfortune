import { useMembers, useSelectionState, useTeams } from '../../state/store';
import { Guide } from '../Guide/Guide';
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

    return (
        <main className="w-full flex-1 overflow-y-auto">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-4 py-6">
                <WheelOfMisfortune participants={participants} onOpenDrawer={onOpenDrawer} />
                <Guide />
            </div>
        </main>
    );
};

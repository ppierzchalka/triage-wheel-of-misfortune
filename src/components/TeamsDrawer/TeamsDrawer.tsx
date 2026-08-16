import { Shield, Users, X } from 'lucide-react';
import { useActions, useSelectionState } from '../../state/store';
import { SelectionType } from '../../state/types';
import { Drawer } from '../overlay/Drawer';
import { DrawerMembersList } from './DrawerMembersList';
import { DrawerTeamsList } from './DrawerTeamsList';

export type TeamsDrawerProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
};

const TABS = [
    { id: SelectionType.Teams, label: 'Teams', icon: Shield },
    { id: SelectionType.Members, label: 'Members', icon: Users },
];

export const TeamsDrawer: React.FC<TeamsDrawerProps> = ({ isOpen, onOpenChange }) => {
    const { selectionType } = useSelectionState();
    const actions = useActions();

    const handleClose = () => {
        onOpenChange(false);
    };

    return (
        <Drawer isOpen={isOpen} onClose={handleClose}>
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <h2 className="text-base font-semibold">Participants</h2>
                <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close"
                    className="rounded-lg p-1.5 text-muted transition hover:bg-background-secondary hover:text-foreground"
                >
                    <X className="size-4" />
                </button>
            </div>
            <div className="px-4 pt-3">
                <div className="grid grid-cols-2 gap-1 rounded-xl bg-background-secondary p-1">
                    {TABS.map(({ id, label, icon: Icon }) => {
                        const isActive = selectionType === id;
                        return (
                            <button
                                key={id}
                                type="button"
                                onClick={() => actions.setSelectionType(id)}
                                aria-pressed={isActive}
                                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition ${
                                    isActive
                                        ? 'bg-surface text-foreground shadow-sm'
                                        : 'text-muted hover:text-foreground'
                                }`}
                            >
                                <Icon className="size-4" />
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="flex-1 overflow-auto p-3">
                {selectionType === SelectionType.Teams ? (
                    <DrawerTeamsList />
                ) : (
                    <DrawerMembersList />
                )}
            </div>
        </Drawer>
    );
};

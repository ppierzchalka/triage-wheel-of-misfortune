import { Button, toast } from '@heroui/react';
import { ShieldPlus } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useActions, useSelectionState, useTeams } from '../../state/store';
import { Modal } from '../overlay/Modal';
import { DrawerTeamsListItem } from './DrawerTeamsListItem';
import { TeamDialog } from './TeamDialog';

export const DrawerTeamsList: React.FC = () => {
    const teams = useTeams();
    const { selection } = useSelectionState();
    const actions = useActions();
    const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
    const [editingTeamId, setEditingTeamId] = useState<string | null>(null);

    const openCreate = () => {
        setEditingTeamId(null);
        setIsTeamDialogOpen(true);
    };

    const handleEdit = useCallback((teamId: string) => {
        setEditingTeamId(teamId);
        setIsTeamDialogOpen(true);
    }, []);

    const handleToggle = useCallback(
        (teamId: string) => {
            actions.toggleSelection(teamId);
        },
        [actions]
    );

    const handleDelete = useCallback(
        (teamId: string) => {
            actions.removeTeam(teamId);
            toast.info('Team deleted');
        },
        [actions]
    );

    const teamList = Object.values(teams);

    return (
        <div className="flex flex-col gap-3">
            <Button fullWidth variant="primary" className="gap-2" onPress={openCreate}>
                <ShieldPlus className="size-4" />
                Add team
            </Button>
            {teamList.length === 0 && (
                <p className="py-8 text-center text-xs text-muted">
                    No teams yet. Create one to spin a whole group at once.
                </p>
            )}
            {teamList.map((team) => (
                <DrawerTeamsListItem
                    key={team.id}
                    team={team}
                    selected={selection.includes(team.id)}
                    onToggle={handleToggle}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}

            <Modal
                isOpen={isTeamDialogOpen}
                onClose={() => setIsTeamDialogOpen(false)}
                title={editingTeamId ? 'Edit team' : 'New team'}
            >
                <TeamDialog teamId={editingTeamId} onClose={() => setIsTeamDialogOpen(false)} />
            </Modal>
        </div>
    );
};

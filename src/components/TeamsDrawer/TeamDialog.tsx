import { Button, Input, toast } from '@heroui/react';
import { Plus, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useActions, useMembers, useTeams } from '../../state/store';
import { generateUniqueId, splitFullName } from '../../utils/helpers';

export type TeamDialogProps = {
    teamId: string | null;
    onClose: VoidFunction;
};

export const TeamDialog: React.FC<TeamDialogProps> = ({ teamId, onClose }) => {
    const members = useMembers();
    const teams = useTeams();
    const actions = useActions();
    const team = teamId ? teams[teamId] : null;
    const [teamName, setTeamName] = useState(team?.teamName ?? '');
    const [selectedIds, setSelectedIds] = useState<string[]>(team?.members ?? []);
    const [quickName, setQuickName] = useState('');

    const memberList = Object.values(members);

    const toggleMember = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((existing) => existing !== id) : [...prev, id]
        );
    };

    const handleQuickAdd = () => {
        const { firstName, lastName } = splitFullName(quickName);
        if (!firstName) {
            return;
        }
        const member = { id: generateUniqueId(), firstName, lastName };
        actions.addMember(member);
        setSelectedIds((prev) => [...prev, member.id]);
        setQuickName('');
        toast.success(`${firstName} added and assigned`);
    };

    const handleSave = () => {
        const name = teamName.trim();
        if (!name) {
            return;
        }
        if (team) {
            if (name !== team.teamName) {
                actions.renameTeam(team.id, name);
            }
            actions.manageTeamMembers(team.id, selectedIds);
            toast.success('Team updated');
        } else {
            actions.addTeam(name, selectedIds);
            toast.success('Team created');
        }
        onClose();
    };

    return (
        <>
            <div className="flex flex-col gap-4 p-5">
                <Input
                    value={teamName}
                    onChange={(event) => setTeamName(event.target.value)}
                    placeholder="Team name"
                    aria-label="Team name"
                    autoFocus
                />
                <div className="flex flex-col gap-1.5">
                    <p className="text-xs font-medium text-muted">Members ({selectedIds.length})</p>
                    {memberList.length === 0 && (
                        <p className="rounded-lg border border-dashed border-border p-3 text-center text-xs text-muted">
                            No members yet. Quick-add one below or visit the Members tab.
                        </p>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                        {memberList.map((member) => {
                            const isSelected = selectedIds.includes(member.id);
                            return (
                                <button
                                    key={member.id}
                                    type="button"
                                    onClick={() => toggleMember(member.id)}
                                    className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                                        isSelected
                                            ? 'border-accent bg-accent text-accent-foreground'
                                            : 'border-border bg-background-secondary text-foreground hover:border-accent/60'
                                    }`}
                                >
                                    {member.firstName} {member.lastName}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="flex flex-col gap-1.5 rounded-xl border border-border p-3">
                    <p className="text-xs font-medium text-muted">Quick add & assign</p>
                    <div className="flex gap-2">
                        <Input
                            value={quickName}
                            onChange={(event) => setQuickName(event.target.value)}
                            placeholder="Name Surname"
                            aria-label="Quick add member"
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleQuickAdd();
                                }
                            }}
                        />
                        <Button
                            variant="primary"
                            isIconOnly
                            onPress={handleQuickAdd}
                            isDisabled={!quickName.trim()}
                            aria-label="Add member"
                        >
                            <Plus className="size-4" />
                        </Button>
                    </div>
                    <p className="text-[11px] text-muted">
                        Creates the member and assigns them to this team in one step.
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between border-t border-border px-5 py-3">
                <Button variant="ghost" onPress={onClose}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    className="gap-2"
                    onPress={handleSave}
                    isDisabled={!teamName.trim()}
                >
                    <UserPlus className="size-4" />
                    {team ? 'Save team' : 'Create team'}
                </Button>
            </div>
        </>
    );
};

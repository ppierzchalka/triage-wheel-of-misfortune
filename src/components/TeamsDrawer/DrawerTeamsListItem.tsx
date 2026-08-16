import { Checkbox } from '@heroui/react';
import { Pencil, Trash2, UserPlus, X } from 'lucide-react';
import { memo } from 'react';
import { useActions, useMembers } from '../../state/store';
import type { Team } from '../../state/types';

export type DrawerTeamsListItemProps = {
    team: Team;
    selected: boolean;
    onToggle: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
};

export const DrawerTeamsListItem = memo(
    ({ team, selected, onToggle, onEdit, onDelete }: DrawerTeamsListItemProps) => {
        const members = useMembers();
        const actions = useActions();

        const teamMembers = team.members
            .map((id) => members[id])
            .filter((member) => member !== undefined);

        const handleRemoveMember = (memberId: string) => {
            actions.manageTeamMembers(
                team.id,
                team.members.filter((id) => id !== memberId)
            );
        };

        return (
            <div className="rounded-xl border border-border bg-surface p-3">
                <div className="flex items-center gap-1">
                    <Checkbox.Root
                        isSelected={selected}
                        onChange={() => onToggle(team.id)}
                        aria-label={`Select team ${team.teamName}`}
                    >
                        <Checkbox.Content>
                            <Checkbox.Control>
                                <Checkbox.Indicator />
                            </Checkbox.Control>
                        </Checkbox.Content>
                    </Checkbox.Root>
                    <button
                        type="button"
                        onClick={() => onToggle(team.id)}
                        className="min-w-0 flex-1 truncate rounded px-1 text-left text-sm font-semibold"
                    >
                        {team.teamName}
                    </button>
                    <button
                        type="button"
                        onClick={() => onEdit(team.id)}
                        aria-label={`Edit team ${team.teamName}`}
                        className="rounded-lg p-1.5 text-muted transition hover:bg-background-secondary hover:text-foreground"
                    >
                        <Pencil className="size-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => onDelete(team.id)}
                        aria-label={`Delete team ${team.teamName}`}
                        className="rounded-lg p-1.5 text-muted transition hover:bg-background-secondary hover:text-danger"
                    >
                        <Trash2 className="size-4" />
                    </button>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {teamMembers.map((member) => (
                        <span
                            key={member.id}
                            className="inline-flex items-center gap-1 rounded-full border border-border bg-background-secondary py-0.5 pl-2.5 pr-1 text-xs"
                        >
                            {member.firstName} {member.lastName}
                            <button
                                type="button"
                                onClick={() => handleRemoveMember(member.id)}
                                className="rounded-full p-0.5 transition hover:bg-background"
                                aria-label={`Remove ${member.firstName} ${member.lastName} from ${team.teamName}`}
                            >
                                <X className="size-3" />
                            </button>
                        </span>
                    ))}
                    {teamMembers.length === 0 && (
                        <span className="text-xs text-muted">No members yet</span>
                    )}
                    <button
                        type="button"
                        onClick={() => onEdit(team.id)}
                        aria-label={`Add members to ${team.teamName}`}
                        className="inline-flex items-center gap-1 rounded-full border border-dashed border-border px-2.5 py-0.5 text-xs text-muted transition hover:border-accent hover:text-foreground"
                    >
                        <UserPlus className="size-3" />
                        Add
                    </button>
                </div>
            </div>
        );
    }
);

DrawerTeamsListItem.displayName = 'DrawerTeamsListItem';

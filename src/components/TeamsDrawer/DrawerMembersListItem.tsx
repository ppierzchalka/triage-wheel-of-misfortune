import { Checkbox } from '@heroui/react';
import { Trash2 } from 'lucide-react';
import { memo } from 'react';
import type { Member } from '../../state/types';

export type DrawerMembersListItemProps = {
    member: Member;
    selected: boolean;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
};

export const DrawerMembersListItem = memo(
    ({ member, selected, onToggle, onDelete }: DrawerMembersListItemProps) => {
        const label = `${member.firstName} ${member.lastName}`;
        return (
            <div className="group flex items-center gap-1 rounded-xl px-2 py-1.5 transition hover:bg-background-secondary">
                <Checkbox.Root
                    isSelected={selected}
                    onChange={() => onToggle(member.id)}
                    aria-label={`Select ${label}`}
                >
                    <Checkbox.Content>
                        <Checkbox.Control>
                            <Checkbox.Indicator />
                        </Checkbox.Control>
                    </Checkbox.Content>
                </Checkbox.Root>
                <button
                    type="button"
                    onClick={() => onToggle(member.id)}
                    className="min-w-0 flex-1 truncate rounded px-1 text-left text-sm"
                >
                    {label}
                </button>
                <button
                    type="button"
                    onClick={() => onDelete(member.id)}
                    className="rounded-lg p-1.5 text-muted opacity-0 transition group-hover:opacity-100 focus-visible:opacity-100 hover:text-danger"
                    aria-label={`Delete ${label}`}
                >
                    <Trash2 className="size-4" />
                </button>
            </div>
        );
    }
);

DrawerMembersListItem.displayName = 'DrawerMembersListItem';

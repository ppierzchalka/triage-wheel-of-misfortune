import { Button, TextArea, toast } from '@heroui/react';
import { UserPlus } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { useActions, useMembers, useSelectionState } from '../../state/store';
import { generateUniqueId, parseMemberNames } from '../../utils/helpers';
import { Modal } from '../overlay/Modal';
import { DrawerMembersListItem } from './DrawerMembersListItem';

export const DrawerMembersList: React.FC = () => {
    const members = useMembers();
    const { selection } = useSelectionState();
    const actions = useActions();
    const [isBulkOpen, setIsBulkOpen] = useState(false);
    const [bulkInput, setBulkInput] = useState('');

    const parsedCount = useMemo(() => parseMemberNames(bulkInput).length, [bulkInput]);

    const handleBulkAdd = () => {
        const parsed = parseMemberNames(bulkInput);
        if (parsed.length === 0) {
            return;
        }
        actions.addMembers(
            parsed.map(({ firstName, lastName }) => ({
                id: generateUniqueId(),
                firstName,
                lastName,
            }))
        );
        toast.success(`${parsed.length} member${parsed.length > 1 ? 's' : ''} added`);
        setBulkInput('');
        setIsBulkOpen(false);
    };

    const handleToggle = useCallback(
        (id: string) => {
            actions.toggleSelection(id);
        },
        [actions]
    );

    const handleDelete = useCallback(
        (id: string) => {
            actions.removeMember(id);
            toast.info('Member removed');
        },
        [actions]
    );

    const memberList = Object.values(members);

    return (
        <div className="flex flex-col gap-3">
            <div>
                <Button
                    fullWidth
                    variant="primary"
                    className="gap-2"
                    onPress={() => setIsBulkOpen(true)}
                >
                    <UserPlus className="size-4" />
                    Add members
                </Button>
                <p className="mt-2 text-center text-xs text-muted">
                    Tip: paste a list of names to add many at once.
                </p>
            </div>
            {memberList.length === 0 && (
                <p className="py-8 text-center text-xs text-muted">
                    No members yet. Add developers here so the wheel has victims.
                </p>
            )}
            <div className="flex flex-col gap-1">
                {memberList.map((member) => (
                    <DrawerMembersListItem
                        key={member.id}
                        member={member}
                        selected={selection.includes(member.id)}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            <Modal isOpen={isBulkOpen} onClose={() => setIsBulkOpen(false)} title="Add members">
                <div className="flex flex-col gap-2 p-5">
                    <p className="text-xs text-muted">
                        Paste names separated by new lines or commas. First word becomes the first
                        name, the rest becomes the last name.
                    </p>
                    <TextArea
                        rows={6}
                        value={bulkInput}
                        onChange={(event) => setBulkInput(event.target.value)}
                        placeholder={'Jan Kowalski\nAnna Nowak\nMichał Wiśniewski'}
                        aria-label="Member names"
                    />
                </div>
                <div className="flex items-center justify-between border-t border-border px-5 py-3">
                    <Button variant="ghost" onPress={() => setIsBulkOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onPress={handleBulkAdd}
                        isDisabled={parsedCount === 0}
                    >
                        {parsedCount > 0
                            ? `Add ${parsedCount} member${parsedCount > 1 ? 's' : ''}`
                            : 'Nothing to add'}
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

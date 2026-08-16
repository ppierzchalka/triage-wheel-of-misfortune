import { useMemo, useRef } from 'react';
import { Members, SelectionType, Teams } from '../../state/types';
import { WheelParticipant } from './WheelOfMisfortune';

const resolveParticipantIds = (
    teams: Teams,
    selection: string[],
    selectionType: SelectionType
): string[] => {
    switch (selectionType) {
        case SelectionType.Members:
            return selection;
        case SelectionType.Teams: {
            const selectedMemberIds: string[] = [];
            for (const [teamId, team] of Object.entries(teams)) {
                if (selection.includes(teamId)) {
                    for (const memberId of team.members) {
                        if (!selectedMemberIds.includes(memberId)) {
                            selectedMemberIds.push(memberId);
                        }
                    }
                }
            }
            return selectedMemberIds;
        }
    }
};

export const useSelection = (
    members: Members,
    teams: Teams,
    selection: string[],
    selectionType: SelectionType
): WheelParticipant[] => {
    const participantIds = useMemo(
        () => resolveParticipantIds(teams, selection, selectionType),
        [teams, selection, selectionType]
    );

    const labelsSignature = participantIds
        .map((id) => {
            const member = members[id];
            return member ? `${id}:${member.firstName} ${member.lastName}` : `${id}:`;
        })
        .join('|');

    const cachedRef = useRef<{ signature: string; value: WheelParticipant[] } | null>(null);
    if (!cachedRef.current || cachedRef.current.signature !== labelsSignature) {
        cachedRef.current = {
            signature: labelsSignature,
            value: participantIds
                .filter((id) => members[id])
                .map((id) => ({
                    id,
                    label: `${members[id].firstName} ${members[id].lastName}`,
                })),
        };
    }
    return cachedRef.current.value;
};

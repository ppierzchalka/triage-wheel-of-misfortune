import { useMemo } from 'react';
import { Members } from '../../actions/members';
import { Selection, SelectionType } from '../../actions/selection';
import { Teams } from '../../actions/teams';

export const useSelection = (members: Members, teams: Teams, selectionData: Selection): string[] =>
    useMemo(() => {
        switch (selectionData.selectionType) {
            case SelectionType.Members: {
                return selectionData.selection.map(
                    (memberId) => `${members[memberId].firstName} ${members[memberId].lastName}`
                );
            }
            case SelectionType.Teams: {
                const selectedTeamsMembers = Object.entries(teams).reduce<string[]>(
                    (selectedMembers, [teamId, { members: teamMembers }]) => {
                        if (selectionData.selection.includes(teamId)) {
                            const membersToAdd = teamMembers.filter(
                                (member) => !selectedMembers.includes(member)
                            );
                            return [...selectedMembers, ...membersToAdd];
                        }
                        return selectedMembers;
                    },
                    []
                );
                return selectedTeamsMembers.map(
                    (memberId) => `${members[memberId].firstName} ${members[memberId].lastName}`
                );
            }
        }
    }, [members, teams, selectionData]);

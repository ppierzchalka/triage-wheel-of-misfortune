import React from 'react';
import { useSelector } from 'react-redux';
import { SelectionType } from '../../actions/selection';
import { RootStateType } from '../../reducers';

export const WheelOfMisfortuneWrapper: React.FC = () => {
    const { members, teams, selection: selectionData } = useSelector(
        (state: RootStateType) => state
    );

    const renderSelection = () => {
        switch (selectionData.selectionType) {
            case SelectionType.Members: {
                return (
                    <ul>
                        {selectionData.selection.map((memberId) => (
                            <li
                                key={memberId}
                            >{`${members[memberId].firstName} ${members[memberId].lastName}`}</li>
                        ))}
                    </ul>
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
                return (
                    <ul>
                        {selectedTeamsMembers.map((memberId) => (
                            <li
                                key={memberId}
                            >{`${members[memberId].firstName} ${members[memberId].lastName}`}</li>
                        ))}
                    </ul>
                );
            }
        }
    };
    return <div>{renderSelection()}</div>;
};

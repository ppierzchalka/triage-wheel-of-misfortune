import { Container, List, ListSubheader } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveSelection } from '../../actions/selection';
import { removeTeamFromDB } from '../../actions/teams';
import { RootStateType } from '../../reducers';
import { DrawerTeamsListItem } from './DrawerTeamsListItem';

export const DrawerTeamsList: React.FC = () => {
    const { teams, authUser, selection } = useSelector((state: RootStateType) => state);
    const dispatch = useDispatch();

    const handleRemoveTeam = (id: string) => {
        if (authUser) {
            dispatch(removeTeamFromDB(authUser, id));
        }
    };

    const handleSelectTeam = (id: string, checked: boolean) => {
        const newSelection = checked
            ? [...selection.selection, id]
            : selection.selection.filter((member) => member !== id);
        dispatch(receiveSelection(newSelection));
    };
    return (
        <Container>
            <List
                component="nav"
                aria-labelledby="teams-list-subheader"
                subheader={
                    <ListSubheader component="div" id="teams-list-subheader">
                        Teams
                    </ListSubheader>
                }
            >
                {Object.values(teams).map((team, teamIndex) => (
                    <DrawerTeamsListItem
                        key={teamIndex}
                        label={team.teamName}
                        members={team.members}
                        selected={selection.selection.includes(team.id)}
                        onPrimaryAction={(checked: boolean) => handleSelectTeam(team.id, checked)}
                        onDeleteAction={() => handleRemoveTeam(team.id)}
                    />
                ))}
            </List>
        </Container>
    );
};

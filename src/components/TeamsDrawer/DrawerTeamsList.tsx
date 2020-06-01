import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    ListSubheader,
    TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveSelection } from '../../actions/selection';
import { addTeamToDB, removeTeamFromDB } from '../../actions/teams';
import { RootStateType } from '../../reducers';
import { DrawerListWrapper } from './DrawerListWrapper';
import { DrawerTeamsListItem } from './DrawerTeamsListItem';

export const DrawerTeamsList: React.FC = () => {
    const [teamName, setTeamName] = useState<string>('');
    const { teams, authUser, selection } = useSelector((state: RootStateType) => state);
    const dispatch = useDispatch();

    const handleRemoveTeam = (id: string) => {
        if (authUser) {
            dispatch(removeTeamFromDB(authUser, id));
        }
    };

    const handleAddTeam = (handleClose: VoidFunction) => {
        if (authUser && teamName !== '') {
            dispatch(addTeamToDB(authUser, teamName));
        }
        handleClose();
    };

    const handleClearData = () => {
        setTeamName('');
    };

    const handleSelectTeam = (id: string, checked: boolean) => {
        const newSelection = checked
            ? [...selection.selection, id]
            : selection.selection.filter((member) => member !== id);
        dispatch(receiveSelection(newSelection));
    };

    const renderDialogContent = (handleClose: VoidFunction) => {
        return (
            <React.Fragment>
                <DialogTitle>Add Team</DialogTitle>
                <DialogContent>
                    <DialogContentText>To add team, please enter new team name:</DialogContentText>
                    <TextField
                        autoFocus
                        onChange={(event) => setTeamName(event.target.value)}
                        margin="dense"
                        label="Team Name"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleAddTeam(handleClose)}
                        color="primary"
                        disabled={teamName === ''}
                    >
                        Add new team
                    </Button>
                </DialogActions>
            </React.Fragment>
        );
    };

    return (
        <DrawerListWrapper
            addButtonLabel="Add new team"
            onClearData={handleClearData}
            renderDialogContent={renderDialogContent}
        >
            <ListSubheader component="div">Teams</ListSubheader>
            <List classes={{ root: 'drawer-list__content' }} component="div">
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
        </DrawerListWrapper>
    );
};

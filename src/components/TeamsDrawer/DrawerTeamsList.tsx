import {
    Button,
    Dialog,
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
import { addTeamToDB } from '../../actions/teams';
import { RootStateType } from '../../reducers';
import { DrawerListWrapper } from './DrawerListWrapper';
import { DrawerTeamsListItem } from './DrawerTeamsListItem';
import { MembersTransferList } from './MembersTransferList';

export const DrawerTeamsList: React.FC = () => {
    const [teamName, setTeamName] = useState<string>('');
    const [activeTeam, setActiveTeam] = useState<string | null>(null);
    const { teams, authUser, selection } = useSelector((state: RootStateType) => state);
    const dispatch = useDispatch();

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

    const renderAddDialogContent = (handleClose: VoidFunction) => {
        return (
            <React.Fragment>
                <DialogTitle>Add Team</DialogTitle>
                <form onSubmit={() => handleAddTeam(handleClose)}>
                    <DialogContent>
                        <DialogContentText>
                            To add team, please enter new team name:
                        </DialogContentText>
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
                            type="submit"
                            color="primary"
                            disabled={teamName === ''}
                        >
                            Add new team
                        </Button>
                    </DialogActions>
                </form>
            </React.Fragment>
        );
    };

    return (
        <DrawerListWrapper
            addButtonLabel="Add new team"
            onClearData={handleClearData}
            onRenderAddDialogContent={renderAddDialogContent}
        >
            <ListSubheader component="div">Teams</ListSubheader>
            <List classes={{ root: 'drawer-list__content' }} component="div">
                {Object.values(teams).map((team, teamIndex) => (
                    <DrawerTeamsListItem
                        onManageMembers={setActiveTeam}
                        key={teamIndex}
                        team={team}
                        selected={selection.selection.includes(team.id)}
                        onPrimaryAction={(checked: boolean) => handleSelectTeam(team.id, checked)}
                    />
                ))}
            </List>

            <Dialog
                open={!!activeTeam}
                onClose={() => setActiveTeam(null)}
                classes={{ paper: 'drawer-tab__dialog' }}
            >
                {activeTeam && (
                    <MembersTransferList
                        activeTeam={activeTeam}
                        onClose={() => setActiveTeam(null)}
                    />
                )}
            </Dialog>
        </DrawerListWrapper>
    );
};

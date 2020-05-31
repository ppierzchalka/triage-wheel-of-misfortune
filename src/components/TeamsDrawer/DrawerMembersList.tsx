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
import { addMemberToDB, removeMemberFromDB } from '../../actions/members';
import { receiveSelection } from '../../actions/selection';
import { RootStateType } from '../../reducers';
import { DrawerListWrapper } from './DrawerListWrapper';
import { DrawerMembersListItem } from './DrawerMembersListItem';

export const DrawerMembersList: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const { members, authUser, selection } = useSelector((state: RootStateType) => state);
    const dispatch = useDispatch();

    const handleRemoveUser = (id: string) => {
        if (authUser) {
            dispatch(removeMemberFromDB(authUser, id));
        }
    };

    const handleAddUser = (closeDialog: VoidFunction) => {
        if (authUser && firstName !== '' && lastName !== '') {
            dispatch(addMemberToDB(authUser, firstName, lastName));
        }
        handleCloseModal(closeDialog);
    };

    const handleCloseModal = (closeDialog: VoidFunction) => {
        setFirstName('');
        setLastName('');
        closeDialog();
    };

    const handleSelectUser = (id: string, checked: boolean) => {
        const newSelection = checked
            ? [...selection.selection, id]
            : selection.selection.filter((member) => member !== id);
        dispatch(receiveSelection(newSelection));
    };

    const renderDialogContent = (closeDialog: VoidFunction) => {
        return (
            <React.Fragment>
                <DialogTitle>Add member</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add member, please enter new member data:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        onChange={(event) => setFirstName(event.target.value)}
                        margin="dense"
                        label="First Name"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        onChange={(event) => setLastName(event.target.value)}
                        margin="dense"
                        label="Last Name"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseModal(closeDialog)} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleAddUser(closeDialog)}
                        color="primary"
                        disabled={firstName === '' || lastName === ''}
                    >
                        Add new member
                    </Button>
                </DialogActions>
            </React.Fragment>
        );
    };

    return (
        <DrawerListWrapper
            addButtonLabel="Add new member"
            renderDialogContent={renderDialogContent}
        >
            <List
                classes={{ root: 'drawer-list__content' }}
                component="nav"
                subheader={<ListSubheader component="div">Members</ListSubheader>}
            >
                {Object.values(members).map((member, memberIndex) => (
                    <DrawerMembersListItem
                        key={memberIndex}
                        label={`${member.firstName} ${member.lastName}`}
                        selected={selection.selection.includes(member.id)}
                        onPrimaryAction={(checked: boolean) => handleSelectUser(member.id, checked)}
                        onDeleteAction={() => handleRemoveUser(member.id)}
                    />
                ))}
            </List>
        </DrawerListWrapper>
    );
};

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

    const handleAddUser = (handleClose: VoidFunction) => {
        if (authUser && firstName !== '' && lastName !== '') {
            dispatch(addMemberToDB(authUser, firstName, lastName));
        }
        handleClose();
    };

    const handleClearData = () => {
        setFirstName('');
        setLastName('');
    };

    const handleSelectUser = (id: string, checked: boolean) => {
        const newSelection = checked
            ? [...selection.selection, id]
            : selection.selection.filter((member) => member !== id);
        dispatch(receiveSelection(newSelection));
    };

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.currentTarget;
        if (id === 'firstName') {
            setFirstName(value);
        }
        if (id === 'lastName') {
            setLastName(value);
        }
    };

    const renderAddDialogContent = (handleClose: VoidFunction) => {
        return (
            <React.Fragment>
                <DialogTitle>Add member</DialogTitle>
                <form onSubmit={() => handleAddUser(handleClose)}>
                    <DialogContent>
                        <DialogContentText>
                            To add member, please enter new member data:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            onChange={onChangeHandler}
                            margin="dense"
                            id="firstName"
                            label="First Name"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            onChange={onChangeHandler}
                            margin="dense"
                            id="lastName"
                            label="Last Name"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            onClick={() => handleAddUser(handleClose)}
                            color="primary"
                            disabled={firstName === '' || lastName === ''}
                        >
                            Add new member
                        </Button>
                    </DialogActions>
                </form>
            </React.Fragment>
        );
    };

    return (
        <DrawerListWrapper
            addButtonLabel="Add new member"
            onClearData={handleClearData}
            onRenderAddDialogContent={renderAddDialogContent}
        >
            <ListSubheader component="div">Members</ListSubheader>
            <List classes={{ root: 'drawer-list__content' }} component="div">
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

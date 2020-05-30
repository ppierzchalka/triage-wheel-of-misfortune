import { Container, List, ListSubheader } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeMemberFromDB } from '../../actions/members';
import { receiveSelection } from '../../actions/selection';
import { RootStateType } from '../../reducers';
import { DrawerListItem } from './DrawerListItem';

export const DrawerMembersList: React.FC = () => {
    const { members, authUser, selection } = useSelector((state: RootStateType) => state);
    const dispatch = useDispatch();

    const handleRemoveUser = (id: string) => {
        if (authUser) {
            dispatch(removeMemberFromDB(authUser, id));
        }
    };

    const handleSelectUser = (id: string, checked: boolean) => {
        const newSelection = checked
            ? [...selection.selection, id]
            : selection.selection.filter((member) => member !== id);
        dispatch(receiveSelection(newSelection));
    };

    return (
        <Container>
            <List
                component="nav"
                aria-labelledby="members-list-subheader"
                subheader={
                    <ListSubheader component="div" id="members-list-subheader">
                        Members
                    </ListSubheader>
                }
            >
                {Object.values(members).map((member, memberIndex) => (
                    <DrawerListItem
                        key={memberIndex}
                        label={`${member.firstName} ${member.lastName}`}
                        selected={selection.selection.includes(member.id)}
                        onPrimaryAction={(checked: boolean) => handleSelectUser(member.id, checked)}
                        onDeleteAction={() => handleRemoveUser(member.id)}
                    />
                ))}
            </List>
        </Container>
    );
};

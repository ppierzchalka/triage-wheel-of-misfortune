import { Dispatch } from 'redux';
import { updateEntry } from '../utils/firebase';
import { generateUniqueId } from '../utils/helpers';
import { AuthedUser } from './authUser';

export type Member = {
    id: string;
    firstName: string;
    lastName: string;
};

export type Members = Record<string, Member>;

export enum MembersActionType {
    ReceiveMembers = 'ReceiveMembers',
    AddMember = 'AddMember',
    RemoveMember = 'RemoveMember',
}

export type ReceiveMembersAction = {
    type: MembersActionType.ReceiveMembers;
    payload: Members;
};

export type AddMemberAction = {
    type: MembersActionType.AddMember;
    payload: Member;
};

export type RemoveMemberAction = {
    type: MembersActionType.RemoveMember;
    payload: string;
};

export type MemberActions = ReceiveMembersAction | AddMemberAction | RemoveMemberAction;

export const receiveMembers = (members: Members): ReceiveMembersAction => ({
    type: MembersActionType.ReceiveMembers,
    payload: members,
});

export const addMember = (member: Member): AddMemberAction => ({
    type: MembersActionType.AddMember,
    payload: member,
});

export const addMemberToDB = (
    authedUser: AuthedUser, firstName: string, lastName: string
) => (
    dispatch: Dispatch<any>
) => {
    const uid = generateUniqueId();
    const newMember: Member = { id: uid, firstName, lastName };
    updateEntry(authedUser, newMember, 'members')
        .then((member) => {
            dispatch(addMember(member));
        })
        .catch((error) => {
            console.error('Error adding member', error);
        });
};

export const removeMember = (memberid: string): RemoveMemberAction => ({
    type: MembersActionType.RemoveMember,
    payload: memberid,
});

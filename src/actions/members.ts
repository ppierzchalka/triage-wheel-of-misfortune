import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootStateActions } from '../reducers';
import { firebaseAddEntry, firebaseRemoveMember } from '../utils/firebase';
import { generateUniqueId } from '../utils/helpers';
import { AuthUser } from './authUser';

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
    authedUser: AuthUser,
    firstName: string,
    lastName: string
): ThunkAction<Promise<void>, {}, {}, MemberActions> => (dispatch: Dispatch<RootStateActions>) => {
    const id = generateUniqueId();
    const newMember: Member = { id, firstName, lastName };
    return firebaseAddEntry(authedUser, newMember, 'members')
        .then((member) => {
            if (member) {
                dispatch(addMember(member));
            }
        })
        .catch((error) => {
            console.error('Error adding member', error);
        });
};

export const removeMember = (memberid: string): RemoveMemberAction => ({
    type: MembersActionType.RemoveMember,
    payload: memberid,
});

export const removeMemberFromDB = (
    authedUser: AuthUser,
    id: string
): ThunkAction<Promise<void>, {}, {}, MemberActions> => (dispatch: Dispatch<RootStateActions>) => {
    return firebaseRemoveMember(authedUser, id)
        .then((removedUserId) => {
            if (removedUserId) {
                dispatch(removeMember(removedUserId));
            }
        })
        .catch((error) => {
            console.error('Error adding member', error);
        });
};

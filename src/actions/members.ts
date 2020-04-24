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

export type MemberActions =
    | ReceiveMembersAction
    | AddMemberAction
    | RemoveMemberAction

export const receiveMembers = (members: Members): ReceiveMembersAction => ({
    type: MembersActionType.ReceiveMembers,
    payload: members,
});

export const addMember = (member: Member): AddMemberAction => ({
    type: MembersActionType.AddMember,
    payload: member,
});

export const removeMember = (memberid: string): RemoveMemberAction => ({
    type: MembersActionType.RemoveMember,
    payload: memberid,
});

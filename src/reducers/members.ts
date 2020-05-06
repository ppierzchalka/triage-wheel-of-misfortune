import { AuthUserActions, AuthUserActionType } from '../actions/authUser';
import { MemberActions, Members, MembersActionType } from '../actions/members';

const initialMembersState: Members = {};

export const members = (state = initialMembersState, action: MemberActions | AuthUserActions): Members => {
    switch (action.type) {
        case MembersActionType.ReceiveMembers:
            return {
                ...state,
                ...action.payload,
            };
        case MembersActionType.AddMember:
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        case MembersActionType.RemoveMember:
            const { [action.payload]: toRemove, ...rest } = state;
            return {
                ...rest,
            };
        case AuthUserActionType.UnsetAuthedUser:
            return initialMembersState;
        default:
            return state;
    }
}

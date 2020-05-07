import { AuthUserActions, AuthUserActionType, UserData } from '../actions/authUser';

const defautAuthUserState: UserData = null;

export const authUser = (state: UserData = defautAuthUserState, action: AuthUserActions): UserData => {
    switch (action.type) {
        case AuthUserActionType.SetAuthedUser:
            return action.payload;
        case AuthUserActionType.UnsetAuthedUser:
            return action.payload;
        default:
            return state;
    }
}

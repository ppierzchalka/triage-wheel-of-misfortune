import { AuthUser, AuthUserActions, AuthUserActionType } from '../actions/authUser';

const defautAuthUserState: AuthUser = null;

export const authUser = (state: AuthUser = defautAuthUserState, action: AuthUserActions): AuthUser => {
    switch (action.type) {
        case AuthUserActionType.SetAuthedUser:
            return action.payload;
        case AuthUserActionType.UnsetAuthedUser:
            return action.payload;
        default:
            return state;
    }
}

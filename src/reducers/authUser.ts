import { AuthUser, AuthUserActions, AuthUserActionType } from '../actions/authUser';

const defautAuthUserState: AuthUser = {
    id: null
};

export const authUser = (state = defautAuthUserState, action: AuthUserActions): AuthUser => {
    switch (action.type) {
        case AuthUserActionType.SignUp:
            return action.payload;
        case AuthUserActionType.SignIn:
            return action.payload;
        case AuthUserActionType.SignOut:
            return action.payload;
        default:
            return state;
    }
}

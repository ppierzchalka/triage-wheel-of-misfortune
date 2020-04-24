export type AuthUser = {
    id: string | null;
};

export enum AuthUserActionType {
    SignUp = 'SignUp',
    SignIn = 'SignIn',
    SignOut = 'SignOut',
}

export type SignUpAction = {
    type: AuthUserActionType.SignUp;
    payload: AuthUser;
};

export type SignInAction = {
    type: AuthUserActionType.SignIn;
    payload: AuthUser;
};

export type SignOutAction = {
    type: AuthUserActionType.SignOut;
    payload: AuthUser;
};

export type AuthUserActions = SignUpAction | SignInAction | SignOutAction;

export const signIn = (user: AuthUser): SignUpAction => ({
    type: AuthUserActionType.SignUp,
    payload: user,
});

export const addMember = (user: AuthUser): SignInAction => ({
    type: AuthUserActionType.SignIn,
    payload: user,
});

export const removeMember = (user: null): SignOutAction => ({
    type: AuthUserActionType.SignOut,
    payload: {id: user},
});

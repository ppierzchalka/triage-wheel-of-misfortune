export type AuthUser = firebase.User | null;

export enum AuthUserActionType {
    SetAuthedUser = 'SetAuthedUser',
    UnsetAuthedUser = 'UnsetAuthedUser',
}

export type SetAuthedUserAction = {
    type: AuthUserActionType.SetAuthedUser;
    payload: AuthUser;
};

export type UnsetAuthedUserAction = {
    type: AuthUserActionType.UnsetAuthedUser;
    payload: AuthUser;
};

export type AuthUserActions = SetAuthedUserAction | UnsetAuthedUserAction;

export const signIn = (user: AuthUser): SetAuthedUserAction => ({
    type: AuthUserActionType.SetAuthedUser,
    payload: user,
});

export const addMember = (user: null): UnsetAuthedUserAction => ({
    type: AuthUserActionType.UnsetAuthedUser,
    payload: user,
});

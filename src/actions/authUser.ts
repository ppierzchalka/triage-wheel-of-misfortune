export type AuthUser = {
    uid: string;
    email?: string | null;
    displayName?: string | null;
} | null;

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

export const signOut = (user: null): UnsetAuthedUserAction => ({
    type: AuthUserActionType.UnsetAuthedUser,
    payload: user,
});

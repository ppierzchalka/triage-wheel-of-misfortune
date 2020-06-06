import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { RootStateActions } from '../reducers';
import { firebaseAddEntry, firebaseModifyMembers, firebaseRemoveTeam } from '../utils/firebase';
import { generateUniqueId } from '../utils/helpers';
import { AuthUser } from './authUser';

export type Team = {
    id: string;
    teamName: string;
    members: string[];
};

export type Teams = Record<string, Team>;

export enum TeamActionType {
    ReceiveTeams = 'ReceiveTeams',
    AddTeam = 'AddTeam',
    RemoveTeam = 'RemoveTeam',
    ManageTeamMembers = 'ReceiveTeamMembers',
}

export type ReceiveTeamAction = {
    type: TeamActionType.ReceiveTeams;
    payload: Teams;
};

export type AddTeamAction = {
    type: TeamActionType.AddTeam;
    payload: Team;
};

export type RemoveTeamAction = {
    type: TeamActionType.RemoveTeam;
    payload: string;
};

export type ManageTeamMembersAction = {
    type: TeamActionType.ManageTeamMembers;
    payload: {
        teamId: string;
        members: string[];
    };
};

export type TeamActions =
    | ReceiveTeamAction
    | AddTeamAction
    | RemoveTeamAction
    | ManageTeamMembersAction;

export const receiveTeams = (teams: Teams): ReceiveTeamAction => ({
    type: TeamActionType.ReceiveTeams,
    payload: teams,
});

export const addTeam = (team: Team): AddTeamAction => ({
    type: TeamActionType.AddTeam,
    payload: team,
});

export const addTeamToDB = (
    authedUser: AuthUser,
    teamName: string
): ThunkAction<Promise<void>, {}, {}, TeamActions> => (dispatch: Dispatch<RootStateActions>) => {
    const id = generateUniqueId();
    const newTeam: Team = { id, teamName, members: [] };
    return firebaseAddEntry(authedUser, newTeam, 'teams')
        .then((member) => {
            if (member) {
                dispatch(addTeam(member));
            }
        })
        .catch((error) => {
            console.error('Error adding member', error);
        });
};

export const removeTeam = (teamId: string): RemoveTeamAction => ({
    type: TeamActionType.RemoveTeam,
    payload: teamId,
});

export const removeTeamFromDB = (
    authedUser: AuthUser,
    id: string
): ThunkAction<Promise<void>, {}, {}, TeamActions> => (dispatch: Dispatch<RootStateActions>) => {
    return firebaseRemoveTeam(authedUser, id)
        .then((removedUserId) => {
            if (removedUserId) {
                dispatch(removeTeam(removedUserId));
            }
        })
        .catch((error) => {
            console.error('Error adding member', error);
        });
};

export const manageTeamMembers = (teamId: string, members: string[]): ManageTeamMembersAction => ({
    type: TeamActionType.ManageTeamMembers,
    payload: {
        teamId,
        members,
    },
});

export const manageTeamMembersInDB = (
    authedUser: AuthUser,
    teamId: string,
    members: string[]
): ThunkAction<Promise<void>, {}, {}, TeamActions> => (dispatch: Dispatch<RootStateActions>) => {
    return firebaseModifyMembers(authedUser, teamId, members)
        .then(() => {
            dispatch(manageTeamMembers(teamId, members));
        })
        .catch((error) => {
            console.error('Error managing members', error);
        });
};

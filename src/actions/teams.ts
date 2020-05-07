import { Dispatch } from 'react';
import { updateEntry } from '../utils/firebase';
import { generateUniqueId } from '../utils/helpers';
import { AuthedUser } from './authUser';

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
    AddTeamMember = 'AddTeamMember',
    RemoveTeamMember = 'RemoveTeamMember',
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

export type AddTeamMemberAction = {
    type: TeamActionType.AddTeamMember;
    payload: {
        teamId: string;
        memberId: string;
    };
};

export type RemoveTeamMemberAction = {
    type: TeamActionType.RemoveTeamMember;
    payload: {
        teamId: string;
        memberId: string;
    };
};

export type TeamActions =
    | ReceiveTeamAction
    | AddTeamAction
    | RemoveTeamAction
    | AddTeamMemberAction
    | RemoveTeamMemberAction;

export const receiveTeams = (teams: Teams): ReceiveTeamAction => ({
    type: TeamActionType.ReceiveTeams,
    payload: teams,
})

export const addTeam = (team: Team): AddTeamAction => ({
    type: TeamActionType.AddTeam,
    payload: team
})

export const addTeamToDB = (authedUser: AuthedUser, teamName: string) => (
    dispatch: Dispatch<any>
) => {
    const uid = generateUniqueId();
    const newTeam: Team = { id: uid, teamName, members: [] };
    updateEntry(authedUser, newTeam, 'teams')
        .then((member) => {
            dispatch(addTeam(member));
        })
        .catch((error) => {
            console.error('Error adding member', error);
        });
};

export const removeTeam = (teamId: string): RemoveTeamAction => ({
    type: TeamActionType.RemoveTeam,
    payload: teamId
})

export const addTeamMember = (teamId: string, memberId: string): AddTeamMemberAction => ({
    type: TeamActionType.AddTeamMember,
    payload: {
        teamId,
        memberId
    },
});

export const removeTeamMember = (teamId: string, memberId: string): RemoveTeamMemberAction => ({
    type: TeamActionType.RemoveTeamMember,
    payload: {
        teamId,
        memberId
    },
});

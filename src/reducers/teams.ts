import { AuthUserActions, AuthUserActionType } from '../actions/authUser';
import { MemberActions, MembersActionType } from '../actions/members';
import { TeamActions, TeamActionType, Teams } from '../actions/teams';
import { removeMemberFromTeams } from '../utils/helpers';

const initialTeamsState: Teams = {};

export const teams = (
    state = initialTeamsState,
    action: TeamActions | MemberActions | AuthUserActions
): Teams => {
    switch (action.type) {
        case TeamActionType.ReceiveTeams: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case TeamActionType.AddTeam: {
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        }
        case TeamActionType.RemoveTeam: {
            const { [action.payload]: teamToRemove, ...rest } = state;
            return {
                ...rest,
            };
        }
        case TeamActionType.ManageTeamMembers: {
            const { teamId, members } = action.payload;
            return {
                ...state,
                [teamId]: {
                    ...state[teamId],
                    members,
                },
            };
        }
        case MembersActionType.RemoveMember: {
            return removeMemberFromTeams(state, action.payload);
        }
        case AuthUserActionType.UnsetAuthedUser:
            return initialTeamsState;
        default:
            return state;
    }
};

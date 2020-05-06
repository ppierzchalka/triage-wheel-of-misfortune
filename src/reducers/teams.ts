import { AuthUserActions, AuthUserActionType } from '../actions/authUser';
import { TeamActions, TeamActionType, Teams } from '../actions/teams';

const initialTeamsState: Teams = {};

export const teams = (state = initialTeamsState, action: TeamActions | AuthUserActions): Teams => {
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
        case TeamActionType.AddTeamMember: {
            const { teamId, memberId } = action.payload;
            return {
                ...state,
                [teamId]: {
                    ...state[teamId],
                    members: [...state[teamId].members, memberId],
                },
            };
        }
        case TeamActionType.RemoveTeamMember: {
            const { teamId, memberId } = action.payload;
            const newMembers = state[teamId].members.filter((member) => member !== memberId);
            return {
                ...state,
                [teamId]: {
                    ...state[teamId],
                    members: newMembers,
                },
            };
        }
        case AuthUserActionType.UnsetAuthedUser:
            return initialTeamsState;
        default:
            return state;
    }
};

import { removeMemberFromTeams } from '../utils/helpers';
import { AppState, Member, SelectionType, Team } from './types';

export enum AppActionType {
    AddMembers = 'AddMembers',
    RemoveMember = 'RemoveMember',
    AddTeam = 'AddTeam',
    RemoveTeam = 'RemoveTeam',
    ManageTeamMembers = 'ManageTeamMembers',
    RenameTeam = 'RenameTeam',
    SetSelection = 'SetSelection',
    SetSelectionType = 'SetSelectionType',
    ToggleSelection = 'ToggleSelection',
}

export type AppAction =
    | { type: AppActionType.AddMembers; payload: Member[] }
    | { type: AppActionType.RemoveMember; payload: string }
    | { type: AppActionType.AddTeam; payload: Team }
    | { type: AppActionType.RemoveTeam; payload: string }
    | { type: AppActionType.ManageTeamMembers; payload: { teamId: string; members: string[] } }
    | { type: AppActionType.RenameTeam; payload: { teamId: string; teamName: string } }
    | { type: AppActionType.SetSelection; payload: string[] }
    | { type: AppActionType.SetSelectionType; payload: SelectionType }
    | { type: AppActionType.ToggleSelection; payload: string };

export const initialAppState: AppState = {
    members: {},
    teams: {},
    selection: [],
    selectionType: SelectionType.Teams,
};

export const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case AppActionType.AddMembers:
            return {
                ...state,
                members: {
                    ...state.members,
                    ...action.payload.reduce<Record<string, Member>>((acc, member) => {
                        acc[member.id] = member;
                        return acc;
                    }, {}),
                },
            };
        case AppActionType.RemoveMember: {
            const rest = { ...state.members };
            delete rest[action.payload];
            return {
                ...state,
                members: rest,
                teams: removeMemberFromTeams(state.teams, action.payload),
                selection: state.selection.filter((id) => id !== action.payload),
            };
        }
        case AppActionType.AddTeam:
            return {
                ...state,
                teams: { ...state.teams, [action.payload.id]: action.payload },
            };
        case AppActionType.RemoveTeam: {
            const rest = { ...state.teams };
            delete rest[action.payload];
            return {
                ...state,
                teams: rest,
                selection: state.selection.filter((id) => id !== action.payload),
            };
        }
        case AppActionType.ManageTeamMembers: {
            const { teamId, members } = action.payload;
            return {
                ...state,
                teams: {
                    ...state.teams,
                    [teamId]: { ...state.teams[teamId], members },
                },
            };
        }
        case AppActionType.RenameTeam: {
            const { teamId, teamName } = action.payload;
            return {
                ...state,
                teams: {
                    ...state.teams,
                    [teamId]: { ...state.teams[teamId], teamName },
                },
            };
        }
        case AppActionType.SetSelection:
            return { ...state, selection: action.payload };
        case AppActionType.ToggleSelection:
            return {
                ...state,
                selection: state.selection.includes(action.payload)
                    ? state.selection.filter((id) => id !== action.payload)
                    : [...state.selection, action.payload],
            };
        case AppActionType.SetSelectionType:
            return { ...state, selectionType: action.payload, selection: [] };
        default:
            return state;
    }
};

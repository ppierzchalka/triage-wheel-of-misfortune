import { createContext, useContext } from 'react';
import type { Dispatch } from 'react';
import { generateUniqueId } from '../utils/helpers';
import { AppAction, AppActionType } from './reducer';
import { Member, Members, SelectionType, Team, Teams } from './types';

export type AppActions = {
    addMember: (member: Member) => void;
    addMembers: (members: Member[]) => void;
    removeMember: (id: string) => void;
    addTeam: (teamName: string, members?: string[]) => void;
    removeTeam: (id: string) => void;
    manageTeamMembers: (teamId: string, members: string[]) => void;
    renameTeam: (teamId: string, teamName: string) => void;
    setSelection: (selection: string[]) => void;
    toggleSelection: (id: string) => void;
    setSelectionType: (selectionType: SelectionType) => void;
};

export type SelectionState = {
    selection: string[];
    selectionType: SelectionType;
};

export const AppActionsContext = createContext<AppActions | null>(null);
export const MembersContext = createContext<Members | null>(null);
export const TeamsContext = createContext<Teams | null>(null);
export const SelectionContext = createContext<SelectionState | null>(null);

const useNullableContext = <T>(context: React.Context<T | null>, name: string): T => {
    const value = useContext(context);
    if (value === null) {
        throw new Error(`${name} must be used within AppStoreProvider`);
    }
    return value;
};

export const useActions = (): AppActions => useNullableContext(AppActionsContext, 'useActions');
export const useMembers = (): Members => useNullableContext(MembersContext, 'useMembers');
export const useTeams = (): Teams => useNullableContext(TeamsContext, 'useTeams');
export const useSelectionState = (): SelectionState =>
    useNullableContext(SelectionContext, 'useSelectionState');

export const createAppActions = (dispatch: Dispatch<AppAction>): AppActions => ({
    addMember: (member) => dispatch({ type: AppActionType.AddMembers, payload: [member] }),
    addMembers: (members) => dispatch({ type: AppActionType.AddMembers, payload: members }),
    removeMember: (id) => dispatch({ type: AppActionType.RemoveMember, payload: id }),
    addTeam: (teamName, members = []) =>
        dispatch({
            type: AppActionType.AddTeam,
            payload: { id: generateUniqueId(), teamName, members } satisfies Team,
        }),
    removeTeam: (id) => dispatch({ type: AppActionType.RemoveTeam, payload: id }),
    manageTeamMembers: (teamId, members) =>
        dispatch({ type: AppActionType.ManageTeamMembers, payload: { teamId, members } }),
    renameTeam: (teamId, teamName) =>
        dispatch({ type: AppActionType.RenameTeam, payload: { teamId, teamName } }),
    setSelection: (selection) => dispatch({ type: AppActionType.SetSelection, payload: selection }),
    toggleSelection: (id) => dispatch({ type: AppActionType.ToggleSelection, payload: id }),
    setSelectionType: (selectionType) =>
        dispatch({ type: AppActionType.SetSelectionType, payload: selectionType }),
});

import { combineReducers, Reducer } from 'redux';
import { AuthUserActions, UserData } from '../actions/authUser';
import { MemberActions, Members } from '../actions/members';
import { Selection, SelectionActions } from '../actions/selection';
import { TeamActions, Teams } from '../actions/teams';
import { authUser } from './authUser';
import { members } from './members';
import { selection } from './selection';
import { teams } from './teams';

export type RootStateType = {
    teams: Teams;
    members: Members;
    selection: Selection;
    authUser: UserData;
};
export type RootStateActions = TeamActions | MemberActions | AuthUserActions | SelectionActions;

export const rootReducer: Reducer<RootStateType, RootStateActions> = combineReducers({
    authUser,
    members,
    teams,
    selection,
});

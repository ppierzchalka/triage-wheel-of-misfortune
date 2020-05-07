import { combineReducers, Reducer } from 'redux';
import { AuthUserActions, UserData } from '../actions/authUser';
import { MemberActions, Members } from '../actions/members';
import { TeamActions, Teams } from '../actions/teams';
import { authUser } from './authUser';
import { members } from './members';
import { teams } from './teams';

export type RootStateType = {
    teams: Teams;
    members: Members;
    authUser: UserData;
};
export type RootStateActions = TeamActions | MemberActions | AuthUserActions;

export const rootReducer: Reducer<RootStateType, RootStateActions> = combineReducers({
    authUser,
    members,
    teams,
});

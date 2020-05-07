import { combineReducers, Reducer } from 'redux';
import { AuthUser } from '../actions/authUser';
import {  Members } from '../actions/members';
import { Teams } from '../actions/teams';
import { authUser } from './authUser';
import { members } from './members';
import { teams } from './teams';

export type RootStateType = {
    teams: Teams;
    members: Members;
    authUser: AuthUser;
};

export const rootReducer: Reducer<RootStateType, any> = combineReducers({
    teams,
    members,
    authUser
});

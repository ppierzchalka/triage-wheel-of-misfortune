import { describe, expect, it } from 'vitest';
import { removeMemberFromTeams } from '../../utils/helpers';
import { AppActionType, appReducer, initialAppState } from '../reducer';
import { SelectionType } from '../types';

const memberJohn = { id: 'm1', firstName: 'John', lastName: 'Doe' };
const memberJane = { id: 'm2', firstName: 'Jane', lastName: 'Doe' };

const stateWithData = () => {
    let state = appReducer(initialAppState, {
        type: AppActionType.AddMembers,
        payload: [memberJohn],
    });
    state = appReducer(state, { type: AppActionType.AddMembers, payload: [memberJane] });
    state = appReducer(state, {
        type: AppActionType.AddTeam,
        payload: { id: 't1', teamName: 'Frontend', members: ['m1', 'm2'] },
    });
    return state;
};

describe('appReducer', () => {
    it('adds members', () => {
        const state = appReducer(initialAppState, {
            type: AppActionType.AddMembers,
            payload: [memberJohn],
        });
        expect(state.members.m1).toEqual(memberJohn);
    });

    it('adds multiple members at once', () => {
        const state = appReducer(initialAppState, {
            type: AppActionType.AddMembers,
            payload: [memberJohn, memberJane],
        });
        expect(state.members.m1).toEqual(memberJohn);
        expect(state.members.m2).toEqual(memberJane);
    });

    it('removes members from teams and selection', () => {
        const withSelection = {
            ...stateWithData(),
            selection: ['m1', 't1'],
        };
        const state = appReducer(withSelection, {
            type: AppActionType.RemoveMember,
            payload: 'm1',
        });
        expect(state.members.m1).toBeUndefined();
        expect(state.members.m2).toBeDefined();
        expect(state.teams.t1.members).toEqual(['m2']);
        expect(state.selection).toEqual(['t1']);
    });

    it('removes teams from selection', () => {
        const withSelection = {
            ...stateWithData(),
            selection: ['t1'],
        };
        const state = appReducer(withSelection, {
            type: AppActionType.RemoveTeam,
            payload: 't1',
        });
        expect(state.teams.t1).toBeUndefined();
        expect(state.selection).toEqual([]);
    });

    it('manages team members', () => {
        const state = appReducer(stateWithData(), {
            type: AppActionType.ManageTeamMembers,
            payload: { teamId: 't1', members: ['m2'] },
        });
        expect(state.teams.t1.members).toEqual(['m2']);
    });

    it('updates selection', () => {
        const state = appReducer(initialAppState, {
            type: AppActionType.SetSelection,
            payload: ['t1', 't2'],
        });
        expect(state.selection).toEqual(['t1', 't2']);
    });

    it('resets selection when switching selection type', () => {
        const withSelection = {
            ...stateWithData(),
            selection: ['t1'],
        };
        const state = appReducer(withSelection, {
            type: AppActionType.SetSelectionType,
            payload: SelectionType.Members,
        });
        expect(state.selectionType).toBe(SelectionType.Members);
        expect(state.selection).toEqual([]);
    });
});

describe('removeMemberFromTeams', () => {
    it('removes member ids from all teams', () => {
        const teams = {
            a: { id: 'a', teamName: 'A', members: ['m1', 'm2'] },
            b: { id: 'b', teamName: 'B', members: ['m1'] },
        };
        const result = removeMemberFromTeams(teams, 'm1');
        expect(result.a.members).toEqual(['m2']);
        expect(result.b.members).toEqual([]);
    });
});

import { PropsWithChildren, useEffect, useMemo, useReducer } from 'react';
import { loadPersistedState, savePersistedState } from './persistence';
import { appReducer, initialAppState } from './reducer';
import {
    AppActionsContext,
    createAppActions,
    MembersContext,
    SelectionContext,
    TeamsContext,
} from './store';

export const AppStoreProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(
        appReducer,
        null,
        () => loadPersistedState() ?? initialAppState
    );
    const actions = useMemo(() => createAppActions(dispatch), []);
    const membersValue = useMemo(() => state.members, [state.members]);
    const teamsValue = useMemo(() => state.teams, [state.teams]);
    const selectionValue = useMemo(
        () => ({ selection: state.selection, selectionType: state.selectionType }),
        [state.selection, state.selectionType]
    );

    useEffect(() => {
        savePersistedState(state);
    }, [state]);

    return (
        <AppActionsContext.Provider value={actions}>
            <MembersContext.Provider value={membersValue}>
                <TeamsContext.Provider value={teamsValue}>
                    <SelectionContext.Provider value={selectionValue}>
                        {children}
                    </SelectionContext.Provider>
                </TeamsContext.Provider>
            </MembersContext.Provider>
        </AppActionsContext.Provider>
    );
};

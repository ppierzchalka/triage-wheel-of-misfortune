import { AppState } from './types';

export const STORAGE_KEY = 'triage-wheel-of-misfortune:state:v1';

export const loadPersistedState = (): AppState | null => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return null;
        }
        const parsed = JSON.parse(raw) as AppState;
        if (
            parsed &&
            typeof parsed === 'object' &&
            typeof parsed.members === 'object' &&
            parsed.members !== null &&
            typeof parsed.teams === 'object' &&
            parsed.teams !== null &&
            Array.isArray(parsed.selection) &&
            typeof parsed.selectionType === 'string'
        ) {
            return parsed;
        }
        return null;
    } catch {
        return null;
    }
};

export const savePersistedState = (state: AppState): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.error('Failed to persist app state', error);
    }
};

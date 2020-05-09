import { Teams } from '../actions/teams';

export type Nullable<T> = T | null;

export const generateUniqueId = (): string => {
    return Math.random().toString(36).substr(2, 9) + '_' + new Date().getTime().toString();
};
export const noop = (..._params: any) => {
    //
};

export const transformCollection = (
    collection: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
): Record<string, any> => {
    return collection.docs.reduce((agg, curr) => {
        const currentDocument = curr.data();
        return Object.assign(agg, { [currentDocument.id]: currentDocument });
    }, {});
};

export const removeMemberFromTeams = (teams: Teams, memberToRemove: string): Teams => {
    return Object.entries(teams).reduce((teamAgg, [teamId, team]) => {
        const newTeamMembers = team.members.filter(memberId => memberId !== memberToRemove);
        return Object.assign(teamAgg, {
            [teamId]: {
                ...team,
                members: newTeamMembers
            }
        })
    }, {});
}

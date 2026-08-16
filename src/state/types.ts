export type Member = {
    id: string;
    firstName: string;
    lastName: string;
};

export type Team = {
    id: string;
    teamName: string;
    members: string[];
};

export type Members = Record<string, Member>;
export type Teams = Record<string, Team>;

export enum SelectionType {
    Teams = 'Teams',
    Members = 'Members',
}

export type AppState = {
    members: Members;
    teams: Teams;
    selection: string[];
    selectionType: SelectionType;
};

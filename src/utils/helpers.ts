import { Teams } from '../state/types';

export const generateUniqueId = (): string =>
    Math.random().toString(36).slice(2, 11) + '_' + new Date().getTime().toString();

export const removeMemberFromTeams = (teams: Teams, memberToRemove: string): Teams =>
    Object.entries(teams).reduce<Teams>((acc, [teamId, team]) => {
        acc[teamId] = {
            ...team,
            members: team.members.filter((memberId) => memberId !== memberToRemove),
        };
        return acc;
    }, {});

export type ParsedName = {
    firstName: string;
    lastName: string;
};

export const splitFullName = (fullName: string): ParsedName => {
    const tokens = fullName.trim().split(/\s+/).filter(Boolean);
    return {
        firstName: tokens[0] ?? '',
        lastName: tokens.slice(1).join(' '),
    };
};

export const parseMemberNames = (input: string): ParsedName[] => {
    const seen = new Set<string>();
    const result: ParsedName[] = [];
    for (const line of input.split(/[\n,;]+/)) {
        const trimmed = line.trim();
        if (!trimmed) {
            continue;
        }
        const parsed = splitFullName(trimmed);
        if (!parsed.firstName) {
            continue;
        }
        const key = `${parsed.firstName} ${parsed.lastName}`.toLowerCase();
        if (seen.has(key)) {
            continue;
        }
        seen.add(key);
        result.push(parsed);
    }
    return result;
};

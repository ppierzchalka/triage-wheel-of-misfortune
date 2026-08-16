import { describe, expect, it } from 'vitest';
import { parseMemberNames, splitFullName } from '../helpers';

describe('splitFullName', () => {
    it('splits first and last name', () => {
        expect(splitFullName('John Kowalski')).toEqual({ firstName: 'John', lastName: 'Kowalski' });
    });

    it('treats everything after the first word as last name', () => {
        expect(splitFullName('Jan Maria Rokita')).toEqual({
            firstName: 'Jan',
            lastName: 'Maria Rokita',
        });
    });

    it('returns empty strings for empty input', () => {
        expect(splitFullName('  ')).toEqual({ firstName: '', lastName: '' });
    });
});

describe('parseMemberNames', () => {
    it('parses newline separated names', () => {
        expect(parseMemberNames('John Doe\nJane Doe')).toEqual([
            { firstName: 'John', lastName: 'Doe' },
            { firstName: 'Jane', lastName: 'Doe' },
        ]);
    });

    it('parses comma and semicolon separated names', () => {
        expect(parseMemberNames('John Doe, Jane Doe; Jack Black')).toHaveLength(3);
    });

    it('skips empty lines', () => {
        expect(parseMemberNames('John Doe\n\n \nJane Doe')).toHaveLength(2);
    });

    it('removes duplicates case-insensitively', () => {
        expect(parseMemberNames('John Doe\njohn doe\nJane Doe')).toEqual([
            { firstName: 'John', lastName: 'Doe' },
            { firstName: 'Jane', lastName: 'Doe' },
        ]);
    });
});

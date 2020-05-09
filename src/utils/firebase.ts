import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthUser, UserData } from '../actions/authUser';
import { Member } from '../actions/members';
import { Team, Teams } from '../actions/teams';
import { removeMemberFromTeams, transformCollection } from './helpers';

export type FirebaseConfig = {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
};

export enum ModifyOperation {
    Add = 'Add',
    Remove = 'Remove',
}

const firebaseConfig = {
    apiKey: '***REMOVED***',
    authDomain: '***REMOVED***',
    databaseURL: '***REMOVED***',
    projectId: 'triage-wheel-of-misfortune',
    storageBucket: '***REMOVED***',
    messagingSenderId: '***REMOVED***',
    appId: '1:***REMOVED***:web:0f775cea90d9ad3bb7adb3',
    measurementId: '***REMOVED***',
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const firebaseGenerateUserDocument = async (
    user: UserData,
    additionalData?: any
): Promise<any> => {
    if (user === null) {
        return;
    }
    const userRef = firestore.doc(`users/${user.uid}`);
    const userData = await userRef.get();
    if (!userData.exists) {
        const { email } = user;
        try {
            await userRef.set({
                email,
                ...additionalData,
            });
        } catch (e) {
            console.error('error creating user document', e);
        }
    }
    return firebaseGetUserDocument(user.uid);
};

const firebaseGetUserDocument = async (uid: string) => {
    if (!uid) {
        return null;
    }
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();
        const userMembers = await firestore.collection(`users/${uid}/members`).get();
        const userTeams = await firestore.collection(`users/${uid}/teams`).get();
        return {
            uid,
            members: transformCollection(userMembers),
            teams: transformCollection(userTeams),
            ...userDocument.data(),
        };
    } catch (e) {
        console.error('error getting user document', e);
        return null;
    }
};

export function firebaseAddEntry(
    user: AuthUser,
    entry: Member,
    key: 'members'
): Promise<Member | null>;
export function firebaseAddEntry(user: AuthUser, entry: Team, key: 'teams'): Promise<Team | null>;
export function firebaseAddEntry(
    user: AuthUser,
    entry: Member | Team,
    key: 'members' | 'teams'
): Promise<Member | Team | null> {
    const entryRef = firestore.collection(`users/${user.uid}/${key}`).doc(entry.id);
    return entryRef
        .set(entry)
        .then(() => entry)
        .catch((error) => {
            console.error(error);
            return null;
        });
}

export async function firebaseModifyMembers(
    user: AuthUser,
    teamId: string,
    memberId: string,
    operation: ModifyOperation
) {
    const entryRef = firestore.collection(`users/${user.uid}/teams`).doc(teamId);
    const document = await entryRef.get();
    const entryData = document.data();
    if (!entryData) {
        return;
    }
    const entryMembers = entryData.members;
    return entryRef
        .set(
            {
                members:
                    operation === ModifyOperation.Add
                        ? [...entryMembers, memberId]
                        : entryMembers.filter((member: string) => member !== memberId),
            },
            { merge: true }
        )
        .catch((error) => {
            console.error(error);
            return error;
        });
}

export function firebaseRemoveTeam(user: AuthUser, id: string) {
    return firestore
        .collection(`users/${user.uid}/teams`)
        .doc(id)
        .delete()
        .then(() => id)
        .catch((error) => {
            console.error(error);
            return null;
        });
}

export function firebaseRemoveMember(user: AuthUser, id: string) {
    const userMembers = firestore.collection(`users/${user.uid}/members`).doc(id).delete();
    const userTeams = firestore.collection(`users/${user.uid}/teams`).get();

    return Promise.all([userMembers, userTeams])
        .then(([_members, teams]) => {
            const newTeams = removeMemberFromTeams(transformCollection(teams) as Teams, id);
            teams.forEach((team) => {
                team.ref
                    .set(newTeams[team.id])
                    .then(() => {
                        return id;
                    })
                    .catch((error) => {
                        console.error(`error removing member: ${id} from team: ${team.id}`, error);
                        return error;
                    });
            });
        })
        .then(() => id)
        .catch((error) => {
            console.error('error removing member', error);
            return null;
        });
}

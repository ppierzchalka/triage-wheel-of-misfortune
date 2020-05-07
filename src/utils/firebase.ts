import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthedUser, AuthUser } from '../actions/authUser';
import { Member } from '../actions/members';
import { Team } from '../actions/teams';
import { transformCollection } from './helpers';

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

export function updateEntry(user: AuthedUser, entry: Member, key: 'members'): Promise<Member>;
export function updateEntry(user: AuthedUser, entry: Team, key: 'teams'): Promise<Team>;
export function updateEntry( user: AuthedUser, entry: Member | Team, key: 'members' | 'teams'): Promise<Member | Team> {
    const userRef = firestore.collection(`users/${user.uid}/${key}`).doc(entry.id);
    return userRef
        .set({ [entry.id]: entry })
        .then(() => entry)
        .catch((error) => {
            console.error(error);
            return error;
        });
};

export const generateUserDocument = async (user: AuthUser, additionalData?: any): Promise<any> => {
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
    return getUserDocument(user.uid);
};

const getUserDocument = async (uid: string) => {
    if (!uid) {
        return null;
    }
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();
        const userMembers = await firestore.collection((`users/${uid}/members`)).get()
        const userTeams = await firestore.collection(`users/${uid}/teams`).get()
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

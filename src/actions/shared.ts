import { Dispatch } from 'redux';
import { auth, generateUserDocument } from '../utils/firebase';
import { signIn, signOut } from './authUser';
import { receiveMembers } from './members';
import { receiveTeams } from './teams';

export const handleInitialData = () => (dispatch: Dispatch<any>) => {
        auth.onAuthStateChanged(async (authUser) => {
            const authUserData = await generateUserDocument(authUser);
            if (authUserData) {
                dispatch(signIn(authUserData));
                dispatch(receiveMembers(authUserData.members));
                dispatch(receiveTeams(authUserData.teams));
            }
            if (!authUserData) {
                dispatch(signOut());
            }
        });
}

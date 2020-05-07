import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootStateActions } from '../reducers';
import { auth, generateUserDocument } from '../utils/firebase';
import { signIn, signOut } from './authUser';
import { receiveMembers } from './members';
import { receiveTeams } from './teams';

export const handleInitialData = (): ThunkAction<void, {}, {}, RootStateActions> => (
    dispatch: Dispatch<RootStateActions>
) => {
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
};

import { Box } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from './reducers';

export const App: React.FC = () => {
    const user = useSelector((state: RootStateType) => state.authUser);

    return (
        <Box>
            {user
                ? (
                    <p>app</p>)
                : (
                    <p>register</p>)}
        </Box>
    )
}

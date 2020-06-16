import { Container, Typography } from '@material-ui/core';
import React from 'react';
import { WheelIcon } from '../HomePage/WheelIcon';

export const Placeholder: React.FC = () => {
    return (
        <Container classes={{ root: 'placeholder__wrapper' }}>
            <WheelIcon />
            <Typography variant="subtitle1">
                Select between 2 and 50 participants to start
            </Typography>
        </Container>
    );
};

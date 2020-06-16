import { Container } from '@material-ui/core';
import React from 'react';
import { Guide } from '../Guide/Guide';
import { WheelOfMisfortune } from '../WheelOfMisfortune/WheelOfMisfortune';

export const MainApp: React.FC = () => {
    return (
        <Container classes={{ root: 'main-app__container' }}>
            <Guide />
            <WheelOfMisfortune
                participants={[
                    {
                        text: 'Przemek',
                        fillStyle: '#00ff00',
                    },
                    {
                        text: 'Marta',
                        fillStyle: '#ff00ff',
                    },
                ]}
            />
        </Container>
    );
};

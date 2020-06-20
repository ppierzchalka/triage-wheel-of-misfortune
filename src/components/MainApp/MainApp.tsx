import { Container } from '@material-ui/core';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../reducers';
import { Guide } from '../Guide/Guide';
import { useSelection } from '../WheelOfMisfortune/useSelection';
import { WheelOfMisfortune } from '../WheelOfMisfortune/WheelOfMisfortune';
import { prepareParticipantsData } from './utils';

export const MainApp: React.FC = () => {
    const { members, teams, selection: selectionData } = useSelector(
        (state: RootStateType) => state
    );
    const participants = useSelection(members, teams, selectionData);

    const participantsData = useMemo(() => prepareParticipantsData(participants), [participants]);

    return (
        <div className={'main-app__wrapper'}>
            <Container classes={{ root: 'main-app__container' }}>
                <Guide />
                <WheelOfMisfortune participants={participantsData} />
            </Container>
        </div>
    );
};

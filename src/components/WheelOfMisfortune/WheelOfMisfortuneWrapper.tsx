import React from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../reducers';
import { useSelection } from './useSelection';

export const WheelOfMisfortuneWrapper: React.FC = () => {
    const { members, teams, selection: selectionData } = useSelector(
        (state: RootStateType) => state
    );
    const participants = useSelection(members, teams, selectionData);

    console.log(participants);

    return <div>{JSON.stringify(participants)}</div>;
};

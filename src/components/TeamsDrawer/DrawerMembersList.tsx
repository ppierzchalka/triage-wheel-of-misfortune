import { Container } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../reducers';

export const DrawerMembersList: React.FC = () => {
    const members = useSelector((state: RootStateType) => state.members);

    return (
        <Container>
            {Object.values(members).map((member, memberIndex) => (
                <div key={memberIndex}>
                    <p>{member.firstName}</p>
                    <p>{member.lastName}</p>
                </div>
            ))}
        </Container>
    );
};

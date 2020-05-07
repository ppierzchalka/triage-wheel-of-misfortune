import React from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../reducers';

export const DrawerTeamsList: React.FC = () => {
    const teams = useSelector((state: RootStateType) => state.teams);
    return (
        <div>
            {Object.values(teams).map((team, teamIndex) => (
                <div key={teamIndex}>
                    <p>{team.teamName}</p>
                    {Object.values(team.members).map((member, memberIndex) => (
                        <p key={memberIndex}>{member}</p>
                    ))}
                </div>
            ))}
        </div>
    )
}

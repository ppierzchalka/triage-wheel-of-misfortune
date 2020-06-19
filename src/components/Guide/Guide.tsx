import { Typography } from '@material-ui/core';
import React from 'react';

export const Guide = () => {
    return (
        <div className={'guide__container'}>
            <Typography variant="h2" gutterBottom>
                How to use it?
            </Typography>
            <Typography variant="h6" gutterBottom>
                Members and Teams management
            </Typography>
            <Typography paragraph variant="body1" gutterBottom>
                There are two views in drawer, team view, and members view. <br />
                In Teams view you can select whole team, check team participants or add existing
                members to the team. <br />
                In members view you can select individual members, add new members or remove them.
            </Typography>
            <Typography variant="h6" gutterBottom>
                Selecting participants
            </Typography>
            <Typography paragraph variant="body1" gutterBottom>
                Use drawer menu on the left to select participants for bug lottery. <br />
                You can select individual members or whole teams.
            </Typography>
            <Typography variant="h6" gutterBottom>
                Using the wheel
            </Typography>
            <Typography paragraph variant="body1" gutterBottom>
                When participants are selected, use sliders below the wheel to adjust spinning
                parameters and use spin the wheel button to find out the lucky winner. If you are
                not satisfied with the result, you can reset the wheel, and start again.
            </Typography>
        </div>
    );
};

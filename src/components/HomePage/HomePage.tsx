import { Button, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { WheelIcon } from './WheelIcon';

export type HomePageProps = {
    onShowLoginModal: VoidFunction;
};

export const HomePage: React.FC<HomePageProps> = ({ onShowLoginModal }) => {
    return (
        <Container classes={{ root: 'homepage__wrapper' }}>
            <Grid container>
                <Grid item xs={12} sm={3} classes={{ root: 'homepage__grid-container' }}>
                    <WheelIcon />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={9}
                    classes={{ root: 'homepage__grid-container homepage__text' }}
                >
                    <Container>
                        <Typography gutterBottom variant="subtitle1">
                            Welcome to:
                        </Typography>
                        <Typography
                            classes={{ root: 'homepage__title' }}
                            variant="h1"
                            component="h2"
                            gutterBottom
                        >
                            Triage wheel of misfortune
                        </Typography>
                        <Typography gutterBottom variant="body1">
                            Having trouble with finding a volunteer to fix a bug in your project?
                            <br />
                            Fear no more, find the (not so) lucky winner of your special prize with
                            this magnificent tool!
                            <br />
                            Just log in, add developers as participants and start saving your time!
                        </Typography>
                    </Container>
                    <Container classes={{ root: 'homepage__button-wrapper' }}>
                        <Button variant="outlined" color="primary" onClick={onShowLoginModal}>
                            Create account to continue
                        </Button>
                    </Container>
                </Grid>
            </Grid>
        </Container>
    );
};

import { Button, Container, Typography } from '@material-ui/core';
import React from 'react';

export type DrawerSignUpContentProps = {
    onShowLoginModal: VoidFunction;
    closeButton: React.ReactElement;
};

export const DrawerSignUpContent: React.FC<DrawerSignUpContentProps> = ({
    onShowLoginModal,
    closeButton,
}) => {
    return (
        <React.Fragment>
            <Container
                classes={{
                    root: 'drawer__close-button-wrapper drawer__close-button-wrapper--anonymous',
                }}
            >
                {closeButton}
            </Container>
            <Container classes={{ root: 'drawer__anonymous-content' }}>
                <Typography variant="h4" classes={{ root: 'drawer__sign-in-title' }} gutterBottom>
                    You are not signed in.
                </Typography>
                <Typography
                    variant="subtitle1"
                    classes={{ root: 'drawer__sign-in-subtitle' }}
                    gutterBottom
                >
                    Please sign in to continue
                </Typography>
                <Button
                    color="inherit"
                    classes={{ root: 'drawer__sign-in' }}
                    onClick={onShowLoginModal}
                >
                    Sign In
                </Button>
            </Container>
        </React.Fragment>
    );
};

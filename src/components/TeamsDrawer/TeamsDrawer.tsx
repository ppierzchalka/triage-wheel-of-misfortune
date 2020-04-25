import { Container, Drawer, DrawerProps, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../reducers';
import { DrawerSignUpContent } from './DrawerSignUpContent';
import { DrawerUserContent } from './DrawerUserContent';

export type TeamsDrawerProps = {
    anchor?: DrawerProps['anchor'];
    isOpen: boolean;
    onShowLoginModal: VoidFunction;
    onClose: VoidFunction;
}

export const TeamsDrawer: React.FC<TeamsDrawerProps> = ({
    anchor,
    isOpen,
    onClose,
    onShowLoginModal
}) => {
    const authUser = useSelector((state: RootStateType) => state.authUser);
    return (
        <Drawer anchor={anchor} open={isOpen} onClose={onClose} classes={{ root: 'drawer' }}>
            <Container classes={{ root: 'drawer__close-button-wrapper' }}>
                <IconButton edge="start" color="inherit" aria-label="Close" onClick={onClose} classes={{ root: 'drawer__close-button' }}>
                    <Close />
                </IconButton>
            </Container>
            <Container classes={{ root: 'drawer__wrapper' }}>
                {authUser
                    ? <DrawerUserContent />
                    : <DrawerSignUpContent onShowLoginModal={onShowLoginModal}/>
                }
            </Container>
        </Drawer>
    )
}

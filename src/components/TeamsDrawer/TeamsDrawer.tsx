import { Container, Drawer, DrawerProps } from '@material-ui/core';
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
        <Drawer anchor={anchor} open={isOpen} onClose={onClose}>
            <Container classes={{root: 'drawer__wrapper'}}>
                {authUser
                    ? <DrawerUserContent />
                    : <DrawerSignUpContent onShowLoginModal={onShowLoginModal}/>
                }
            </Container>
        </Drawer>
    )
}

import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../reducers';

export type HeaderProps = {
    onToggleDrawer: VoidFunction;
    onShowLoginModal: VoidFunction;
    onLogOut: VoidFunction;
}

export const Header: React.FC<HeaderProps> = ({ onToggleDrawer, onShowLoginModal, onLogOut }) => {
    const authUser = useSelector((state: RootStateType) => state.authUser);
    return (
        <AppBar position="static" classes={{root: 'app-bar'}}>
            <Toolbar classes={{ root: 'app-bar__toolbar' }}>
                <IconButton edge="start" color="inherit" aria-label="Teams Menu" onClick={onToggleDrawer}>
                    <Menu />
                </IconButton>
                <div className="app-bar__user-menu">
                    {authUser
                        ? <Button
                            color="inherit"
                            classes={{ root: 'app-bar__user-account-button' }}
                            onClick={onLogOut}
                        >
                            Log Out
                        </Button>
                        : <Button
                            color="inherit"
                            classes={{ root: 'app-bar__user-account-button' }}
                            onClick={onShowLoginModal}
                        >
                            Log In
                            </Button>
                    }
                </div>
            </Toolbar>
        </AppBar>
    )
}

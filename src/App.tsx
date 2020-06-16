import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { signOut, UserData } from './actions/authUser';
import { handleInitialData } from './actions/shared';
import { AnonymousDialog } from './components/AnonymousDialog/AnonymousDialog';
import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage/HomePage';
import { MainApp } from './components/MainApp/MainApp';
import { TeamsDrawer } from './components/TeamsDrawer/TeamsDrawer';
import { RootStateType } from './reducers';
import { auth } from './utils/firebase';

export type AppWrapperProps = {
    authUser: UserData;
    dispatch: Dispatch<any>;
};

export type AppWrapperState = {
    isDrawerVisible: boolean;
    isModalVisible: boolean;
};

class AppWrapper extends React.Component<AppWrapperProps, AppWrapperState> {
    state = {
        isDrawerVisible: false,
        isModalVisible: false,
    };

    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    private handleToggleDrawer = (isDrawerVisible: boolean) => {
        this.setState({ isDrawerVisible });
    };

    private handleShowLoginModal = (isModalVisible: boolean) => {
        if (!this.props.authUser) {
            this.setState({ isDrawerVisible: false, isModalVisible });
        }
    };

    private handleLogOut = () => {
        if (this.props.authUser) {
            auth.signOut()
                .then(() => {
                    this.props.dispatch(signOut());
                })
                .catch((error) => {
                    console.error('error signing out', error);
                });
        }
    };

    render() {
        const { authUser } = this.props;
        const { isDrawerVisible, isModalVisible } = this.state;
        return (
            <React.Fragment>
                <Header
                    onToggleDrawer={() => this.handleToggleDrawer(true)}
                    onShowLoginModal={() => this.handleShowLoginModal(true)}
                    onLogOut={this.handleLogOut}
                />
                <TeamsDrawer
                    isOpen={isDrawerVisible}
                    onShowLoginModal={() => this.handleShowLoginModal(true)}
                    onClose={() => this.handleToggleDrawer(false)}
                />
                {!authUser && (
                    <AnonymousDialog
                        isOpen={isModalVisible}
                        onClose={() => this.handleShowLoginModal(false)}
                    />
                )}
                {authUser ? (
                    <MainApp />
                ) : (
                    <HomePage onShowLoginModal={() => this.handleShowLoginModal(true)} />
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootStateType) => ({
    authUser: state.authUser,
});

export const App = connect(mapStateToProps)(AppWrapper);

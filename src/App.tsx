import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AuthUser, signIn, signOut } from './actions/authUser';
import { AnonymousDialog } from './components/AnonymousDialog/AnonymousDialog';
import { BodyWrapper } from './components/BodyWrapper/BodyWrapper';
import { Header } from './components/Header/Header';
import { TeamsDrawer } from './components/TeamsDrawer/TeamsDrawer';
import { RootStateActions, RootStateType } from './reducers';
import { auth, generateUserDocument } from './utils/firebase';

export type AppWrapperProps = {
    authUser: AuthUser;
    dispatch: Dispatch<RootStateActions>
}
export type AppWrapperState = {
    isDrawerVisible: boolean;
    isModalVisible: boolean;
}

class AppWrapper extends React.Component<AppWrapperProps, AppWrapperState> {
    state = {
        isDrawerVisible: false,
        isModalVisible: false,
    }

    componentDidMount() {
        auth.onAuthStateChanged(async (authUser) => {
            const user = await generateUserDocument(authUser);
            if (user) {
                this.props.dispatch(signIn(user))
            }
            if (!user) {
                this.props.dispatch(signOut())
            }
        })
    }

    private handleToggleDrawer = (isDrawerVisible: boolean) => {
        this.setState({ isDrawerVisible })
    }

    private handleShowLoginModal = (isModalVisible: boolean) => {
        if (!this.props.authUser) {
            this.setState({ isDrawerVisible: false, isModalVisible })
        }
    }

    private handleLogOut = () => {
        if (this.props.authUser) {
            auth.signOut();
            this.props.dispatch(signOut())
        }
    }

    private renderApp = () => (
        <p>App</p>
    )

    private renderLogIn = () => (
        <p>Log In</p>
    )

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
                {
                    !authUser &&
                    <AnonymousDialog
                        isOpen={isModalVisible}
                        onClose={() => this.handleShowLoginModal(false)}
                    />
                }
                <BodyWrapper>
                    {authUser
                        ? this.renderApp()
                        : this.renderLogIn()
                    }
                </BodyWrapper>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: RootStateType) => ({
    authUser: state.authUser
});

export const App = connect(mapStateToProps)(AppWrapper)

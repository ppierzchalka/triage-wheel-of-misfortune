import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { signOut, UserData } from './actions/authUser';
import { addMemberToDB } from './actions/members';
import { handleInitialData } from './actions/shared';
import { addTeamToDB } from './actions/teams';
import { AnonymousDialog } from './components/AnonymousDialog/AnonymousDialog';
import { BodyWrapper } from './components/BodyWrapper/BodyWrapper';
import { Header } from './components/Header/Header';
import { TeamsDrawer } from './components/TeamsDrawer/TeamsDrawer';
import { RootStateType } from './reducers';
import { auth } from './utils/firebase';

export type AppWrapperProps = {
    authUser: UserData;
    dispatch: Dispatch<any>
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
        this.props.dispatch(handleInitialData())
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

    private handleClickMember = () => {
        if (this.props.authUser) {
            this.props.dispatch(addMemberToDB(this.props.authUser, 'Przemek', 'P'))
        }
    }

    private handleClickTeam = () => {
        if (this.props.authUser) {
            this.props.dispatch(addTeamToDB(this.props.authUser, 'Przemek'))
        }
    }

    private renderApp = () => (
        <div>
            <p>App</p>
            <button onClick={this.handleClickMember}>
                add member
            </button>
            <button onClick={this.handleClickTeam}>
                add team
            </button>
        </div>
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

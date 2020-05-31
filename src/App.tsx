import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { signOut, UserData } from './actions/authUser';
import { addMemberToDB, removeMemberFromDB } from './actions/members';
import { handleInitialData } from './actions/shared';
import {
    addTeamMemberToDB,
    addTeamToDB,
    removeTeamFromDB,
    RemoveTeamMemberFromDB,
} from './actions/teams';
import { AnonymousDialog } from './components/AnonymousDialog/AnonymousDialog';
import { BodyWrapper } from './components/BodyWrapper/BodyWrapper';
import { Header } from './components/Header/Header';
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

    private handleClickMember = () => {
        if (this.props.authUser) {
            this.props.dispatch(addMemberToDB(this.props.authUser, 'Przemek', 'P'));
        }
    };

    private handleClickRemoveMember = () => {
        if (this.props.authUser) {
            this.props.dispatch(removeMemberFromDB(this.props.authUser, 'nzlj26rm0_1588895193889'));
        }
    };

    private handleClickTeam = () => {
        if (this.props.authUser) {
            this.props.dispatch(addTeamToDB(this.props.authUser, 'Przemek'));
        }
    };

    private handleClickRemoveTeam = () => {
        if (this.props.authUser) {
            this.props.dispatch(removeTeamFromDB(this.props.authUser, '1ogncf9a8_1588890872447'));
        }
    };

    private handleClickAddTeamMember = () => {
        if (this.props.authUser) {
            this.props.dispatch(
                addTeamMemberToDB(this.props.authUser, '0ryzjm2zx_1588896122718', 'test')
            );
        }
    };

    private handleClickRemoveTeamMember = () => {
        if (this.props.authUser) {
            this.props.dispatch(
                RemoveTeamMemberFromDB(this.props.authUser, '1q0hse206_1588895197120', 'test')
            );
        }
    };

    private renderApp = () => (
        <div>
            <p>App</p>
            <button onClick={this.handleClickMember}>add member</button>
            <button onClick={this.handleClickRemoveMember}>remove member</button>
            <button onClick={this.handleClickTeam}>add team</button>
            <button onClick={this.handleClickRemoveTeam}>remove team</button>
            <button onClick={this.handleClickAddTeamMember}>add team member</button>
            <button onClick={this.handleClickRemoveTeamMember}>remove team member</button>
        </div>
    );

    private renderLogIn = () => <p>Log In</p>;

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
                <BodyWrapper>{authUser ? this.renderApp() : this.renderLogIn()}</BodyWrapper>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootStateType) => ({
    authUser: state.authUser,
});

export const App = connect(mapStateToProps)(AppWrapper);

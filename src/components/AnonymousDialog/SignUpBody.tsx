import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { auth, firebaseGenerateUserDocument } from '../../utils/firebase';
import { ModalView } from './AnonymousDialog';
import { LoadingIndicator } from './LoadingIndicator';

export type SignUpBodyProps = {
    onSetModalView: (modalView: ModalView) => void;
    onClose: VoidFunction;
};

export const SignUpBody: React.FC<SignUpBodyProps> = ({ onSetModalView, onClose }) => {
    let mounted = true;
    const [showLoadingIndicator, setShowLoadingIndicator] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatedPassword, setRepeatedPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!mounted) {
            return;
        }
        const { id, value } = event.currentTarget;
        if (id === 'name') {
            setName(value);
        }
        if (id === 'email') {
            setEmail(value);
        }
        if (id === 'password') {
            setPassword(value);
        }
        if (id === 'password-repeat') {
            setRepeatedPassword(value);
        }
    };

    const handleSignUp = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setShowLoadingIndicator(true);
        if (mounted) {
            try {
                const { user } = await auth.createUserWithEmailAndPassword(email, password);
                setShowLoadingIndicator(false);
                firebaseGenerateUserDocument(user, { displayName: name }).catch((error) => {
                    console.error('error in SignUpBody:', error);
                });
            } catch (error) {
                setShowLoadingIndicator(false);
                if (error.code.includes('password') && mounted) {
                    setPasswordError(error.message);
                }
                if (error.code.includes('email') && mounted) {
                    setEmailError(error.message);
                }
                console.error('Error while signing up', error);
            }
        }
    };

    const handleClose = () => {
        mounted = false;
        onClose();
    };

    const verifiedPassword = useMemo(() => {
        if (password !== '' && repeatedPassword !== '') {
            return password === repeatedPassword;
        }
        return true;
    }, [password, repeatedPassword]);

    const isFormCorrect = useMemo(() => {
        return (
            password !== '' &&
            repeatedPassword !== '' &&
            email !== '' &&
            emailError === '' &&
            passwordError === '' &&
            verifiedPassword
        );
    }, [email, password, repeatedPassword, emailError, passwordError, verifiedPassword]);

    const passwordHelperText = useMemo(() => {
        if (passwordError !== '') {
            return passwordError;
        }
        if (password !== repeatedPassword && repeatedPassword !== '') {
            return 'Passwords do not match.';
        }
        return undefined;
    }, [password, repeatedPassword, passwordError]);

    return (
        <React.Fragment>
            <DialogTitle>Sign Up</DialogTitle>
            <DialogContent>
                {showLoadingIndicator && <LoadingIndicator />}
                <DialogContentText>Register a new account</DialogContentText>
                <form onSubmit={handleSignUp} className="anonymous-dialog__form">
                    <TextField
                        value={name}
                        margin="dense"
                        id="name"
                        label="Display name (optional)"
                        type="text"
                        fullWidth
                        onChange={(event) => onChangeHandler(event)}
                    />
                    <TextField
                        value={email}
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        helperText={emailError !== '' && emailError}
                        error={emailError !== ''}
                        onChange={(event) => onChangeHandler(event)}
                    />
                    <TextField
                        value={password}
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        helperText={passwordHelperText}
                        error={!verifiedPassword || passwordError !== ''}
                        onChange={(event) => onChangeHandler(event)}
                    />
                    <TextField
                        value={repeatedPassword}
                        margin="dense"
                        id="password-repeat"
                        label="Repeat Password"
                        type="password"
                        fullWidth
                        helperText={passwordHelperText}
                        error={!verifiedPassword || passwordError !== ''}
                        onChange={(event) => onChangeHandler(event)}
                    />
                    <Button
                        classes={{ root: 'anonymous-dialog__submit' }}
                        type="submit"
                        color="primary"
                        disabled={!isFormCorrect}
                        variant="contained"
                    >
                        Sign Up
                    </Button>
                </form>
                <div className="anonymous-dialog__bottom-text">
                    <DialogContentText>
                        Have an account?{' '}
                        <button
                            className="anonymous-dialog__bottom-button"
                            onClick={() => onSetModalView(ModalView.SignIn)}
                        >
                            Sign In
                        </button>
                    </DialogContentText>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="default">
                    Cancel
                </Button>
            </DialogActions>
        </React.Fragment>
    );
};

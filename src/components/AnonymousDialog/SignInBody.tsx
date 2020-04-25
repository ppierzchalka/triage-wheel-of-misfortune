import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { auth } from '../../utils/firebase';
import { ModalView } from './AnonymousDialog';
import { LoadingIndicator } from './LoadingIndicator';

export type SignInBodyProps = {
    onSetModalView: (modalView: ModalView) => void;
    onClose: VoidFunction;
}

export const SignInBody: React.FC<SignInBodyProps> = ({ onSetModalView, onClose }) => {
    let mounted = true;
    const [showLoadingIndicator, setShowLoadingIndicator] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [signInError, setSignInError] = useState<string>('');

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if(!mounted) {
            return
        }
        const { id, value } = event.currentTarget;
        if (id === 'email') {
            setEmail(value);
        }
        if (id === 'password') {
            setPassword(value);
        }
        if (signInError !== '') {
            setSignInError('')
        }
    };

    const handleSignIn = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setShowLoadingIndicator(true);
        if (mounted) {
            auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                setShowLoadingIndicator(false);
                onClose()
            })
            .catch((error) => {
                setPassword('');
                setShowLoadingIndicator(false);
                setSignInError(error.message)
            })
        }
    }

    const handleClose = () => {
        mounted = false;
        onClose()
    }

    const isFormCorrect = useMemo(() => {
        return password !== ''
            && email !== ''
    }, [email, password])

    return (
        <React.Fragment>
            <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
            <DialogContent>
                {showLoadingIndicator &&
                    <LoadingIndicator />}
                <DialogContentText>
                    Sign in to continue
            </DialogContentText>
                <div className="anonymous-dialog_form">
                    <TextField
                        value={email}
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        helperText={signInError !== '' && signInError}
                        error={signInError !== ''}
                        onChange={(event) => onChangeHandler(event)}
                    />
                    <TextField
                        value={password}
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        onChange={(event) => onChangeHandler(event)}
                    />
                </div>
                <div className="anonymous-dialog__bottom-text">
                    <DialogContentText>
                        Don't have an account?
                        {' '}
                        <button
                            className="anonymous-dialog__bottom-button"
                            onClick={() => onSetModalView(ModalView.SignUp)}
                        >
                            Sign Up
                            </button>
                        {' / '}
                        <button
                            className="anonymous-dialog__bottom-button"
                            onClick={() => onSetModalView(ModalView.ForgotPassword)}
                        >
                            Password Recovery
                            </button>
                    </DialogContentText>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="default">
                    Cancel
                </Button>
                <Button onClick={handleSignIn} color="primary" disabled={!isFormCorrect}>
                    Sign In
                </Button>
            </DialogActions>
        </React.Fragment>
    )
}

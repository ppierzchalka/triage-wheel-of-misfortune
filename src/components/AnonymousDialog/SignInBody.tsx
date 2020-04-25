import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { auth } from '../../utils/firebase';
import { emailRegexp } from '../../utils/helpers';
import { ModalView } from './AnonymousDialog';

export type SignInBodyProps = {
    onSetModalView: (modalView: ModalView) => void;
    onClose: VoidFunction;
}

export const SignInBody: React.FC<SignInBodyProps> = ({ onSetModalView, onClose }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.currentTarget;
        if (id === 'email') {
            setEmail(value);
        }
        if (id === 'password') {
            setPassword(value);
        }
        if (error !== '') {
            setError('')
        }
    };

    const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch(setError)
    }

    const verifiedEmail = useMemo(() => {
        if (email !== '') {
            return emailRegexp.test(email);
        }
        return true;
    }, [email])

    const isFormCorrect = useMemo(() => {
        return password !== ''
            && email !== ''
            && verifiedEmail
    }, [email, password, verifiedEmail])

    useEffect(() => {
        if (error !== '') {
            setEmail('');
            setPassword('');
        }
    }, [error])

    return (
        <React.Fragment>
            <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
            <DialogContent>
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
                        error={!verifiedEmail || error !== ''}
                        onChange={(event) => onChangeHandler(event)}
                    />
                    <TextField
                        value={password}
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        error={error !== ''}
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
                <Button onClick={onClose} color="default">
                    Cancel
                </Button>
                <Button onClick={handleSignIn} color="primary" disabled={!isFormCorrect}>
                    Sign In
                </Button>
            </DialogActions>
        </React.Fragment>
    )
}

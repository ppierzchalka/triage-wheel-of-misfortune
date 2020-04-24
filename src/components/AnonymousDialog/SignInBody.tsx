import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { emailRegexp } from '../../utils/helpers';
import { ModalView } from './AnonymousDialog';

export type SignInBodyProps = {
    onSetModalView: (modalView: ModalView) => void;
    onClose: VoidFunction;
}

export const SignInBody: React.FC<SignInBodyProps> = ({ onSetModalView, onClose }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.currentTarget;
        if (id === 'email') {
            setEmail(value);
        }
        if (id === 'password') {
            setPassword(value);
        }
    };

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
                        error={!verifiedEmail}
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
                <Button onClick={onClose} color="primary" disabled={!isFormCorrect}>
                    Sign In
                </Button>
            </DialogActions>
        </React.Fragment>
    )
}

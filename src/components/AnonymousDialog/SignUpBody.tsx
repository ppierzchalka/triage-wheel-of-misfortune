import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { emailRegexp } from '../../utils/helpers';
import { ModalView } from './AnonymousDialog';

export type SignUpBodyProps = {
    onSetModalView: (modalView: ModalView) => void;
    onClose: VoidFunction;
}

export const SignUpBody: React.FC<SignUpBodyProps> = ({ onSetModalView, onClose }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatedPassword, setRepeatedPassword] = useState<string>('');

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const verifiedEmail = useMemo(() => {
        if (email !== '') {
            return emailRegexp.test(email);
        }
        return true;
    }, [email])

    const verifiedPassword = useMemo(() => {
        if (password !== '' && repeatedPassword !== '') {
            return password === repeatedPassword;
        }
        return true;
    }, [password, repeatedPassword])

    const isFormCorrect = useMemo(() => {
        return name !== ''
            && password !== ''
            && repeatedPassword !== ''
            && email !== ''
            && verifiedPassword
            && verifiedEmail
    }, [name, email, password, repeatedPassword, verifiedEmail, verifiedPassword])

    return (
        <React.Fragment>
            <DialogTitle>Sign Up</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Register a new account
            </DialogContentText>
                <div className="anonymous-dialog_form">
                    <TextField
                        value={name}
                        margin="dense"
                        id="name"
                        label="Display name"
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
                        error={!verifiedPassword}
                        onChange={(event) => onChangeHandler(event)}
                    />
                    <TextField
                        value={repeatedPassword}
                        margin="dense"
                        id="password-repeat"
                        label="Repeat Password"
                        type="password"
                        fullWidth
                        error={!verifiedPassword}
                        onChange={(event) => onChangeHandler(event)}
                    />
                </div>
                <div className="anonymous-dialog__bottom-text">
                    <DialogContentText>
                        Have an account?
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
                <Button onClick={onClose} color="default">
                    Cancel
                </Button>
                <Button onClick={onClose} color="primary" disabled={!isFormCorrect}>
                    Sign Up
                </Button>
            </DialogActions>
        </React.Fragment>
    )
}

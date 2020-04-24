import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { emailRegexp } from '../../utils/helpers';
import { ModalView } from './AnonymousDialog';

export type ForgotPasswordBodyProps = {
    onSetModalView: (modalView: ModalView) => void;
    onClose: VoidFunction;
}

export const ForgotPasswordBody: React.FC<ForgotPasswordBodyProps> = ({ onSetModalView, onClose }) => {
    const [email, setEmail] = useState<string>('');

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.currentTarget;
        setEmail(value);
    };

    const verifiedEmail = useMemo(() => {
        if (email !== '') {
            return emailRegexp.test(email);
        }
        return true;
    }, [email])

    const isFormCorrect = useMemo(() => {
        return email !== ''
            && verifiedEmail
    }, [email, verifiedEmail])

    return (
        <React.Fragment>
            <DialogTitle>Password Recovery</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter an email adress to recover your password
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
                    Recover Password
                </Button>
            </DialogActions>
        </React.Fragment>
    )
}

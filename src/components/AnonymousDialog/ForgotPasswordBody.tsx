import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';
import { ModalView } from './AnonymousDialog';

export type ForgotPasswordBodyProps = {
    onSetModalView: (modalView: ModalView) => void;
    onClose: VoidFunction;
}

export const ForgotPasswordBody: React.FC<ForgotPasswordBodyProps> = ({ onSetModalView, onClose }) => {
    return (
        <React.Fragment>
            <DialogTitle id="form-dialog-title">Password Recovery</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter an email adress to recover your password
            </DialogContentText>
                <div className="anonymous-dialog_form">
                    <TextField
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </div>
                <div className="anonymous-dialog__bottom-text">
                    <DialogContentText>
                        Don't have an account? <button className="anonymous-dialog__bottom-button" onClick={() => onSetModalView(ModalView.SignUp)}>Sign Up</button>{' / '}
                        <button className="anonymous-dialog__bottom-button" onClick={() => onSetModalView(ModalView.SignIn)}>Sign In</button>
                    </DialogContentText>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="default">
                    Cancel
                </Button>
                <Button onClick={onClose} color="primary">
                    Recover Password
                </Button>
            </DialogActions>
        </React.Fragment>
    )
}

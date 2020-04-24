import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';
import { ModalView } from './AnonymousDialog';

export type SignInBodyProps = {
    onSetModalView: (modalView: ModalView) => void;
    onClose: VoidFunction;
}

export const SignInBody: React.FC<SignInBodyProps> = ({ onSetModalView, onClose }) => {
    return (
        <React.Fragment>
            <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Sign in to continue
            </DialogContentText>
                <div className="anonymous-dialog_form">
                    <TextField
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                    />
                </div>
                <div className="anonymous-dialog__bottom-text">
                    <DialogContentText>
                        Don't have an account? <button className="anonymous-dialog__bottom-button" onClick={() => onSetModalView(ModalView.SignUp)}>Sign Up</button>{' / '}
                        <button className="anonymous-dialog__bottom-button" onClick={() => onSetModalView(ModalView.ForgotPassword)}>Password Recovery</button>
                    </DialogContentText>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="default">
                    Cancel
                </Button>
                <Button onClick={onClose} color="primary">
                    Sign In
                </Button>
            </DialogActions>
        </React.Fragment>
    )
}

import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';
import { ModalView } from './AnonymousDialog';

export type SignUpBodyProps = {
    onSetModalView: (modalView: ModalView) => void;
    onClose: VoidFunction;
}

export const SignUpBody: React.FC<SignUpBodyProps> = ({ onSetModalView, onClose }) => {
    return (
        <React.Fragment>
            <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Register a new account
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
                    <TextField
                        margin="dense"
                        id="password-repeat"
                        label="Repeat Password"
                        type="password"
                        fullWidth
                    />
                </div>
                <div className="anonymous-dialog__bottom-text">
                    <DialogContentText>
                        Have an account? <button className="anonymous-dialog__bottom-button" onClick={() => onSetModalView(ModalView.SignIn)}>Sign In</button>
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

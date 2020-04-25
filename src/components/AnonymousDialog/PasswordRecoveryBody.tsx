import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import { ModalView } from './AnonymousDialog';

export type PasswordRecoveryBodyProps = {
    onSetModalView: (modalView: ModalView) => void;
    onClose: VoidFunction;
}

export const PasswordRecoveryBody: React.FC<PasswordRecoveryBodyProps> = ({ onSetModalView, onClose }) => {
    return (
        <React.Fragment>
            <DialogTitle>Forgot Password</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Password recovery email has been sent to your email address.
                </DialogContentText>
                <div className="anonymous-dialog__bottom-text">
                    <DialogContentText>
                        <button
                            className="anonymous-dialog__bottom-button"
                            onClick={() => onSetModalView(ModalView.ForgotPassword)}
                        >
                            Sign Up
                            </button>
                        {' / '}
                        <button
                            className="anonymous-dialog__bottom-button"
                            onClick={() => onSetModalView(ModalView.ForgotPassword)}
                        >
                            Sign In
                            </button>
                    </DialogContentText>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="default">
                    Close
                </Button>
            </DialogActions>
        </React.Fragment>
    )
}

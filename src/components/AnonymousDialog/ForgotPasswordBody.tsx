import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { auth } from '../../utils/firebase';
import { ModalView } from './AnonymousDialog';
import { LoadingIndicator } from './LoadingIndicator';

export type ForgotPasswordBodyProps = {
    onSetModalView: (modalView: ModalView) => void;
    onClose: VoidFunction;
};

export const ForgotPasswordBody: React.FC<ForgotPasswordBodyProps> = ({
    onSetModalView,
    onClose,
}) => {
    let mounted = true;
    const [showLoadingIndicator, setShowLoadingIndicator] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.currentTarget;
        if (!mounted) {
            return;
        }
        setEmailError('');
        setEmail(value);
    };

    const handleRecoverPassword = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setShowLoadingIndicator(true);
        auth.sendPasswordResetEmail(email)
            .then(() => {
                setShowLoadingIndicator(false);
                onSetModalView(ModalView.PasswordRecovery);
            })
            .catch((error: any) => {
                setShowLoadingIndicator(false);
                if (error && mounted) {
                    setEmailError(error.message);
                }
                console.error(error);
            });
    };

    const handleClose = () => {
        mounted = false;
        onClose();
    };

    return (
        <React.Fragment>
            <DialogTitle>Password Recovery</DialogTitle>
            <DialogContent>
                {showLoadingIndicator && <LoadingIndicator />}
                <DialogContentText>
                    Enter an email adress to recover your password
                </DialogContentText>
                <div className="anonymous-dialog__form">
                    <form onSubmit={handleRecoverPassword}>
                        <TextField
                            value={email}
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            error={emailError !== ''}
                            helperText={emailError !== '' && emailError}
                            onChange={onChangeHandler}
                        />
                        <Button
                            classes={{ root: 'anonymous-dialog__submit' }}
                            type="submit"
                            color="primary"
                            disabled={email === '' || emailError !== ''}
                            variant="contained"
                        >
                            Recover Password
                        </Button>
                    </form>
                </div>
                <div className="anonymous-dialog__bottom-text">
                    <DialogContentText>
                        Don't have an account?{' '}
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
                <Button onClick={handleClose} color="default">
                    Cancel
                </Button>
            </DialogActions>
        </React.Fragment>
    );
};

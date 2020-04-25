import { Dialog } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ForgotPasswordBody } from './ForgotPasswordBody';
import { PasswordRecoveryBody } from './PasswordRecoveryBody';
import { SignInBody } from './SignInBody';
import { SignUpBody } from './SignUpBody';

export enum ModalView {
    SignIn = 'SignIn',
    SignUp = 'SignUp',
    ForgotPassword = 'ForgotPassword',
    PasswordRecovery = 'PasswordRecovery',
}

export type AnonymousDialogProps = {
    isOpen: boolean;
    onClose: VoidFunction;
}

export const AnonymousDialog: React.FC<AnonymousDialogProps> = ({ isOpen, onClose }) => {
    const [modalView, setModalView] = useState<ModalView>(ModalView.SignIn);

    useEffect(() => {
        if (!isOpen) {
            setModalView(ModalView.SignIn)
        }
    }, [isOpen])

    const renderContent = () => {
        switch (modalView) {
            case ModalView.SignIn: {
                return (
                        <SignInBody
                        onClose={onClose}
                        onSetModalView={setModalView}
                        />
                )
            }
            case ModalView.SignUp: {
                return (
                        <SignUpBody
                        onClose={onClose}
                        onSetModalView={setModalView}
                        />
                )
            }
            case ModalView.ForgotPassword: {
                return (
                        <ForgotPasswordBody
                        onClose={onClose}
                        onSetModalView={setModalView}
                        />
                )
            }
            case ModalView.PasswordRecovery: {
                return (
                    <PasswordRecoveryBody
                        onClose={onClose}
                    onSetModalView={setModalView}
                    />
                )
            }
        }
    }
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={isOpen}
            onClose={onClose}
            classes={{ paper: 'anonymous-dialog__wrapper' }}
        >
            {renderContent()}
        </Dialog>
    )
}

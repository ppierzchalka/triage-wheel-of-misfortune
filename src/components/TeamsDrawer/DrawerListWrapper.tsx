import { Button, Container, Dialog } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useState } from 'react';

export type DrawerListWrapperProps = {
    addButtonLabel: string;
    renderDialogContent: (closeDialog: VoidFunction) => React.ReactNode;
    onClearData?: VoidFunction;
};

export const DrawerListWrapper: React.FC<DrawerListWrapperProps> = ({
    addButtonLabel,
    renderDialogContent,
    children,
    onClearData,
}) => {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

    const handleClose = () => {
        setIsFormOpen(false);
        if (onClearData) {
            onClearData();
        }
    };

    return (
        <Container classes={{ root: 'drawer-list__container' }}>
            {children}
            <Container classes={{ root: 'drawer-tab__footer' }}>
                <Button
                    onClick={() => setIsFormOpen(true)}
                    classes={{ root: 'drawer-tab__footer-button' }}
                    startIcon={<Add />}
                    variant="contained"
                    color="primary"
                    disabled={isFormOpen}
                >
                    {addButtonLabel}
                </Button>
                <Dialog
                    open={isFormOpen}
                    onClose={handleClose}
                    classes={{ paper: 'drawer-tab__dialog' }}
                >
                    {renderDialogContent(handleClose)}
                </Dialog>
            </Container>
        </Container>
    );
};

import { Button, Container, Dialog } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useState } from 'react';

export type DrawerListWrapperProps = {
    addButtonLabel: string;
    onRenderAddDialogContent: (closeDialog: VoidFunction) => React.ReactNode;
    onClearData?: VoidFunction;
};

export const DrawerListWrapper: React.FC<DrawerListWrapperProps> = ({
    addButtonLabel,
    onRenderAddDialogContent,
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
        <div className={'drawer-list__container'}>
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
                    {onRenderAddDialogContent(handleClose)}
                </Dialog>
            </Container>
        </div>
    );
};

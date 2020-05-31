import {
    Checkbox,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';

export type DrawerListItemProps = {
    selected: boolean;
    label: string;
    onPrimaryAction: (checked: boolean) => void;
    onDeleteAction: VoidFunction;
};

export const DrawerMembersListItem: React.FC<DrawerListItemProps> = ({
    onPrimaryAction,
    selected,
    label,
    onDeleteAction,
}) => {
    return (
        <ListItem button onClick={() => onPrimaryAction(!selected)}>
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    color="primary"
                    checked={selected}
                    tabIndex={-1}
                    disableRipple
                />
            </ListItemIcon>
            <ListItemText classes={{ root: 'member-list__label' }} primary={label} />
            <ListItemSecondaryAction>
                <IconButton edge="end" onClick={onDeleteAction}>
                    <Delete color="action" />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

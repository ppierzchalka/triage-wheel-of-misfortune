import {
    Checkbox,
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from '@material-ui/core';
import { Delete, ExpandLess, ExpandMore, Person } from '@material-ui/icons';
import React, { useState } from 'react';

export type DrawerTeamsListItemProps = {
    members: string[];
    label: string;
    selected: boolean;
    onPrimaryAction: (checked: boolean) => void;
    onDeleteAction: VoidFunction;
};

export const DrawerTeamsListItem: React.FC<DrawerTeamsListItemProps> = ({
    members,
    label,
    selected,
    onPrimaryAction,
    onDeleteAction,
}) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleToggleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setOpen(!open);
    };

    return (
        <React.Fragment>
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
                <ListItemText
                    classes={{ root: 'member-list__label' }}
                    primary={label}
                    secondary={Object.values(members).length === 0 && 'No members'}
                />
                {Object.values(members).length > 0 && (
                    <IconButton edge="end" onClick={(e) => handleToggleOpen(e)}>
                        {open ? <ExpandLess color="action" /> : <ExpandMore color="action" />}
                    </IconButton>
                )}
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={onDeleteAction}>
                        <Delete color="action" />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            {Object.values(members).length > 0 && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding dense>
                        {Object.values(members).map((member, memberIndex) => (
                            <ListItem key={memberIndex} button>
                                <ListItemIcon>
                                    <Person />
                                </ListItemIcon>
                                <ListItemText primary={member} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            )}
        </React.Fragment>
    );
};

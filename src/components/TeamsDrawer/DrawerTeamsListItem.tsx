import {
    Checkbox,
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
} from '@material-ui/core';
import {
    Delete,
    ExpandLess,
    ExpandMore,
    GroupAdd,
    MoreVert,
    Person,
    Warning,
} from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTeamFromDB, Team } from '../../actions/teams';
import { RootStateType } from '../../reducers';

export type DrawerTeamsListItemProps = {
    team: Team;
    selected: boolean;
    onPrimaryAction: (checked: boolean) => void;
    onManageMembers: (teamId: string) => void;
};

export const DrawerTeamsListItem: React.FC<DrawerTeamsListItemProps> = ({
    team,
    selected,
    onManageMembers,
    onPrimaryAction,
}) => {
    const [isListOpen, setIsListOpen] = useState<boolean>(false);
    const [isRemovalClicked, setIsRemovalClicked] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { authUser, members } = useSelector((state: RootStateType) => state);
    const dispatch = useDispatch();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setIsRemovalClicked(false);
        setAnchorEl(null);
    };

    const handleRemoveTeam = () => {
        if (authUser) {
            handleClose();
            dispatch(removeTeamFromDB(authUser, team.id));
        }
    };

    const handleToggleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setIsListOpen(!isListOpen);
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
                    primary={team.teamName}
                    secondary={Object.values(team.members).length === 0 && 'No members'}
                />
                {Object.values(team.members).length > 0 && (
                    <IconButton
                        edge="end"
                        onClick={handleToggleOpen}
                        classes={{ root: 'team-list__chevron-button' }}
                    >
                        {isListOpen ? <ExpandLess color="action" /> : <ExpandMore color="action" />}
                    </IconButton>
                )}
                <ListItemSecondaryAction>
                    <IconButton onClick={handleClick}>
                        <MoreVert />
                    </IconButton>
                    <Menu anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={handleClose}>
                        <MenuItem
                            onClick={() => {
                                onManageMembers(team.id);
                                handleClose();
                            }}
                        >
                            <ListItemIcon>
                                <GroupAdd fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="inherit">Manage members</Typography>
                        </MenuItem>
                        <MenuItem
                            onClick={
                                isRemovalClicked
                                    ? handleRemoveTeam
                                    : () => setIsRemovalClicked(true)
                            }
                        >
                            <ListItemIcon>
                                {isRemovalClicked ? (
                                    <Warning fontSize="small" />
                                ) : (
                                    <Delete fontSize="small" />
                                )}
                            </ListItemIcon>
                            <Typography variant="inherit">
                                {isRemovalClicked ? 'Are you sure?' : 'Delete Team'}
                            </Typography>
                        </MenuItem>
                    </Menu>
                </ListItemSecondaryAction>
            </ListItem>
            {Object.values(team.members).length > 0 && (
                <Collapse in={isListOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding dense>
                        {Object.values(team.members).map((memberId) => {
                            const memberLabel = `${members[memberId].firstName} ${members[memberId].lastName}`;
                            return (
                                <ListItem key={memberId} button disableRipple>
                                    <ListItemIcon>
                                        <Person />
                                    </ListItemIcon>
                                    <ListItemText primary={memberLabel} />
                                </ListItem>
                            );
                        })}
                    </List>
                </Collapse>
            )}
        </React.Fragment>
    );
};

import {
    Button,
    Card,
    CardHeader,
    Checkbox,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { manageTeamMembersInDB } from '../../actions/teams';
import { RootStateType } from '../../reducers';
import { intersection, not, union } from './utils';

export type MembersTransferListProps = {
    activeTeam: string;
    onClose: VoidFunction;
};

export const MembersTransferList: React.FC<MembersTransferListProps> = ({
    activeTeam,
    onClose,
}) => {
    const { teams, authUser, members } = useSelector((state: RootStateType) => state);
    const [checked, setChecked] = React.useState<string[]>([]);

    const activeTeamMembers = useMemo(() => teams[activeTeam].members, [activeTeam, teams]);
    const allMembers = useMemo(() => Object.keys(members), [members]);
    const availableMembers = useMemo(
        () => allMembers.filter((member) => !activeTeamMembers.includes(member)),
        [allMembers, activeTeamMembers]
    );

    const dispatch = useDispatch();

    const availableMembersChecked = intersection(checked, availableMembers);
    const activeTeamMembersChecked = intersection(checked, activeTeamMembers);

    const handleToggle = (value: string) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const numberOfChecked = (items: string[]) => intersection(checked, items).length;

    const handleToggleAll = (items: string[]) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleAddMembers = () => {
        const newMembers = [...activeTeamMembers, ...availableMembersChecked];
        if (authUser) {
            dispatch(manageTeamMembersInDB(authUser, activeTeam, newMembers));
        }
        setChecked([]);
    };

    const handleRemoveMembers = () => {
        const newMembers = activeTeamMembers.filter(
            (member) => !activeTeamMembersChecked.includes(member)
        );
        if (authUser) {
            dispatch(manageTeamMembersInDB(authUser, activeTeam, newMembers));
        }
        setChecked([]);
    };

    const customList = (title: React.ReactNode, items: string[]) => (
        <Card>
            <CardHeader
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        color="primary"
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={
                            numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{ 'aria-label': 'all items selected' }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            <List dense component="div" role="list" classes={{ root: 'members-management__list' }}>
                {items.map((memberId: string) => {
                    const memberLabel = `${members[memberId].firstName} ${members[memberId].lastName}`;
                    return (
                        <ListItem
                            key={memberId}
                            role="listitem"
                            button
                            onClick={handleToggle(memberId)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(memberId) !== -1}
                                    color="primary"
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': memberId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={memberId} primary={memberLabel} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Card>
    );

    return (
        <React.Fragment>
            <DialogTitle>Manage team members</DialogTitle>
            <DialogContent>
                <Grid
                    container
                    spacing={2}
                    justify="center"
                    alignItems="center"
                    classes={{ root: 'members-management__body' }}
                >
                    <Grid item>{customList('Available members', availableMembers)}</Grid>
                    <Grid item>
                        <Grid container direction="column" alignItems="center">
                            <IconButton
                                edge="end"
                                size="small"
                                onClick={handleAddMembers}
                                disabled={availableMembersChecked.length === 0}
                            >
                                <ChevronRight />
                            </IconButton>
                            <IconButton
                                edge="end"
                                size="small"
                                onClick={handleRemoveMembers}
                                disabled={activeTeamMembersChecked.length === 0}
                            >
                                <ChevronLeft />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item>{customList('Team members', activeTeamMembers)}</Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </React.Fragment>
    );
};

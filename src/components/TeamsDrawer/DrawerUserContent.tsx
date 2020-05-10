import { Paper, Tab, Tabs } from '@material-ui/core';
import { Group, Person } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSelectionType, SelectionType } from '../../actions/selection';
import { RootStateType } from '../../reducers';
import { TabContent } from '../TabContent/TabContent';
import { DrawerMembersList } from './DrawerMembersList';
import { DrawerTeamsList } from './DrawerTeamsList';

export type DrawerUserContentProps = {
    closeButton: React.ReactElement;
};

export const DrawerUserContent: React.FC<DrawerUserContentProps> = ({ closeButton }) => {
    const selectionType = useSelector((state: RootStateType) => state.selection.selectionType);
    const dispatch = useDispatch();

    const handleChange = (_e: React.ChangeEvent<{}>, tabValue: SelectionType) => {
        dispatch(changeSelectionType(tabValue));
    };

    return (
        <div className={'drawer__bar-container'}>
            <Paper square classes={{ root: 'drawer__bar' }}>
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    value={selectionType}
                    onChange={handleChange}
                    classes={{ root: 'drawer__tabs' }}
                >
                    <Tab label={<Group />} value={SelectionType.Teams} />
                    <Tab label={<Person />} value={SelectionType.Members} />
                </Tabs>
                <div className={'drawer__close-button-wrapper'}>{closeButton}</div>
            </Paper>
            <TabContent<SelectionType> value={selectionType} index={SelectionType.Teams}>
                <DrawerTeamsList />
            </TabContent>
            <TabContent<SelectionType> value={selectionType} index={SelectionType.Members}>
                <DrawerMembersList />
            </TabContent>
        </div>
    );
};

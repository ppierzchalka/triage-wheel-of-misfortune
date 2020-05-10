import { Paper, Tab, Tabs } from '@material-ui/core';
import { Group, Person } from '@material-ui/icons';
import React, { useState } from 'react';
import { TabContent } from '../TabContent/TabContent';
import { DrawerMembersList } from './DrawerMembersList';
import { DrawerTeamsList } from './DrawerTeamsList';

export type DrawerUserContentProps = {
    closeButton: React.ReactElement;
};

export const DrawerUserContent: React.FC<DrawerUserContentProps> = ({ closeButton }) => {
    const [value, setValue] = useState<number>(0);

    const handleChange = (_e: React.ChangeEvent<{}>, tabValue: number) => {
        setValue(tabValue);
    };

    return (
        <div className={'drawer__bar-container'}>
            <Paper square classes={{ root: 'drawer__bar' }}>
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    value={value}
                    onChange={handleChange}
                    classes={{ root: 'drawer__tabs' }}
                >
                    <Tab label={<Group />} value={0} />
                    <Tab label={<Person />} value={1} />
                </Tabs>
                <div className={'drawer__close-button-wrapper'}>{closeButton}</div>
            </Paper>
            <TabContent value={value} index={0}>
                <DrawerTeamsList />
            </TabContent>
            <TabContent value={value} index={1}>
                <DrawerMembersList />
            </TabContent>
        </div>
    );
};

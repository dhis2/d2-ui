import React from 'react';
import { Tabs, Tab } from '@dhis2/d2-ui-core';

const style = {
    margin: 16,
};

export default function TabsExample (props) {
    return (
        <div style={style}>
            <Tabs>
                <Tab label='First'>
                    First tab
                </Tab>
                <Tab label='Second'>
                    Second tab
                </Tab>
                <Tab label='Third'>
                    Third tab
                </Tab>
            </Tabs>
        </div>
    );
}

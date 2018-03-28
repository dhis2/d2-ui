import React from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Tabs, Tab } from '../../src/tabs/Tabs';

import AppBar from 'material-ui-next/AppBar';

import { TabsTemp, TabTemp } from '../../src/tabs/TabsTemp';

injectTapEventPlugin();

const style = {
    margin: 16,
};

const TabComponent = () => (
    <div>
        <h3> Material-ui v.0 </h3>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div style={style}>
                <Tabs>
                    <Tab label="First"> First tab </Tab>
                    <Tab label="Second"> Second tab </Tab>
                    <Tab label="Third"> Third tab </Tab>
                </Tabs>
            </div>
        </MuiThemeProvider>
        <h3> Material-ui v.1 </h3>

        <div style={style}>
            <AppBar position={'static'}>
                <TabsTemp>
                    <TabTemp label={'First'}> First Tab </TabTemp>
                    <TabTemp label={'Second'}> Second Tab </TabTemp>
                    <TabTemp label={'Third'}> Third Tab </TabTemp>
                </TabsTemp>
            </AppBar>
        </div>
    </div>
);
render(<TabComponent />, document.getElementById('tabs'));

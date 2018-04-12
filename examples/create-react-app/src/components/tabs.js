import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'd2-ui-core';

const style = {
    margin: 16,
};

export default function TabsExample (props) {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
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
        </MuiThemeProvider>
    );
}

import React from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Tabs, Tab } from '../../src/tabs/Tabs';
// import { Tabs } from '../../src/tabs/Tabs';
// import { Tab } from 'material-ui/Tabs';

injectTapEventPlugin();

const style = {
    margin: 16,
};

const textFields = (
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

render(textFields, document.getElementById('tabs'));

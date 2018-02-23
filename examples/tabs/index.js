import React, { Component } from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Tabs, Tab } from '../../src/tabs/Tabs';

import TabsTemp from '../../src/tabs/TabsTemp';
injectTapEventPlugin();

const style = {
    margin: 16,
};

class TabComponent extends Component {

    render = () => {
        return (
            <div>
                <h3> Material-ui v.0 </h3>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div style={style}>
                        <Tabs>
                            <Tab label='First'> First tab </Tab>
                            <Tab label='Second'> Second tab </Tab>
                            <Tab label='Third'> Third tab </Tab>
                        </Tabs>  
                    </div>
                </MuiThemeProvider>
                <h3> Material-ui v.0 </h3>
                <div>
                    <TabsTemp/>
                </div>
            </div>
        );
    }
}
render(<TabComponent/>, document.getElementById('tabs'));

import React, { Component } from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Button from '../../src/button/Button';
import SvgIcon from '../../src/svg-icon/SvgIcon';

import Add from 'material-ui-icons/Add';
import Icon from 'material-ui-next/Icon';
import ButtonTemp from '../../src/button/ButtonTemp';

injectTapEventPlugin();

const style = {
    margin: 16,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
};

class Buttons extends Component {
    state = {};

    render = () => (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
                <h3> Material-ui v.0 </h3>
                <div style={style}>
                    <Button onClick={() => {}}>Default</Button>
                    <Button disabled onClick={() => {}}>Disabled</Button>
                    <Button raised onClick={() => {}}>Raised</Button>
                    <Button raised color="primary" onClick={() => {}}>Primary</Button>
                    <Button raised color="accent" onClick={() => {}}>Accent</Button>
                    <Button raised disabled onClick={() => {}}>Disabled</Button>
                    <Button fab onClick={() => {}}><SvgIcon icon="Add" /></Button>
                    <Button fab color="accent" onClick={() => {}}><SvgIcon icon="Add" /></Button>

                </div>

                <h3> Material-ui v.1 </h3>
                <div style={style}>
                    <ButtonTemp> {'Default'} </ButtonTemp>
                    <ButtonTemp disabled> {'Disabled'} </ButtonTemp>
                    <ButtonTemp variant="raised"> {'Raised'} </ButtonTemp>
                    <ButtonTemp variant="raised" color="primary"> {'Primary'} </ButtonTemp>
                    <ButtonTemp variant="raised" color="secondary"> {'Accent'} </ButtonTemp>
                    <ButtonTemp disabled variant="raised" color="inherit"> {'Disabled'} </ButtonTemp>

                    <ButtonTemp variant="fab"> <Icon>{'add_icon'}</Icon> </ButtonTemp>

                    <ButtonTemp variant="fab"> <Add /> </ButtonTemp>
                </div>
            </div>
        </MuiThemeProvider>
    )
}

render(<Buttons />, document.getElementById('buttons'));


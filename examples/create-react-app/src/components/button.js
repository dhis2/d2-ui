import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Button} from '@dhis2/d2-ui-core';
import {SvgIcon} from '@dhis2/d2-ui-core';

const style = {
    margin: 16,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
};

export default function Buttons() {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div style={style}>
                <Button onClick={() => {}}>Default</Button>
                <Button disabled onClick={() => {}}>Disabled</Button>
                <Button raised onClick={() => {}}>Raised</Button>
                <Button raised color='primary' onClick={() => {}}>Primary</Button>
                <Button raised color='accent' onClick={() => {}}>Accent</Button>
                <Button raised disabled onClick={() => {}}>Disabled</Button>
                <Button fab onClick={() => {}}><SvgIcon icon='Add' /></Button>
                <Button fab color='accent' onClick={() => {}}><SvgIcon icon='Add' /></Button>
            </div>
        </MuiThemeProvider>
    );
}

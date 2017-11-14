import React from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SvgIcon from '../../src/svg-icon/SvgIcon';

const style = {
    margin: 16,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
};

const styles = {
    fill: 'blue',
};

const children = <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />;

const icons = (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={style}>
            <SvgIcon icon={'star'} />
            <SvgIcon icon={'star'} style={styles} />
            <SvgIcon icon={'star'} color="blue" hoverColor="yellow" />
            <SvgIcon />
            <SvgIcon>
                {children}
            </SvgIcon>
        </div>
    </MuiThemeProvider>
);

render(icons, document.getElementById('svgicon'));

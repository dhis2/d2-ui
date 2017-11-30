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

const cardStyle = {
    backgroundColor: '#fff',
    padding: 16,
    display: 'inline-block',
    borderRadius: 2,
    margin: 16,
    width: 200,
};

const children = <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />;

const icons = (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={style}>
            <div style={cardStyle}>
                <h3>Icon with no icon prop defined</h3>
                <SvgIcon />
            </div>
            <div style={cardStyle}>
                <h3>Icon not found</h3>
                <SvgIcon icon={'doesntExist'} />
            </div>
            <div style={cardStyle}>
                <h3>Icon with custom defined path</h3>
                <SvgIcon>{children}</SvgIcon>
            </div>
            <div style={cardStyle}>
                <h3>star</h3>
                <SvgIcon icon={'star'} />
            </div>
            <div style={cardStyle}>
                <h3>arrowDropRight</h3>
                <SvgIcon icon={'arrowDropRight'} />
            </div>
            <div style={cardStyle}>
                <h3>close</h3>
                <SvgIcon icon={'close'} />
            </div>
            <div style={cardStyle}>
                <h3>arrowUpward</h3>
                <SvgIcon icon={'arrowUpward'} />
            </div>
            <div style={cardStyle}>
                <h3>arrowDownward</h3>
                <SvgIcon icon={'arrowDownward'} />
            </div>
            <div style={cardStyle}>
                <h3>chevronLeft</h3>
                <SvgIcon icon={'chevronLeft'} />
            </div>
            <div style={cardStyle}>
                <h3>chevronRight</h3>
                <SvgIcon icon={'chevronRight'} />
            </div>
            <div style={cardStyle}>
                <h3>moreVert</h3>
                <SvgIcon icon={'moreVert'} />
            </div>
            <div style={cardStyle}>
                <h3>cancel</h3>
                <SvgIcon icon={'cancel'} />
            </div>
            <div style={cardStyle}>
                <h3>infoOutline</h3>
                <SvgIcon icon={'infoOutline'} />
            </div>
            <div style={cardStyle}>
                <h3>room</h3>
                <SvgIcon icon={'room'} />
            </div>
            <div style={cardStyle}>
                <h3>viewList</h3>
                <SvgIcon icon={'viewList'} />
            </div>
            <div style={cardStyle}>
                <h3>delete</h3>
                <SvgIcon icon={'delete'} />
            </div>
            <div style={cardStyle}>
                <h3>visibility</h3>
                <SvgIcon icon={'visibility'} />
            </div>
            <div style={cardStyle}>
                <h3>visibilityOff</h3>
                <SvgIcon icon={'visibilityOff'} />
            </div>
            <div style={cardStyle}>
                <h3>create</h3>
                <SvgIcon icon={'create'} />
            </div>
            <div style={cardStyle}>
                <h3>dragHandle</h3>
                <SvgIcon icon={'dragHandle'} />
            </div>
        </div>
    </MuiThemeProvider>
);

render(icons, document.getElementById('svgicon'));

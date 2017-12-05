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
                <h3>Icon with no icon or children properties defined</h3>
                <SvgIcon />
            </div>
            <div style={cardStyle}>
                <h3>Icon not found</h3>
                <SvgIcon icon={'DoesntExist'} />
            </div>
            <div style={cardStyle}>
                <h3>Icon with custom defined path</h3>
                <SvgIcon>{children}</SvgIcon>
            </div>
            <div style={cardStyle}>
                <h3>Disabled icon</h3>
                <SvgIcon icon={'Star'} disabled />
            </div>
            <div style={cardStyle}>
                <h3>Icon color</h3>
                <SvgIcon icon={'Star'} style={{ fill: 'red' }} />
            </div>
            <div style={cardStyle}>
                <h3>Star, also with className prop</h3>
                <SvgIcon icon={'Star'} className="my-starry-icon" />
            </div>
            <div style={cardStyle}>
                <h3>ArrowDropRight</h3>
                <SvgIcon icon={'ArrowDropRight'} />
            </div>
            <div style={cardStyle}>
                <h3>Close</h3>
                <SvgIcon icon={'Close'} />
            </div>
            <div style={cardStyle}>
                <h3>ArrowUpward</h3>
                <SvgIcon icon={'ArrowUpward'} />
            </div>
            <div style={cardStyle}>
                <h3>ArrowDownward</h3>
                <SvgIcon icon={'ArrowDownward'} />
            </div>
            <div style={cardStyle}>
                <h3>ChevronLeft</h3>
                <SvgIcon icon={'ChevronLeft'} />
            </div>
            <div style={cardStyle}>
                <h3>ChevronRight</h3>
                <SvgIcon icon={'ChevronRight'} />
            </div>
            <div style={cardStyle}>
                <h3>MoreVert</h3>
                <SvgIcon icon={'MoreVert'} />
            </div>
            <div style={cardStyle}>
                <h3>Cancel</h3>
                <SvgIcon icon={'Cancel'} />
            </div>
            <div style={cardStyle}>
                <h3>InfoOutline</h3>
                <SvgIcon icon={'InfoOutline'} />
            </div>
            <div style={cardStyle}>
                <h3>Room</h3>
                <SvgIcon icon={'Room'} />
            </div>
            <div style={cardStyle}>
                <h3>ViewList</h3>
                <SvgIcon icon={'ViewList'} />
            </div>
            <div style={cardStyle}>
                <h3>Delete</h3>
                <SvgIcon icon={'Delete'} />
            </div>
            <div style={cardStyle}>
                <h3>Visibility</h3>
                <SvgIcon icon={'Visibility'} />
            </div>
            <div style={cardStyle}>
                <h3>VisibilityOff</h3>
                <SvgIcon icon={'VisibilityOff'} />
            </div>
            <div style={cardStyle}>
                <h3>Create</h3>
                <SvgIcon icon={'Create'} />
            </div>
            <div style={cardStyle}>
                <h3>DragHandle</h3>
                <SvgIcon icon={'DragHandle'} />
            </div>
        </div>
    </MuiThemeProvider>
);

render(icons, document.getElementById('svgicon'));

import React from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Paper from 'material-ui/Paper';
import Popover from '../../src/popover/Popover';
import Button from '../../src/button/Button';
import MuiMenu from 'material-ui/Menu';
import MuiDivider from 'material-ui/Divider';
import MuiMenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

injectTapEventPlugin();

const test = `
    <html>
        <head>
            <script src="//code.jquery.com/jquery-2.2.4.min.js"></script>
            <script src="//dhis2-cdn.org/v228/plugin/reporttable.js"></script>
        </head>

        <body>
            <div id="reportTable1"></div>

            <script>

                reportTablePlugin.url = "<url to server>";
                reportTablePlugin.username = "<username>";
                reportTablePlugin.password = "<password>";

                reportTablePlugin.load([{
                    "id": "W5XngfmkRnr",
                    "url": "https://play.dhis2.org/demo",
                    "el": "reportTable1"
                }]);

            </script>

        </body>
    </html>
`;

const popoverContent = `
    This is some sample popover content.
`

const style = {
    container: {
        margin: 16,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    }
};

const popovers = (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={style.container}>
            <Popover 
                header='Embed in Webpage'
                button={(<Button label="Embed Popover" />)}>
                <textarea 
                    style={{
                        resize: "none",
                        width: "400px",
                        height: "360px",
                        border: "none",
                    }}
                    value={test}
                    disabled
                />
            </Popover>

            <Popover
                button={(<Button label="Standard Popover" />)}>
                { popoverContent }
            </Popover>


            <Popover button={(<Button label="Menu Popover" />)}>
                <MuiMenu>
                    <MuiMenuItem primaryText="New" />
                    <MuiDivider />
                    <MuiMenuItem primaryText="Open" rightIcon={<ArrowDropRight />} menuItems={[
                        <MuiMenuItem primaryText="Show Level 2" />,
                        <MuiMenuItem primaryText="Grid lines" checked={true} />,
                        <MuiMenuItem primaryText="Page breaks" insetChildren={true} />,
                        <MuiMenuItem primaryText="Rules" checked={true} />, ]}
                    />
                    <MuiDivider />
                    <MuiMenuItem primaryText="Save" />
                    <MuiMenuItem primaryText="Save As" />
                    <MuiDivider />
                    <MuiMenuItem primaryText="Rename" />
                    <MuiMenuItem primaryText="Translate" />
                    <MuiDivider />
                    <MuiMenuItem primaryText="Share" />
                    <MuiMenuItem primaryText="Write interpretation" />
                    <MuiMenuItem primaryText="Get link" />
                    <MuiDivider />
                    <MuiMenuItem primaryText="Delete" />
                </MuiMenu>
            </Popover>
        </div>
    </MuiThemeProvider>
);

render(popovers, document.getElementById('popover'));

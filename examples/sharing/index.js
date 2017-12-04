import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import log from 'loglevel';
import D2Lib from 'd2/lib/d2';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import SharingDialog from '../../src/sharing/SharingDialog.component';

injectTapEventPlugin();

class SharingExample extends React.Component {
    state = {
        dialogOpen: false,
    }

    getChildContext = () => ({
        d2: {
            i18n: {
                getTranslation(key) {
                    return key;
                },
            },
        },
    });

    handleOpen = () => { this.setState({ dialogOpen: true }); };
    handleClose = () => { this.setState({ dialogOpen: false }); };

    render = () => (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div style={{ padding: 32 }}>
                <RaisedButton label="Open" onClick={this.handleOpen} />
                <SharingDialog
                    open={this.state.dialogOpen}
                    type={this.props.type}
                    id={this.props.id}
                    onRequestClose={this.handleClose}
                />
            </div>
        </MuiThemeProvider>
    );
}

SharingExample.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

SharingExample.childContextTypes = {
    d2: PropTypes.object,
};

const element = document.getElementById('sharing');
const dhisDevConfig = DHIS_CONFIG;
const baseUrl = `${dhisDevConfig.baseUrl}/api`;

render(<div>Sharing dialog is loading.</div>, element);

D2Lib.config.baseUrl = baseUrl;
D2Lib.init({ baseUrl })
    .then((d2) => {
        log.info('D2 initialized successfully', d2);
        window.d2 = d2;

        const objectType = 'category';
        const objectId = 'veGzholzPQm';

        render(<SharingExample type={objectType} id={objectId} />, element);
    })
    .catch((err) => {
        log.error('Failed to initialise D2:', err);
        render(<div>Failed to initialise D2: {err}</div>, element);
    });

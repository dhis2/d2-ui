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
        open: false,
        id: '',
        type: '',
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

    handleOpen = (type, id) => () => {
        this.setState({
            open: true, id, type,
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    render = () => (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div style={{ padding: 32 }}>
                <SharingDialog
                    open={this.state.open}
                    id={this.state.id}
                    type={this.state.type}
                    onRequestClose={this.handleClose}
                />
                { this.props.examples.map(({ type, id }) => (
                    <div key={type + id} style={{ padding: 16 }}>
                        <RaisedButton key={type} label={`${type}/${id}`} onClick={this.handleOpen(type, id)} />
                    </div>
                ))}
            </div>
        </MuiThemeProvider>
    );
}

SharingExample.propTypes = {
    examples: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    })).isRequired,
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

        const examples = [
            { type: 'category', id: 'veGzholzPQm' },
            { type: 'categoryOption', id: 'FbLZS3ueWbQ' },
            { type: 'categoryOption', id: 'K4gwuiVvW3z' },
        ];

        render(<SharingExample examples={examples} />, element);
    })
    .catch((err) => {
        log.error('Failed to initialise D2:', err);
        render(<div>Failed to initialise D2: {err}</div>, element);
    });

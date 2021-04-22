import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import cloneDeep from 'lodash/cloneDeep';
import { mui3theme } from '@dhis2/d2-ui-core';

import Favorites from './Favorites';
import configureStore from './configureStore';
import { setFavoriteType, setD2 } from './actions';

const store = configureStore();

class FavoritesDialog extends Component {
    constructor(props) {
        super(props);

        // sync type prop with state
        if (props.type) {
            store.dispatch(setFavoriteType(props.type));
        }

        if (props.d2) {
            store.dispatch(setD2(props.d2));
        } else {
            console.error('no d2');
        }
    }

    getChildContext() {
        return {
            d2: this.props.d2,
        };
    }

    getContent() {
        const {
            open,
            type,
            onFavoriteSelect,
            onRequestClose,
            refreshData,
        } = this.props;

        return (
            <Provider store={store}>
                <Favorites
                    open={open}
                    type={type}
                    refreshData={refreshData}
                    onFavoriteSelect={onFavoriteSelect}
                    onRequestClose={onRequestClose}
                />
            </Provider>
        );
    }

    render() {
        if (this.props.insertTheme) {
            const theme = cloneDeep(mui3theme);

            // override the MuiDialog style to make it wider
            theme.overrides.MuiDialog.paperWidthLg = {
                flex: '0 1 960px',
                width: '960px',
                maxWidth: '960px',
            };

            return (
                <MuiThemeProvider theme={createMuiTheme(theme)}>
                    {this.getContent()}
                </MuiThemeProvider>
            );
        }

        return this.getContent();
    }
}

FavoritesDialog.defaultProps = {
    refreshData: false,
    insertTheme: false,
};

FavoritesDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    insertTheme: PropTypes.bool,
    refreshData: PropTypes.bool,
    type: PropTypes.oneOf([
        'visualization',
        'chart',
        'eventChart',
        'reportTable',
        'eventReport',
        'map',
    ]).isRequired,
    d2: PropTypes.object.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onFavoriteSelect: PropTypes.func.isRequired,
};

FavoritesDialog.childContextTypes = {
    d2: PropTypes.object.isRequired,
};

export default FavoritesDialog;

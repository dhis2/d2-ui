import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

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

    render() {
        const { open, type, onFavoriteSelect, onRequestClose, refreshData, dialogMaxWidth } = this.props;

        return (
            <Provider store={store}>
                <Favorites
                    open={open}
                    type={type}
                    refreshData={refreshData}
                    onFavoriteSelect={onFavoriteSelect}
                    onRequestClose={onRequestClose}
                    dialogMaxWidth={dialogMaxWidth}
                />
            </Provider>
        );
    }
}

FavoritesDialog.defaultProps = {
    dialogMaxWidth: 'md',
    refreshData: false,
};

FavoritesDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    refreshData: PropTypes.bool,
    type: PropTypes.oneOf(['chart', 'eventChart', 'reportTable', 'eventReport', 'map']).isRequired,
    d2: PropTypes.object.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onFavoriteSelect: PropTypes.func.isRequired,
    dialogMaxWidth: PropTypes.string,
};

FavoritesDialog.childContextTypes = {
    d2: PropTypes.object.isRequired,
};

export default FavoritesDialog;

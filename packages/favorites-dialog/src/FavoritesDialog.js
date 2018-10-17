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
        const {
            open,
            refreshData,
            type,
            onFavoriteSelect,
            onFavoriteRename,
            onFavoriteDelete,
            onRequestClose,
        } = this.props;

        return (
            <Provider store={store}>
                <Favorites
                    open={open}
                    refreshData={refreshData}
                    type={type}
                    onFavoriteSelect={onFavoriteSelect}
                    onFavoriteRename={onFavoriteRename}
                    onFavoriteDelete={onFavoriteDelete}
                    onRequestClose={onRequestClose}
                />
            </Provider>
        );
    }
}

FavoritesDialog.childContextTypes = {
    d2: PropTypes.object.isRequired,
};

export default FavoritesDialog;

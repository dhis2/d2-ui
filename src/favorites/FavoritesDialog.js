import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Favorites from './Favorites';

import configureStore from './configureStore';
import { setFavoriteType } from './actions';

const store = configureStore();

class FavoritesDialog extends Component {
    constructor(props) {
        super(props);

        // sync type prop with state
        if (props.type) {
            store.dispatch(setFavoriteType(props.type));
        }
    }

    render() {
        const { open, type, onFavoriteSelect, onRequestClose } = this.props;

        return (
            <Provider store={store}>
                <Favorites
                    open={open}
                    type={type}
                    onFavoriteSelect={onFavoriteSelect}
                    onRequestClose={onRequestClose}
                />
            </Provider>
        );
    }
}

export default FavoritesDialog;

import React, { Component } from 'react';
import { createStore } from "redux";
import { Provider } from 'react-redux';
import Periods from './Periods';
import reducers from './reducers';

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class PeriodSelector extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <Periods/>
            </Provider>
        );
    }
}

export default PeriodSelector;

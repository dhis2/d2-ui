import React, { Component } from 'react';
import { createStore } from "redux";
import { Provider } from 'react-redux';
import Periods from './Periods';
import reducers from './reducers';

const store = createStore(reducers);

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

import React, {  Component, PropTypes } from 'react';
import Store from '../store/Store';
import TextField from 'material-ui/lib/text-field';
import { Observable } from 'rx';

const legendItemStore = Store.create();

export function openEditDialogFor(model) {
    legendItemStore.setState({
        model,
        open: true,
    });
}

const formFieldsConfigs = [{
    name: 'name',
    component: TextField,
    props: {
        floatingLabelText: 'Name',
    },
}, {
    name: 'startValue',
    component: TextField,
    props: {
        floatingLabelText: 'Start value',
    },
}, {
    name: 'endValue',
    component: TextField,
    props: {
        floatingLabelText: 'End value',
    },
}, {
    name: 'color',
    component: (props) => (<pre>Color picker here! {JSON.stringify(props, undefined, 2)}</pre>),
    props: {
        floatingLabelText: 'Color',
    },
}];

export function setDialogStateTo(open) {
    console.log(open);
    legendItemStore.setState({
        ...legendItemStore.getState(),
        open,
    });
}

export const legendItemStore$ = Observable
    .combineLatest(
        legendItemStore,
        Observable.just(formFieldsConfigs),
        (state, fieldConfigs) => ({...state, fieldConfigs})
    ) // Return a combined object (will return an array if we don't pass it)
    .map(state => {
        return {
            ...state,
            fieldConfigs: state.fieldConfigs
                .map(fieldConfig => ({
                    ...fieldConfig,
                    value: state.model[fieldConfig.name],
                }))
        }
    });


import React, {  Component, PropTypes } from 'react';
import Store from '../store/Store';
import TextField from 'material-ui/TextField/TextField';
import { Observable } from 'rx';
import ColorPicker from './ColorPicker.component';
import {getInstance, config} from 'd2/lib/d2';
import camelCaseToUnderscores from 'd2-utilizr/lib/camelCaseToUnderscores'

config.i18n.strings.add('required');
config.i18n.strings.add('should_be_lower_than_end_value');
config.i18n.strings.add('should_be_higher_than_start_value');

export const legendItemStore = Store.create();

// FormBuilder currently requires an event to be passed for fields
function createFakeEvent(color) {
    return {
        target: {
            value: color
        },
    };
};

const colorPicker = function(props) {
    return (
        <ColorPicker color={props.value} onChange={(color) => props.onChange(createFakeEvent(color))} />
    );
}

export function openEditDialogFor(model) {
    legendItemStore.setState({
        model,
        open: true,
    });
}

const formFieldsConfigs = [{
    name: 'name',
    component: TextField,
}, {
    name: 'startValue',
    component: TextField,
    props: {
        type: 'number',
    },
    validators: [{
        validator: value => value === '' ? false : true,
        message: 'required',
    }/*,{
        validator: value => Number(value) >= Number(legendItemStore.getState().model.endValue) ? false : true,
        message: 'should_be_lower_than_end_value',
    }*/],
}, {
    name: 'endValue',
    component: TextField,
    props: {
        type: 'number',
    },
    validators: [{
        validator: value => value === '' ? false : true,
        message: 'required',
    }/*,{
        validator: value => Number(value) <= Number(legendItemStore.getState().model.startValue) ? false : true,
        message: 'should_be_higher_than_start_value',
    }*/],
}, { // Defined in data-table/data-value/Color.component.js
    name: 'color',
    component: colorPicker,
}];


// Called when a field is changed
export function onFieldChange(fieldName, value) {
    const model = legendItemStore.getState().model;

    model[fieldName] = value;

    legendItemStore.setState({
        ...legendItemStore.getState(),
        model
    });
}

export function onFormStatusChange({valid}) {
    legendItemStore.setState({
        ...legendItemStore.getState(),
        isValid: valid,
    });
}

export function setDialogStateTo(open) {
    legendItemStore.setState({
        ...legendItemStore.getState(),
        open,
    });
}

export const legendItemStore$ = Observable
    .combineLatest(
        legendItemStore,
        Observable.just(formFieldsConfigs),
        Observable.fromPromise(getInstance()),
        (state, fieldConfigs, d2) => ({
            ...state,
            fieldConfigs: fieldConfigs
                .map(fieldConfig => ({
                        ...fieldConfig,
                        props: {
                            ...fieldConfig.props,
                            floatingLabelText: d2.i18n.getTranslation(camelCaseToUnderscores(fieldConfig.name))
                        },
                        validators: (fieldConfig.validators || [])
                            .map(validator => ({
                                ...validator,
                                message: d2.i18n.getTranslation(validator.message)
                            }))
                    })
                )
        })
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


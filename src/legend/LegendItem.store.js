import React, {  Component, PropTypes } from 'react';
import Store from '../store/Store';
import TextField from 'material-ui/lib/text-field';
import { Observable } from 'rx';
import ColorPicker from 'react-colorpickr';
import '../../node_modules/react-colorpickr/dist/colorpickr.css';
import {getInstance} from 'd2/lib/d2';
import camelCaseToUnderscores from 'd2-utilizr/lib/camelCaseToUnderscores'

const legendItemStore = Store.create();

// ForBuilder currently requires an event to be passed for fields
function createFakeEvent(color) {
    console.log(color);
    return {
        target: {
            value: `#${color.hex}`,
            //value: color.hex,
        },
    };
};

// https://github.com/mapbox/react-colorpickr/
const colorPicker = function(props) {
    // TODO: Decide on default color when creating new legend items
    return (
        <ColorPicker value={props.value} onChange={(color) => props.onChange(createFakeEvent(color))} />
    );
}

// <ChromePicker color={props.value} onChangeComplete={(color) => props.onChange(createFakeEvent(color))} />

const onColorChange = function(color) {
    console.log('onColorchange', color);
};

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
}, {
    name: 'endValue',
    component: TextField,
    props: {
        type: 'number',
    },
}, { // Defined in data-table/data-value/Color.component.js
    name: 'color',
    component: colorPicker,
}];



// Called when a field is changed
export function onFieldChange(fieldName, value) {
    // console.log("##", fieldName, value)

    const model = legendItemStore.getState().model;

    model[fieldName] = value;

    legendItemStore.setState({
        ...legendItemStore.getState(),
        model
    });
}

export function setDialogStateTo(open) {
    //console.log(open);
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
                        }
                    })
                )
        })
    ) // Return a combined object (will return an array if we don't pass it)
    .map(state => {
        // ßconsole.log(state);

        return {
            ...state,
            fieldConfigs: state.fieldConfigs
                .map(fieldConfig => ({
                    ...fieldConfig,
                    value: state.model[fieldConfig.name],
                }))
        }
    });


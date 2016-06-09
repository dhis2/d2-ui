import React, {  Component, PropTypes } from 'react';
import Store from '../store/Store';
import TextField from 'material-ui/lib/text-field';
import { Observable } from 'rx';
import ColorPicker from 'react-colorpickr';
import '../../node_modules/react-colorpickr/dist/colorpickr.css';

const legendItemStore = Store.create();

// ForBuilder currently requires an event to be passed for fields
function createFakeEvent(color) {
    return {
        target: {
            value: `#${color.hex}`,
        },
    };
};

// https://github.com/mapbox/react-colorpickr/
const colorPicker = function(props) {
    const styles = {
        height: 246
    };
    // TODO: Decide on default color when creating new legend items
    return (
        <div style={styles}>
            <ColorPicker value={props.value} onChange={(color) => props.onChange(createFakeEvent(color))} />
        </div>
    );
}

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
    component: colorPicker,
    props: {
        floatingLabelText: 'Color',
    },
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
        (state, fieldConfigs) => ({...state, fieldConfigs})
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


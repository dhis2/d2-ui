import React from 'react';
import TextField from 'material-ui-next/TextField';
import strings from './utils';

const AxesOptions = props => (
    <div>
        <div>
            <TextField
                label={strings.axes.min}
                type={'number'}
                onChange={(event) => { props.onChange('axismin', event.target.value); }}
                value={props.tabContent.axismin || ''}
            />
            <TextField
                label={strings.axes.max}
                type={'number'}
                onChange={(event) => { props.onChange('axismax', event.target.value); }}
                value={props.tabContent.axismax || ''}
            />
        </div>
        <div>
            <TextField
                label={strings.axes.tickSteps}
                type={'number'}
                onChange={(event) => { props.onChange('ticksteps', event.target.value); }}
                value={props.tabContent.ticksteps || ''}
            />
        </div>
        <div>
            <TextField
                label={strings.axes.decimals}
                type={'number'}
                onChange={(event) => { props.onChange('decimals', event.target.value); }}
                value={props.tabContent.decimals || ''}
            />
        </div>
        <TextField
            label={strings.axes.rangeTitle}
            fullWidth
            onChange={(event) => { props.onChange('rangeTitle', event.target.value); }}
            value={props.tabContent.rangeTitle || ''}
        />
        <div>
            <TextField
                label={strings.axes.domainTitle}
                fullWidth
                onChange={(event) => { props.onChange('domainTitle', event.target.value); }}
                value={props.tabContent.domainTitle || ''}
            />
        </div>
    </div>
);

export default AxesOptions;

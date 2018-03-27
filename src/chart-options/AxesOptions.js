import React from 'react';
import TextField from 'material-ui-next/TextField';
import strings from './utils';

const AxesOptions = props => (
    <div>
        <div>
            <TextField
                label={strings.axes.min}
                type={'number'}
                onChange={(event) => { props.handleChange('axismin', event); }}
                value={props.tabContent.axismin || ''}
            />
            <TextField
                label={strings.axes.max}
                type={'number'}
                onChange={(event) => { props.handleChange('axismax', event); }}
                value={props.tabContent.axismax || ''}
            />
        </div>
        <div>
            <TextField
                label={strings.axes.tickSteps}
                type={'number'}
                onChange={(event) => { props.handleChange('ticksteps', event); }}
                value={props.tabContent.ticksteps || ''}
            />
        </div>
        <div>
            <TextField
                label={strings.axes.decimals}
                type={'number'}
                onChange={(event) => { props.handleChange('decimals', event); }}
                value={props.tabContent.decimals || ''}
            />
        </div>
        <TextField
            label={strings.axes.rangeTitle}
            fullWidth
            onChange={(event) => { props.handleChange('rangeTitle', event); }}
            value={props.tabContent.rangeTitle || ''}
        />
        <div>
            <TextField
                label={strings.axes.domainTitle}
                fullWidth
                onChange={(event) => { props.handleChange('domainTitle', event); }}
                value={props.tabContent.domainTitle || ''}
            />
        </div>
    </div>
);

export default AxesOptions;

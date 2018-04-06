import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui-next/TextField';
import strings from './utils';

const AxesOptions = props => (
    <div>
        <div>
            <TextField
                label={strings.axes.min}
                type={'number'}
                onChange={(event) => { props.onChange('axismin', event.target.value); }}
                value={props.tabContent.axisMin}
            />
            <TextField
                label={strings.axes.max}
                type={'number'}
                onChange={(event) => { props.onChange('axismax', event.target.value); }}
                value={props.tabContent.axisMax}
            />
        </div>
        <div>
            <TextField
                label={strings.axes.tickSteps}
                type={'number'}
                onChange={(event) => { props.onChange('ticksteps', event.target.value); }}
                value={props.tabContent.tickSteps}
            />
        </div>
        <div>
            <TextField
                label={strings.axes.decimals}
                type={'number'}
                onChange={(event) => { props.onChange('decimals', event.target.value); }}
                value={props.tabContent.decimals}
            />
        </div>
        <TextField
            label={strings.axes.rangeTitle}
            fullWidth
            onChange={(event) => { props.onChange('rangeTitle', event.target.value); }}
            value={props.tabContent.rangeTitle}
        />
        <div>
            <TextField
                label={strings.axes.domainTitle}
                fullWidth
                onChange={(event) => { props.onChange('domainTitle', event.target.value); }}
                value={props.tabContent.domainTitle}
            />
        </div>
    </div>
);

AxesOptions.propTypes = {
    onChange: PropTypes.func.isRequired,
    tabContent: PropTypes.shape({
        axisMin: PropTypes.number,
        axisMax: PropTypes.number,
        tickSteps: PropTypes.number,
        decimals: PropTypes.number,
        rangeTitle: PropTypes.string,
        domainTitle: PropTypes.string,
    }),
};
AxesOptions.defaultProps = {
    tabContent: {
        axisMin: 0,
        axisMax: 0,
        tickSteps: 0,
        decimals: 0,
        rangeTitle: '',
        domainTitle: '',
    },
};

export default AxesOptions;

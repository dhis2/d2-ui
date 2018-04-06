import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup, FormControlLabel } from 'material-ui-next/Form';
import Checkbox from 'material-ui-next/Checkbox';
import Select from 'material-ui-next/Select';
import TextField from 'material-ui-next/TextField';
import { InputLabel } from 'material-ui-next/Input';
import { MenuItem } from 'material-ui-next/Menu';
import strings from './utils';

const style = {
    formControl: {
        minWidth: 200,
    },
};

const DataOptions = props => (
    <div>
        <FormGroup>
            <FormControlLabel
                label={strings.data.values}
                control={<Checkbox
                    checked={props.tabContent.showValues}
                    onChange={(event) => { props.onChange('showValues', event.target.checked); }}
                />}
            />
            <FormControlLabel
                label={strings.data.cumulative}
                control={<Checkbox
                    checked={props.tabContent.useCumulative}
                    onChange={(event) => { props.onChange('useCumulative', event.target.checked); }}
                />}
            />
            <FormControlLabel
                label={strings.data.stacked}
                control={<Checkbox
                    checked={props.tabContent.useStacked}
                    onChange={(event) => { props.onChange('useStacked', event.target.checked); }}
                />}
            />
        </FormGroup>
        <FormControl style={style.formControl}>
            <InputLabel>{strings.data.hideEmptyCategories.defaultValue}</InputLabel>
            <Select
                value={props.tabContent.category}
                onChange={(event) => { props.onChange('category', event.target.value); }}
            >
                {strings.data.hideEmptyCategories.alternatives.map((alternative, id) => (
                    <MenuItem key={id} value={alternative}> {alternative } </MenuItem>
                ))}
            </Select>
        </FormControl>
        <div>
            <FormControl style={style.formControl}>
                <InputLabel>{strings.data.trendLine.defaultValue}</InputLabel>
                <Select
                    value={props.tabContent.trendLine}
                    onChange={(event) => { props.onChange('trendLine', event.target.value); }}
                >
                    {strings.data.trendLine.alternatives.map((alternative, id) => (
                        <MenuItem key={id} value={alternative}> {alternative } </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
        <TextField
            label={strings.data.targetLineValue}
            onChange={(event) => { props.onChange('targetLineValue', event.target.value); }}
            type={'number'}
            value={props.tabContent.targetLineValue}
        />
        <TextField
            label={strings.data.targetLineTitle}
            onChange={(event) => { props.onChange('targetLineTitle', event.target.value); }}
            value={props.tabContent.targetLineTitle}
        />
        <div>
            <TextField
                label={strings.data.baseLineValue}
                type={'number'}
                onChange={(event) => { props.onChange('baseLineValue', event.target.value); }}
                value={props.tabContent.baseLineValue}
            />
            <TextField
                label={strings.data.baseLineTitle}
                onChange={(event) => { props.onChange('baseLineTitle', event.target.value); }}
                value={props.tabContent.baseLineTitle}
            />
        </div>
        <div>
            <FormControl style={style.formControl}>
                <InputLabel>{strings.data.sortOrder.defaultValue}</InputLabel>
                <Select
                    value={props.tabContent.sortOrder}
                    onChange={(event) => { props.onChange('sortOrder', event.target.value); }}
                >
                    {strings.data.sortOrder.alternatives.map((alternative, id) => (
                        <MenuItem key={id} value={alternative}> {alternative} </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    </div>
);

DataOptions.propTypes = {
    onChange: PropTypes.func.isRequired,
    tabContent: PropTypes.shape({
        showValues: PropTypes.bool,
        useCumulative: PropTypes.bool,
        useStacked: PropTypes.bool,
        category: PropTypes.string,
        trendLine: PropTypes.string,
        targetLineValue: PropTypes.string,
        targetLineTitle: PropTypes.string,
        baseLineValue: PropTypes.string,
        baseLineTitle: PropTypes.string,
        sortOrder: PropTypes.string,
    }),
};
DataOptions.defaultProps = {
    tabContent: {
        showValues: false,
        useCumululative: false,
        useStacked: false,
        category: '',
        trendLine: '',
        targetLineValue: '',
        baseLineValue: '',
        baseLineTitle: '',
        sortOrder: '',
    },
};

export default DataOptions;

import React from 'react';
import { FormControl, FormGroup, FormControlLabel } from 'material-ui-next/Form';
import Checkbox from 'material-ui-next/Checkbox';
import Select from 'material-ui-next/Select';
import TextField from 'material-ui-next/TextField';
import { InputLabel } from 'material-ui-next/Input';
import { MenuItem } from 'material-ui-next/Menu';
import strings from './utils';
import './index.css';

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
                    checked={props.checkBoxContent.showValues || false}
                    onChange={(event) => { props.handleCheckBoxChange('showValues', event); }}
                />}
            />
            <FormControlLabel
                label={strings.data.cumulative}
                control={<Checkbox
                    checked={props.checkBoxContent.useCumulative || false}
                    onChange={(event) => { props.handleCheckBoxChange('useCumulative', event); }}
                />}
            />
            <FormControlLabel
                label={strings.data.stacked}
                control={<Checkbox
                    checked={props.checkBoxContent.useStacked || false}
                    onChange={(event) => { props.handleCheckBoxChange('useStacked', event); }}
                />}
            />
        </FormGroup>
        <FormControl style={style.formControl}>
            <InputLabel>{strings.data.hideEmptyCategories.defaultValue}</InputLabel>
            <Select
                value={props.tabContent.category || ''}
                onChange={(event) => { props.handleFieldChange('category', event); }}
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
                    value={props.tabContent.trendLine || ''}
                    onChange={(event) => { props.handleFieldChange('trendLine', event); }}
                >
                    {strings.data.trendLine.alternatives.map((alternative, id) => (
                        <MenuItem key={id} value={alternative}> {alternative } </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>

        <TextField
            label={strings.data.targetLineValue}
            onChange={(event) => { props.handleFieldChange('targetLineValue', event); }}
            type={'number'}
            value={props.tabContent.targetLineValue || ''}
        />
        <TextField
            label={strings.data.targetLineTitle}
            onChange={(event) => { props.handleFieldChange('targetLineTitle', event); }}
            value={props.tabContent.targetLineTitle || ''}
        />

        <div>
            <TextField
                label={strings.data.baseLineValue}
                type={'number'}
                onChange={(event) => { props.handleFieldChange('baseLineValue', event); }}
                value={props.tabContent.baseLineValue || ''}
            />
            <TextField
                label={strings.data.baseLineTitle}
                onChange={(event) => { props.handleFieldChange('baseLineTitle', event); }}
                value={props.tabContent.baseLineTitle || ''}
            />
        </div>

        <div>
            <FormControl style={style.formControl}>
                <InputLabel>{strings.data.sortOrder.defaultValue}</InputLabel>
                <Select
                    value={props.tabContent.sortOrder || ''}
                    onChange={(event) => { props.handleFieldChange('sortOrder', event); }}
                >
                    {strings.data.sortOrder.alternatives.map((alternative, id) => (
                        <MenuItem key={id} value={alternative}> {alternative} </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    </div>
);


export default DataOptions;

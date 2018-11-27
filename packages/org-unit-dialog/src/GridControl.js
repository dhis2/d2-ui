import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select/Select';
import styles from './styles/GridControl.style';

const GridControl = ({ id, title, options, ...selectProps }) => (
    <Grid
        item
        xs={4}
        style={styles.gridContainer.gridItem}
    >
        <FormControl style={{ width: '100%' }}>
            <InputLabel htmlFor={id}>{title}</InputLabel>
            <Select
                input={<Input id={id} />}
                {...selectProps}
                fullWidth
            >
                {options.map(option => (
                    <MenuItem
                        key={option.id}
                        value={option.id}
                    >
                        {option.displayName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </Grid>
);

export default GridControl;

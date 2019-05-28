import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select/Select';
import styles from './styles/GridControl.style';

const GridControl = ({ label, placeholder, options, ...selectProps }) => {
    const renderValue = (selected) => {
        if (selected.length === 0) {
            return <span style={styles.placeholder}>{placeholder}</span>;
        }

        return selectProps.renderValue(selected);
    };

    return (
        <Grid
            style={styles.gridItem}
            xs={4}
            item
        >
            <FormControl style={{ width: '100%' }}>
                <span style={styles.label}>{label}</span>
                <Select
                    {...selectProps}
                    renderValue={renderValue}
                    displayEmpty
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
}

export default GridControl;

import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import keycode from 'keycode';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
];

const Input = inputProps => {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
};

const Suggestion = ({
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem,
}) => {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.label}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            {suggestion.label}
        </MenuItem>
    );
};

Suggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
              const keep =
                  count < 5 &&
                  suggestion.label.slice(0, inputLength).toLowerCase() ===
                      inputValue;

              if (keep) {
                  count += 1;
              }

              return keep;
          });
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

function IntegrationDownshift(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <Downshift id="downshift-simple">
                {({
                    getInputProps,
                    getItemProps,
                    getMenuProps,
                    highlightedIndex,
                    inputValue,
                    isOpen,
                    selectedItem,
                }) => (
                    <div className={classes.container}>
                        <Input
                            fullWidth
                            classes={classes}
                            InputProps={getInputProps({
                                placeholder: 'Search a country (start with a)',
                            })}
                        />
                        <div {...getMenuProps()}>
                            {isOpen && (
                                <Paper className={classes.paper} square>
                                    {getSuggestions(inputValue).map(
                                        (suggestion, index) => (
                                            <Suggestion
                                                key={suggestion.label}
                                                suggestion={suggestion}
                                                index={index}
                                                itemProps={getItemProps({
                                                    item: suggestion.label,
                                                })}
                                                highlightedIndex={
                                                    highlightedIndex
                                                }
                                                selectedItem={selectedItem}
                                            />
                                        )
                                    )}
                                </Paper>
                            )}
                        </div>
                    </div>
                )}
            </Downshift>
        </div>
    );
}

IntegrationDownshift.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationDownshift);

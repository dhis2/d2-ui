import React, { Component } from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

const Input = ({ InputProps }) => {
    return (
        <TextField
            id="user-search-input"
            fullWidth
            InputProps={{ ...InputProps }}
        />
    );
};
Input.propTypes = {
    InputProps: PropTypes.object.isRequired,
};

const Suggestion = ({ suggestion, itemProps, isHighlighted, selectedItem }) => {
    const isSelected = selectedItem && selectedItem.id === suggestion.id;

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
            {suggestion.displayName}
        </MenuItem>
    );
};

Suggestion.propTypes = {
    isHighlighted: PropTypes.bool.isRequired,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.object,
    suggestion: PropTypes.shape({ displayName: PropTypes.string }).isRequired,
};

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
    inputRoot: {
        flexWrap: 'wrap',
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

class AutoComplete extends Component {
    render() {
        const { classes, placeholderText, dataSource, searchText } = this.props;

        console.log('searchText', searchText);

        return (
            <Downshift
                id="downshift-simple"
                onInputValueChange={this.props.onInputChanged}
                onChange={this.props.onResultSelected}
                itemToString={item => (item ? item.name : '')}
                inputValue={searchText}
            >
                {({
                    getInputProps,
                    getItemProps,
                    getMenuProps,
                    highlightedIndex,
                    isOpen,
                    selectedItem,
                }) => {
                    return (
                        <div className={classes.container}>
                            <Input
                                fullWidth
                                classes={classes}
                                InputProps={getInputProps({
                                    placeholder: placeholderText,
                                })}
                            />
                            <div {...getMenuProps()}>
                                {isOpen && (
                                    <Paper className={classes.paper} square>
                                        {dataSource.map((suggestion, index) => {
                                            return (
                                                <Suggestion
                                                    key={suggestion.displayName}
                                                    suggestion={suggestion}
                                                    itemProps={getItemProps({
                                                        item: {
                                                            name:
                                                                suggestion.displayName,
                                                            id: suggestion.id,
                                                        },
                                                    })}
                                                    isHighlighted={
                                                        highlightedIndex ===
                                                        index
                                                    }
                                                    selectedItem={selectedItem}
                                                />
                                            );
                                        })}
                                    </Paper>
                                )}
                            </div>
                        </div>
                    );
                }}
            </Downshift>
        );
    }
}

AutoComplete.propTypes = {
    classes: PropTypes.object.isRequired,
    placeholderText: PropTypes.string,
    onInputChanged: PropTypes.func.isRequired,
    onResultSelected: PropTypes.func.isRequired,
    dataSource: PropTypes.array.isRequired,
};

AutoComplete.defaultProps = {
    placeholderText: '',
};

export default withStyles(styles)(AutoComplete);

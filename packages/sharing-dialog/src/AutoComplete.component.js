import React, { Component } from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';

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
        height: 60,
    },
    popper: {
        zIndex: 2000,
        maxHeight: '420px',
        overflowY: 'hidden',
        boxShadow: '0px 0px 1px 1px rgba(0,0,0,0.2)',
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
});

let popperNode;

class AutoComplete extends Component {
    render() {
        const { classes, placeholderText, suggestions, searchText } = this.props;

        return (
            <div className={classes.root}>
            <Downshift
                id="user-autocomplete"
                onInputValueChange={this.props.onInputChanged}
                onChange={this.props.onItemSelected}
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
                                    inputRef: (node) => {
                                        popperNode = node;
                                    },
                                })}
                            />
                            <div {...getMenuProps()}>
                                {isOpen && (
                                    <Popper className={classes.popper} open anchorEl={popperNode}>
                                        <Paper square style={{ width: popperNode ? popperNode.clientWidth : null }}>
                                            {suggestions.map((suggestion, index) => {
                                                return (
                                                    <Suggestion
                                                        key={suggestion.id}
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
                                    </Popper>
                                )}
                            </div>
                        </div>
                    );
                }}
            </Downshift>
            </div>
        );
    }
}

AutoComplete.propTypes = {
    classes: PropTypes.object.isRequired,
    placeholderText: PropTypes.string,
    onInputChanged: PropTypes.func.isRequired,
    onItemSelected: PropTypes.func.isRequired,
    suggestions: PropTypes.array.isRequired,
};

AutoComplete.defaultProps = {
    placeholderText: '',
};

export default withStyles(styles)(AutoComplete);

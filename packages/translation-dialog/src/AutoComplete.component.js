import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 60,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
 noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  ValueContainer,
};

class AutoComplete extends React.Component {
  state = {
    value: null,
  };

  getSuggestions = () => {
    const config = this.props.suggestionConfig;
    return this.props.suggestions.map(s =>
        ({
            value: s[config.valueField],
            label: s[config.labelField],
        })
    )
};

  handleChange = value => {
    this.setState({ value });
    this.props.onItemSelected(value);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
          <Select
            classes={classes}
            options={this.getSuggestions()}
            components={components}
            value={this.state.value}
            onChange={this.handleChange}
            placeholder={this.props.placeholder}
          />
      </div>
    );
  }
}

AutoComplete.propTypes = {
  classes: PropTypes.object.isRequired,
  suggestions: PropTypes.array.isRequired,
  suggestionConfig: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  onItemSelected: PropTypes.func.isRequired,

};

export default withStyles(styles, { withTheme: true })(AutoComplete);

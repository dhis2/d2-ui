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
  placeholder: {
    position: 'absolute',
    left: 2,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
});

const inputComponent = ({ inputRef, ...props }) => <div ref={inputRef} {...props} />;

const Control = ({selectProps, innerRef, innerProps, children}) =>
    <TextField
        fullWidth
        InputProps={{
        inputComponent,
        inputProps: {
            className: selectProps.classes.input,
            inputRef: innerRef,
            children: children,
            ...innerProps,
        },
        }}
        {...selectProps.textFieldProps}
    />;

const Option = ({innerRef, isFocused, innerProps, children}) =>
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      component="div"
      {...innerProps}
    >
        {children}
    </MenuItem>;

const Placeholder = ({selectProps, innerProps, children}) =>
    <Typography
      color="textSecondary"
      className={selectProps.classes.placeholder}
      {...innerProps}
    >
        {children}
    </Typography>;

const ValueContainer = ({selectProps, children}) => <div className={selectProps.classes.valueContainer}>{children}</div>;

const Menu = ({selectProps, innerProps, children}) =>
    <Paper square className={selectProps.classes.paper} {...innerProps}>
        {children}
    </Paper>;

const components = {
    Control,
    Menu,
    Option,
    Placeholder,
    ValueContainer,
};

class AutoComplete extends React.Component {
    constructor(props, context) {
        super(props, context);

        const i18n = this.context.d2.i18n;
        this.getTranslation = i18n.getTranslation.bind(i18n);
    }

    mappedItem = item => {
        return {
            value: item.locale,
            label: item.name
        }
    }
    getSuggestions = () => this.props.suggestions.map(s => this.mappedItem(s));

    getCurrentValue = () => {
        const item = this.props.suggestions.find(s => s.locale === this.props.value);
        return item ? this.mappedItem(item) : null;
    }

    render() {
        const { classes, onItemSelected } = this.props;

        return (
        <div className={classes.root}>
            <Select
                classes={classes}
                options={this.getSuggestions()}
                components={components}
                value={this.getCurrentValue()}
                onChange={onItemSelected}
                placeholder={this.getTranslation('select_locale')}
            />
        </div>
        );
    }
}

AutoComplete.propTypes = {
    classes: PropTypes.object.isRequired,
    suggestions: PropTypes.array.isRequired,
    onItemSelected: PropTypes.func.isRequired,
    value: PropTypes.string,
};

AutoComplete.defaultProps = {
    value: ''
};

AutoComplete.contextTypes = {
    d2: PropTypes.object,
};


export default withStyles(styles, { withTheme: true })(AutoComplete);

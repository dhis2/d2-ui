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

export class LocaleSelector extends React.Component {
    constructor(props, context) {
        super(props, context);

        const i18n = this.context.d2.i18n;
        this.getTranslation = i18n.getTranslation.bind(i18n);
    }

    mappedItem = item => ({
        value: item.locale,
        label: item.name
    });

    onLocaleChange = (locale) => {
        this.props.onChange(locale.value);
    }

    getSuggestions = () => this.props.locales.map(s => this.mappedItem(s));

    getCurrentValue = () => {
        const item = this.props.locales.find(s => s.locale === this.props.currentLocale);
        return item ? this.mappedItem(item) : null;
    }

    render() {
        const { classes } = this.props;

        return (
        <div className={classes.root}>
            <Select
                classes={classes}
                options={this.getSuggestions()}
                components={components}
                value={this.getCurrentValue()}
                onChange={this.onLocaleChange}
                placeholder={this.getTranslation('select_locale')}
            />
        </div>
        );
    }
}

LocaleSelector.propTypes = {
    classes: PropTypes.object.isRequired,
    locales: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            locale: PropTypes.string.isRequired,
        })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    currentLocale: PropTypes.string,
};

LocaleSelector.defaultProps = {
    currentLocale: ''
};

LocaleSelector.contextTypes = {
    d2: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(LocaleSelector);

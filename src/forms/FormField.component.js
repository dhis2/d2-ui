import { PropTypes, default as React } from 'react';
import classes from 'classnames';
import LinearProgress from 'material-ui/lib/linear-progress';

const emptyComponent = React.createClass({ render() { return null; } });

/**
 * Is required to be a direct child of the `Form.component`
 * Will receive a updateFormStatus method from the Form to be called when the state of the input changes.
 * This will be passed down as an onChange event.
 * If the component passed as `type` does not support onChange
 * consider passing a wrapper component that wraps your `type` component
 * and fires the onChange
 *
 * The field fires an update request for the value by calling `onChange` by default but it is optional to set the update event to `onBlur`.
 * Pass the string `onBlur` to `updateEvent` to update the `<Form>` component on blur.
 */
const FormField = React.createClass({  // eslint-disable-line react/no-multi-comp
    propTypes: {
        type: PropTypes.func.isRequired,
        isValid: PropTypes.bool.isRequired,
        errorMessage: PropTypes.string,
        fieldOptions: PropTypes.shape({
            helpText: PropTypes.string,
            dynamicHelpText: PropTypes.bool,
        }).isRequired,
        value: PropTypes.any,
        updateFn: PropTypes.func.isRequired,
        updateEvent: PropTypes.oneOf(['onChange', 'onBlur']),
        isValidating: PropTypes.bool,
        isRequired: PropTypes.bool,
    },

    getDefaultProps() {
        return {
            type: emptyComponent,
            validators: [],
        };
    },

    getInitialState() {
        return { isFocused: false };
    },

    renderHelpText() {
        if ((!this.props.fieldOptions || !this.props.fieldOptions.helpText) || this.props.errorMessage) {
            return null;
        }

        const helpText = this.props.fieldOptions.helpText;
        const dynamic = this.props.fieldOptions.dynamicHelpText;

        const helpStyle = {
            color: '#888',
            fontSize: '12px',
        };

        if (dynamic) {
            Object.assign(helpStyle, {
                marginTop: this.state.isFocused ? 0 : -18,
                marginBottom: this.state.isFocused ? 0 : 0,
                transition: 'margin 175ms ease-in-out',
            });
        }

        return (
            <div style={{ overflow: 'hidden', marginTop: dynamic ? -5 : 0 }}>
                <div style={helpStyle}>{helpText}</div>
            </div>
        );
    },

    render() {
        const classList = classes('form-field');

        let onChangeFn = this.props.updateFn;
        let onBlurFn = this._blur;
        if (this.props.updateEvent === 'onBlur') {
            onBlurFn = (e) => {
                this._blur(e);
                if (e.target.value !== (this.props.value ? this.props.value : '')) {
                    this.props.updateFn(e);
                }
            };
            onChangeFn = undefined;
        }

        return (
            <div className={classList}>
                <this.props.type
                    errorText={this.props.errorMessage}
                    defaultValue={this.props.value}
                    onChange={onChangeFn}
                    onBlur={onBlurFn}
                    onFocus={this._focus}
                    isRequired={this.props.isRequired}
                    {...this.props.fieldOptions}
                />
                {this.renderHelpText()}
                {this.props.isValidating ? <LinearProgress indetermined /> : null}
            </div>
        );
    },

    _focus() {
        this.setState({ isFocused: true });
    },

    _blur() {
        this.setState({ isFocused: false });
    },
});

export default FormField;

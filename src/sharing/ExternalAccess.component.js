import {PropTypes, createClass, default as React} from 'react';
import Translate from '../i18n/Translate.mixin';
import Toggle from 'material-ui/lib/toggle';
import {config} from 'd2/lib/d2';

config.i18n.strings.add('external_access');

export default createClass({
    propTypes: {
        externalAccess: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        onChange: PropTypes.func.isRequired,
    },

    mixins: [Translate],

    onToggle() {
        this.props.onChange(this.refs.toggle.isToggled());
    },

    render() {
        return (
            <Toggle
                ref="toggle"
                name="externalAccess"
                label={this.getTranslation('external_access')}
                checked={this.props.externalAccess}
                onToggle={this.onToggle}
                disabled={this.props.disabled}
            />
        );
    },
});

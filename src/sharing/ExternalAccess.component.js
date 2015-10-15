import {PropTypes, createClass, default as React} from 'react';
import Translate from '../i18n/Translate.mixin';
import Toggle from 'material-ui/lib/toggle';

export default createClass({
    propTypes: {
        externalAccess: PropTypes.string.isRequired,
    },

    mixins: [Translate],

    render() {
        return (
            <Toggle
                ref="toggle"
                name="externalAccess"
                label={this.getTranslation('external_access_without_login')}
                checked={this.props.externalAccess}
                onToggle={this.onToggle}
            />
        );
    },

    onToggle() {
        this.props.onChange(this.refs.toggle.isToggled());
    },
});

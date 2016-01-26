import { createClass, default as React } from 'react';
import Translate from '../i18n/Translate.mixin';
import AccessMaskSwitches from './AccessMaskSwitches.component';
import { config } from 'd2/lib/d2';

config.i18n.strings.add('public_access');

export default createClass({
    propTypes: Object.assign({}, AccessMaskSwitches.propTypes),

    mixins: [Translate],

    render() {
        return (
            <AccessMaskSwitches
                label={this.getTranslation('public_access')}
                accessMask={this.props.publicAccess}
                onChange={this.props.onChange}
                name="publicAccess"
                disabled={this.props.disabled}
                />
        );
    },
});

import {createClass, default as React} from 'react';
import Translate from '../i18n/Translate.mixin';
import AccessMaskSwitches from './AccessMaskSwitches.component';

export default createClass({
    propTypes: AccessMaskSwitches.propTypes,

    mixins: [Translate],

    render() {
        return (
            <AccessMaskSwitches
                label={this.getTranslation('public_access_with_login')}
                accessMask={this.props.publicAccess}
                onChange={this.props.onChange}
                name="publicAccess"
                />
        );
    },
});

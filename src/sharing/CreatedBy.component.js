import { PropTypes, createClass, default as React } from 'react';
import Translate from '../i18n/Translate.mixin';
import { config } from 'd2/lib/d2';

config.i18n.strings.add('created_by');

export default createClass({
    propTypes: {
        user: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    },

    mixins: [Translate],

    getDefaultProps() {
        return {
            user: {},
        };
    },

    render() {
        const createdByText = `${this.getTranslation('created_by')}: ${this.props.user.name}`;

        return (
            <div>{createdByText}</div>
        );
    },
});

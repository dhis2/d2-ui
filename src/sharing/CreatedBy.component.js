import {PropTypes, createClass, default as React} from 'react';
import Translate from '../i18n/Translate.mixin';

export default createClass({
    propTypes: {
        user: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    },

    getDefaultProps() {
        return {
            user: {},
        };
    },

    mixins: [Translate],

    render() {
        const createdByText = `${this.getTranslation('created_by')}: ${this.props.user.name}`;

        return (
            <div>{createdByText}</div>
        );
    },
});

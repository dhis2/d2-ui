import { PropTypes, default as React } from 'react';
import { config } from 'd2/lib/d2';

config.i18n.strings.add('created_by');

const CreatedBy = ({ user }, context) => {
    const nameToRender = user && user.name ? user.name : '';
    const createdByText = `${context.d2.i18n.getTranslation('created_by')}: ${nameToRender}`;
    return <div>{createdByText}</div>;
};

CreatedBy.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
};

CreatedBy.contextTypes = {
    d2: PropTypes.object.isRequired,
};

export default CreatedBy;

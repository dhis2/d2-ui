import PropTypes from 'prop-types';
import React from 'react';

const CreatedBy = ({ author }, context) => {
    context.d2.i18n.addStrings(['created_by', 'no_author']);

    const createdByText = author ?
        `${context.d2.i18n.getTranslation('created_by')}: ${author.name}` :
        context.d2.i18n.getTranslation('no_author');

    return <div>{createdByText}</div>;
};

CreatedBy.propTypes = {
    author: PropTypes.object.isRequired,
};

CreatedBy.contextTypes = {
    d2: PropTypes.object.isRequired,
};

export default CreatedBy;

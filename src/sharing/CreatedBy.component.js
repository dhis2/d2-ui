import PropTypes from 'prop-types';
import React from 'react';
import { config } from 'd2/lib/d2';

config.i18n.strings.add('created_by');
config.i18n.strings.add('no_author');

const CreatedBy = ({ author }, context) => {
    const createdByText = author ?
        `${context.d2.i18n.getTranslation('created_by')}: ${author.name}` :
        context.d2.i18n.getTranslation('no_author');

    return <div>{createdByText}</div>;
};

CreatedBy.propTypes = {
    author: PropTypes.object,
};

CreatedBy.contextTypes = {
    d2: PropTypes.object.isRequired,
};

export default CreatedBy;

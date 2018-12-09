import React from 'react';
import i18n from '@dhis2/d2-i18n';

export const Description = model => {
    const descriptionMaxLength = 250;
    const { displayDescription: description } = model;
    
    if (!description) {
        return <i>{i18n.t('No description')}</i>;
    } else if (description.length < descriptionMaxLength) {
        return description;
    } else {
        return description.substring(0, descriptionMaxLength) + ' ...';
    }
};

export default Description;
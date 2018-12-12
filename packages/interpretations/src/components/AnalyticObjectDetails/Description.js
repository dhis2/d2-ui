import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { Parser as RichTextParser } from '@dhis2/d2-ui-rich-text';

export const Description = model => {
    const descriptionMaxLength = 250;
    const { displayDescription: description } = model;
    
    if (!description) {
        return <i>{i18n.t('No description')}</i>;
    } else if (description.length < descriptionMaxLength) {
        return <RichTextParser>{description}</RichTextParser>;
    } else {
        return <RichTextParser>{description.substring(0, descriptionMaxLength) + ' ...'}</RichTextParser>
    }
};

export default Description; 

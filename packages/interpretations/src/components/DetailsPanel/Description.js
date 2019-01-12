import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { Parser as RichTextParser } from '@dhis2/d2-ui-rich-text';

export const Description = ({ description }) => {
    const descriptionMaxLength = 250;
    
    if (!description) {
        return <i>{i18n.t('No description')}</i>;
    } else if (description.length < descriptionMaxLength) {
        return <RichTextParser>{description}</RichTextParser>;
    } else {
        return <RichTextParser>{description.substring(0, descriptionMaxLength) + ' ...'}</RichTextParser>
    }
};

export default Description; 

Description.propTypes = {
    description: PropTypes.string,
};
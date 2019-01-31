import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { Parser as RichTextParser } from '@dhis2/d2-ui-rich-text';

export const Description = ({ description }) => (
    description
        ? <RichTextParser>{description}</RichTextParser>
        : <i>{i18n.t('No description')}</i>
);

export default Description; 

Description.propTypes = {
    description: PropTypes.string,
};
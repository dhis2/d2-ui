import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { Parser as RichTextParser } from '@dhis2/d2-ui-rich-text';
import Link from '../Link/Link';

const descriptionMaxLength = 250;

export const Description = ({ displayDescription, isToggled, onToggleDescription }) => {
    let description;
    
    if (!displayDescription) {
        description = i18n.t('No description');
    } else if (displayDescription.length < descriptionMaxLength || isToggled) {
        description = displayDescription;
    } else {
        description = displayDescription.substring(0, descriptionMaxLength) + ' ... ';
    }

    const showMoreLessLabel = isToggled ? i18n.t('Show less') : i18n.t('Show more');

    const DescriptionElement = displayDescription ?
        <RichTextParser>{description}</RichTextParser> :
        <p style={{fontStyle: 'italic'}}>{description}</p>;

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {DescriptionElement}
            {displayDescription.length > descriptionMaxLength && (
                <Link
                    onClick={onToggleDescription}
                    label={showMoreLessLabel}
                />
            )}
        </div>
    );
};

export default Description; 

Description.defaultProps = {
    displayDescription: '',
}

Description.propTypes = {
    displayDescription: PropTypes.string,
    isToggled: PropTypes.bool.isRequired,
    onToggleDescription: PropTypes.func.isRequired,
};

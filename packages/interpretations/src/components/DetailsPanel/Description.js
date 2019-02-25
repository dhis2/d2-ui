import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { Parser as RichTextParser } from '@dhis2/d2-ui-rich-text';
import Link from '../Link/Link';

const descriptionMaxLength = 250;

export const Description = ({ displayDescription, isToggled, onToggleDescription }) => {
    let description;
    
    if (!displayDescription) {
        description = i18n.t('_No description_');
    } else if (displayDescription.length < descriptionMaxLength || isToggled) {
        description = displayDescription;
    } else {
        description = displayDescription.substring(0, descriptionMaxLength) + ' ... ';
    }

    return (
        <Fragment>
            <RichTextParser>{description}</RichTextParser>
            {displayDescription.length > descriptionMaxLength && (
                <Link
                    onClick={onToggleDescription}
                    label={`[${i18n.t('Show ')} ${isToggled ? i18n.t('less') : i18n.t('more')}]`}
                />
            )}
        </Fragment>
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

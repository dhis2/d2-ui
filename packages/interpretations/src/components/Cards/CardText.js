import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';
import { Parser as RichTextParser } from '@dhis2/d2-ui-rich-text';
import styles from './styles/CardText.style';


export const CardText = ({ classes, extended, text, isEdited}) => (
    <div
        className={
            extended
                ? classes.interpretationText
                : classes.interpretationTextLimited
        }
    >
        <RichTextParser style={styles.parser}>{text}</RichTextParser>
        {isEdited && <span className={classes.editTag}> {i18n.t('(edited)')}</span>}
    </div>
);

CardText.propTypes = {
    classes: PropTypes.object.isRequired,
    extended: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
}

export default withStyles(styles)(CardText);
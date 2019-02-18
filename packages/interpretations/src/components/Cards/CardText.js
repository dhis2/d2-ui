import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Parser as RichTextParser } from '@dhis2/d2-ui-rich-text';
import styles from './styles/CardText.style';


export const CardText = ({ classes, extended, text }) => (
    <div
        className={
            extended
                ? classes.interpretationText
                : classes.interpretationTextLimited
        }
    >
        <RichTextParser style={styles.parser}>{text}</RichTextParser>
    </div>
);

CardText.defaultProps = {
    extended: true,
};
CardText.propTypes = {
    classes: PropTypes.object.isRequired,
    extended: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
};

export default withStyles(styles)(CardText);

import React from 'react';
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
        <RichTextParser>{text}</RichTextParser>
    </div>
);

export default withStyles(styles)(CardText);
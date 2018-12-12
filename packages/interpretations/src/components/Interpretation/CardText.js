import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/CardText.style';


export const CardText = ({ classes, extended, text }) => (
    <div
        className={
            extended
                ? classes.interpretationText
                : classes.interpretationTextLimited
        }
    >
        {text}
    </div>
);

export default withStyles(styles)(CardText);
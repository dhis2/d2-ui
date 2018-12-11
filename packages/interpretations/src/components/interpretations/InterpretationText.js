import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/InterpretationCardHeader.style';


export const InterpretationText = ({ classes, extended, text }) => (
    <div className={classes.interpretationTextWrapper}>
        <div
            className={
                extended
                    ? classes.interpretationText
                    : classes.interpretationTextLimited
            }
        >
            {text}
        </div>
    </div>
);

export default withStyles(styles)(InterpretationText);
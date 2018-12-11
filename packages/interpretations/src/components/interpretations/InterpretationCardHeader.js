import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { getUserLink } from './misc';
import { formatRelative } from '../../util/i18n';
import styles from './styles/InterpretationCardHeader.style';


export const InterpretationCardheader = ({ classes, d2, locale, interpretation }) => (
    <div className={classes.interpretationDescSection}>
        <div className={classes.interpretationName}>
            {getUserLink(d2, interpretation.user)}

            <span className={classes.date}>
                {formatRelative(interpretation.created, locale)}
            </span>
        </div>
    </div>
);

export default withStyles(styles)(InterpretationCardheader);
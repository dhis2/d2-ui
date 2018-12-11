import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/InterpretationCardHeader.style';


export const InterpretationFeedback = ({ classes, likes, comments }) => (
    <div className={classes.interpretationCommentArea}>
        {!!likes && (
            <span className={classes.intepretationLikes}>
                {likes} {likes > 1 ? i18n.t('likes') : i18n.t('like')}
            </span>
        )}
        {!!comments.length && (
            <span>
                {`${comments.length} ${comments.length > 1 ? i18n.t('replies') : i18n.t('reply')}`}
            </span>
        )}
    </div>
);

export default withStyles(styles)(InterpretationFeedback);
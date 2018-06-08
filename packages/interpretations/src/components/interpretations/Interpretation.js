import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import { SvgIcon } from '@dhis2/d2-ui-core';
import { FormattedDate } from 'react-intl';
import InterpretationComments from './InterpretationComments';
import InterpretationDialog from './InterpretationDialog';
import { Link, ActionSeparator, WithAvatar, getUserLink } from './misc';
import { userCanManage } from '../../util/auth';
import { config } from 'd2/lib/d2';
import styles from './InterpretationsStyles.js';
import some from 'lodash/fp/some';

config.i18n.strings.add('edit');
config.i18n.strings.add('delete');
config.i18n.strings.add('delete_interpretation_confirmation');
config.i18n.strings.add('like');
config.i18n.strings.add('unlike');
config.i18n.strings.add('people_like_this');
config.i18n.strings.add('people_commented');

const EllipsisText = ({ max, text }) => {
    const finalText = text && text.length > max ? `${text.slice(0, max)} ...` : text;
    return <span>{finalText}</span>;
};

class Interpretation extends React.Component {
    state = {
        interpretationToEdit: null,
    };

    constructor(props) {
        super(props);
        this.notifyChange = this.notifyChange.bind(this);
        this.saveInterpretationAndClose = this.saveInterpretationAndClose.bind(this);
        this.closeInterpretationDialog = this.closeInterpretationDialog.bind(this);
        this.deleteInterpretation = this.deleteInterpretation.bind(this);
        this.openInterpretationDialog = this.openInterpretationDialog.bind(this);
        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);
        this.saveComment = this.saveComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    notifyChange(interpretation) {
        if (this.props.onChange) {
            this.props.onChange(interpretation);
        }
    }

    saveInterpretationLike(interpretation, value) {
        interpretation.like(value).then(() => this.notifyChange(interpretation));
    }

    like() {
        this.saveInterpretationLike(this.props.interpretation, true);
    }

    unlike() {
        this.saveInterpretationLike(this.props.interpretation, false);
    }

    deleteInterpretation() {
        const { interpretation } = this.props;
        const { d2 } = this.context;

        if (confirm(d2.i18n.getTranslation('delete_interpretation_confirmation'))) {
            interpretation.delete().then(() => this.notifyChange(null));
        }
    }

    openInterpretationDialog() {
        this.setState({interpretationToEdit: this.props.interpretation});
    }

    closeInterpretationDialog() {
        this.setState({interpretationToEdit: null});
    }

    saveInterpretation(interpretation) {
        interpretation.save().then(() => this.notifyChange(this.props.interpretation));
    }

    saveComment(comment) {
        comment.save().then(() => this.notifyChange(this.props.interpretation));
    }

    deleteComment(comment) {
        comment.delete().then(() => this.notifyChange(this.props.interpretation));
    }

    saveInterpretationAndClose() {
        this.saveInterpretation(this.props.interpretation);
        this.closeInterpretationDialog();
    }

    render() {
        const { interpretation, extended } = this.props;
        const { interpretationToEdit } = this.state;
        const { d2 } = this.context;
        const showActions = extended;
        const showComments = extended;
        const likedBy = interpretation.likedBy || [];
        const likedByTooltip = likedBy.map(user => user.displayName).sort().join("\n");
        const currentUserLikesInterpretation = some(user => user.id === d2.currentUser.id, likedBy);

        return (
            <div>
                {interpretationToEdit &&
                    <InterpretationDialog
                        interpretation={interpretationToEdit}
                        onSave={this.saveInterpretationAndClose}
                        onClose={this.closeInterpretationDialog}
                    />
                }

                <div style={styles.interpretationDescSection}>
                    <div style={styles.interpretationName}>
                        {getUserLink(d2, interpretation.user)}

                        <span style={styles.date}>
                            <FormattedDate value={interpretation.created} day="2-digit" month="short" year="numeric" />
                        </span>
                    </div>

                    <div style={styles.interpretationText}>
                        <div>
                            <EllipsisText max={200} text={interpretation.text} />
                        </div>
                    </div>

                    <div>
                        {showActions &&
                            <div className="actions">
                                {currentUserLikesInterpretation
                                    ? <Link label={d2.i18n.getTranslation('unlike')} onClick={this.unlike} />
                                    : <Link label={d2.i18n.getTranslation('like')} onClick={this.like} />}
                                {userCanManage(d2, interpretation) &&
                                    <span className="owner-actions">
                                        <ActionSeparator />
                                        <Link label={d2.i18n.getTranslation('edit')} onClick={this.openInterpretationDialog} />
                                        <ActionSeparator />
                                        <Link label={d2.i18n.getTranslation('delete')} onClick={this.deleteInterpretation} />
                                    </span>}
                            </div>
                        }

                        <div style={styles.interpretationCommentArea}>
                            <div style={styles.likeArea}>
                                <SvgIcon icon="ThumbUp" style={styles.likeIcon} />

                                <span style={{color: "#22A"}} className="liked-by" title={likedByTooltip}>
                                    {interpretation.likes} {d2.i18n.getTranslation('people_like_this')}
                                </span>

                                <ActionSeparator />

                                {`${interpretation.comments.length} ${d2.i18n.getTranslation('people_commented')}`}
                            </div>

                            {showComments &&
                                <InterpretationComments
                                    d2={d2}
                                    interpretation={interpretation}
                                    onSave={this.saveComment}
                                    onDelete={this.deleteComment}
                                />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Interpretation.propTypes = {
    interpretation: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    extended: PropTypes.bool.isRequired,
};

Interpretation.defaultProps = {
    extended: false,
};

Interpretation.contextTypes = {
    d2: PropTypes.object.isRequired,
};

export default Interpretation;

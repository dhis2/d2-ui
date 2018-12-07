import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    card: {
        margin: 4,
        marginBottom: 6,
        position: 'relative',
    },
    actions: {
        marginTop: 0,
        marginRight: -4,
        '& button': {
            padding: theme.spacing.unit * 0.5,
        },
    },
    header: {
        padding: '4px 12px 4px 12px',
    },
    title: {
        fontSize: 15,
        fontWeight: 500,
    },
    content: {
        padding: 0,
        paddingBottom: '0 !important',
        borderTop: '1px solid lightgrey',
    },
    collapse: {
        clear: 'both',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
});

class CollapsibleCard extends React.Component {
    state = { expanded: true };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        const { classes, title, actions, children } = this.props;
        const { expanded } = this.state;

        return (
            <Card className={classes.card}>
                <CardHeader
                    title={title}
                    classes={{ root: classes.header, title: classes.title, action: classes.actions }}
                    action={
                        <Fragment>
                            {expanded ? actions : null}
                            <IconButton
                                className={classnames(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={this.handleExpandClick}
                                aria-expanded={expanded}
                                disableRipple
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </Fragment>
                    }
                />

                <Collapse in={expanded} timeout="auto" unmountOnExit className={classes.collapse}>
                    <CardContent classes={{ root: classes.content }}>{children}</CardContent>
                </Collapse>
            </Card>
        );
    }
}

CollapsibleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CollapsibleCard);

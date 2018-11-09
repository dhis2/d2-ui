import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    card: {
        maxWidth: 400,
        margin: 4,
        marginBottom: 6,
        paddingBottom: 8,
    },
    actions: {
        paddingTop: 4,
        paddingBottom: 0,
        paddingRight: 16,
        display: 'block',
        textAlign: 'right',
    },
    header: {
        float: 'left',
        paddingTop: 8,
        paddingLeft: 12,
        paddingBottom: 0,
    },
    title: {
        fontSize: 15,
        fontWeight: 500,
    },
    content: {
        padding: 0,
        paddingBottom: '4px !important',
    },
    collapse: {
        clear: 'both',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        padding: 0,
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
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
            <Card className={classes.card} raised={true}>
                <CardHeader
                    title={title}
                    classes={{ root: classes.header, title: classes.title }}
                />

                <CardActions className={classes.actions} disableActionSpacing={true}>
                    {expanded ? actions : null}

                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={expanded}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>

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

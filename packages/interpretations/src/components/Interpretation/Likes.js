import React, { Fragment, Component } from 'react';
import i18n from '@dhis2/d2-i18n';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextSeparator from '../TextSeparator/TextSeparator';
import styles from './styles/LikesAndReplies.style';

const TOOLTIP_ENTER_DELAY = 200;

export class Likes extends Component {
    constructor(props) {
        super(props);
        this.id = Math.random().toString(36);
        this.timeout = null;
        this.state = { tooltipIsOpen: false };
    };

    componentWillUnmount() {
        clearTimeout(this.id);
    };

    showTooltip = () => {
        if(this.timeout === null) {
			this.timeout = setTimeout(
				() => this.setState({ tooltipIsOpen: true }),
				TOOLTIP_ENTER_DELAY
			);
		}
    };

    hideTooltip = () => {
        if (typeof this.timeout === 'number') {
			clearTimeout(this.timeout);
			this.timeout = null;
			this.setState({ tooltipIsOpen: false });
		}
    };

    renderTooltip = () => (
        <Popper
            anchorEl={document.getElementById(this.id)}
            open={this.state.tooltipIsOpen}
            placement="top"
            style={styles.popper}
        >
            <Paper className={this.props.classes.tooltip}>
                <ul className={this.props.classes.tooltipList}>
                    {this.props.likedBy.map((userName, key) => 
                        <li key={key}> {userName} </li>
                    )}
                </ul>
            </Paper>
        </Popper>
    );

    render() {
        const { likedBy } = this.props;
        const Tooltip = this.state.tooltipIsOpen && this.renderTooltip();

        const likes = i18n.t(
            '{{count}} likes',
            {
                count: likedBy.length,
                defaultValue: '{{count}} like',
                defaultValue_plural: '{{count}} likes'
            });

        return !!likedBy.length && (
            <Fragment>
                <TextSeparator />
                <span
                    id={this.id}
                    onMouseEnter={this.showTooltip} 
                    onMouseLeave={this.hideTooltip}
                >
                    {Tooltip}
                    {likes}
                </span>
            </Fragment>
        );
    };
};

Likes.propTypes = {
    classes: PropTypes.object.isRequired,
    likedBy: PropTypes.array.isRequired,
};

export default withStyles(styles)(Likes);

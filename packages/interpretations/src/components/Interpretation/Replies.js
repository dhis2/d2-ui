import React, { Fragment, Component } from 'react';
import i18n from '@dhis2/d2-i18n';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextSeparator from '../TextSeparator/TextSeparator';
import styles from './styles/LikesAndReplies.style';

const TOOLTIP_ENTER_DELAY = 200;

export class Replies extends Component {
    constructor(props) {
        super(props);
        this.id = Math.random().toString(36);
        this.timeout = null;
        this.state = { tooltipIsOpen: null };
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

    filterDuplicateUserNames = () => {
        let listItems = [];
        this.props.repliedBy.forEach(userName => {
            if (!listItems.includes(userName)) {
                listItems = [...listItems, userName];
            }
        });

        return listItems;
    }; 

    renderTooltip = () => (
        <Popper
            placement="top"
            open={this.state.tooltipIsOpen}
            anchorEl={document.getElementById(this.id)}
        >
            <Paper className={this.props.classes.tooltip}>
                <ul className={this.props.classes.tooltipList}>
                    {this.filterDuplicateUserNames().map((userName, key) => 
                        <li key={key}> {userName} </li>
                        )}
                </ul>
            </Paper>
        </Popper>
    );

    render() {
        const { repliedBy } = this.props;
        const Tooltip = this.state.tooltipIsOpen && this.renderTooltip();

        return !!repliedBy.length && (
            <Fragment >
                <TextSeparator />
                <span
                    id={this.id}
                    onMouseEnter={this.showTooltip} 
                    onMouseLeave={this.hideTooltip}
                >
                    {Tooltip}
                    {`${repliedBy.length} ${repliedBy.length > 1 ? i18n.t('replies') : i18n.t('reply')}`}
                </span>
            </Fragment>
        );
    };
};

Replies.propTypes = {
    classes: PropTypes.object.isRequired,
    repliedBy: PropTypes.array.isRequired,
};

export default withStyles(styles)(Replies);

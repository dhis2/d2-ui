import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import styles from './styles/PeriodListItem.style';

const OFFERED_LIST = 'periods-list-offered';

const UnselectedIcon = () => <div className="unselected-icon" />;
const HighlightedIcon = () => <div className="highlighted-icon" />;
const SelectedIcon = () => <div className="selected-icon" />;

const RemoveItemButton = ({ action, isHighlighted }) => (
    <IconButton
        style={styles.removeItemButton}
        onClick={action}
    >
        <Close style={isHighlighted ? styles.highlightedClose : styles.closeIcon} />
    </IconButton>
);

RemoveItemButton.propTypes = {
    action: PropTypes.func.isRequired,
    isHighlighted: PropTypes.bool.isRequired,
};

class PeriodListItem extends Component {
    state = { isHovering: false };


    onPeriodClick = (event) => {
        this.props.onPeriodClick(this.props.period, this.props.index, event.shiftKey, event.metaKey);
    };

    onDoubleClick = () => {
        this.props.onDoubleClick(this.props.period);
    };

    onRemovePeriodClick = (event) => {
        event.stopPropagation();
        this.props.onRemovePeriodClick(this.props.period);
    };


    isOfferedList = () => this.props.listClassName === OFFERED_LIST;

    highlightItem = () => {
        this.setState({ isHovering: true });
    };

    removeHighlight = () => {
        this.setState({ isHovering: false });
    };

    renderIcon = () => {
        if (this.props.period.selected) {
            return <HighlightedIcon />;
        }

        return this.isOfferedList()
            ? <UnselectedIcon />
            : <SelectedIcon />;
    }

    renderRemoveButton = () => (
        this.isOfferedList()
            ? null
            : <RemoveItemButton isHighlighted={this.props.period.selected} action={this.onRemovePeriodClick} />
    );

    render = () => {
        const className = this.isOfferedList() ? 'period-offered-label' : 'period-selected-label';
        const Icon = this.renderIcon();
        const RemoveButton = this.renderRemoveButton();

        return (
            <li
                key={this.props.period.id}
                className="period-dimension-item"
            >
                <div
                    role="button"
                    tabIndex={0}
                    style={this.props.period.selected ? styles.highlightedContainer : {}}
                    onMouseEnter={this.highlightItem}
                    onMouseLeave={this.removeHighlight}
                    onClick={this.onPeriodClick}
                    onDoubleClick={this.onDoubleClick}
                    className={className}
                >
                    {Icon}
                    <span style={this.props.period.selected ? styles.higlightedText : {}} className="list-text">{this.props.period.name}</span>
                    {RemoveButton}
                </div>
            </li>
        );
    };
}

PeriodListItem.propTypes = {
    period: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    onRemovePeriodClick: PropTypes.func.isRequired,
    listClassName: PropTypes.string.isRequired,
};

export default PeriodListItem;

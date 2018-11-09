import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close';

const OFFERED_LIST = 'periods-list-offered';

const UnselectedIcon = () => <div className="unselected-icon" />;
const SelectedIcon = () => <div className="selected-icon" />;

const RemoveItemButton = ({ action }) => (
    <button className="remove-item-button" onClick={action} tabIndex={0}>
        <Close style={{
            outline: 'none',
            height: 13,
            width: 10,
        }}
        />
    </button>
);

class PeriodListItem extends Component {
    state = { isHovering: false };

    highlightItem = () => {
        this.setState({ isHovering: true });
    };

    removeHighlight = () => {
        this.setState({ isHovering: false });
    };

    isOfferedList = () => this.props.listClassName === OFFERED_LIST;

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

    renderIcon = () => (
        this.isOfferedList()
            ? <UnselectedIcon />
            : <SelectedIcon />
    );

    renderRemoveButton = () => (
        this.isOfferedList()
            ? null
            : <RemoveItemButton action={this.onRemovePeriodClick} />
    );

    renderLabelStyle = () => {
        if (this.state.isHovering && !this.props.period.selected) {
            return { backgroundColor: '#92C9F7' };
        } else if (this.props.period.selected) {
            return { backgroundColor: '#7EBFF5' };
        }
        return {};
    };

    render = () => {
        const className = this.isOfferedList() ? 'period-offered-label' : 'period-selected-label';
        const labelStyle = this.renderLabelStyle();
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
                    style={labelStyle}
                    onMouseEnter={this.highlightItem}
                    onMouseLeave={this.removeHighlight}
                    onClick={this.onPeriodClick}
                    onDoubleClick={this.onDoubleClick}
                    className={className}
                >
                    {Icon}
                    <span className="list-text">{this.props.period.name}</span>
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

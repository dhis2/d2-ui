import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Close } from '@material-ui/icons';

const OFFERED_LIST = 'periods-list-offered';

const UnselectedIcon = () => <div className="unselected-icon" />;
const SelectedIcon = () => <div className="selected-icon" />;

const RemoveItemButton = ({ action }) => (
    <button className="remove-item-button" onClick={action} tabIndex={0}>
        <Close style={{
            fill: 'blue',
            outline: 'none',
            height: 13,
            width: 10 }}
        />
    </button>
);

class PeriodListItem extends Component {
    onPeriodClick = (event) => {
        this.props.onPeriodClick(this.props.period, this.props.index, event.shiftKey, event.metaKey);
    };

    onDoubleClick = () => {
        this.props.onDoubleClick(this.props.period);
    }

    onRemovePeriodClick = (event) => {
        event.stopPropagation();
        this.props.onRemovePeriodClick(this.props.period);
    };

    isOfferedList = () => this.props.listClassName === OFFERED_LIST;

    renderIcon = () => (
        this.isOfferedList()
            ? <UnselectedIcon />
            : <SelectedIcon />
    );

    render = () => {
        const className = this.isOfferedList() ? 'period-offered-label' : 'period-selected-label';
        const Icon = this.renderIcon();
        const RemoveButton = this.isOfferedList()
            ? null
            : <RemoveItemButton action={this.onRemovePeriodClick} />;

        return (
            <li
                key={this.props.period.id}
                className="period-dimension-item"
            >
                <div
                    role="button"
                    tabIndex={0}
                    style={this.props.period.selected ? { backgroundColor: '#7EBFF5' } : {}}
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
    }
}

PeriodListItem.propTypes = {
    index: PropTypes.number.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    onRemovePeriodClick: PropTypes.func.isRequired,
    period: PropTypes.object.isRequired,
    listClassName: PropTypes.string.isRequired,
};

export default PeriodListItem;

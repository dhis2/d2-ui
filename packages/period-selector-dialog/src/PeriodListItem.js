import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Close } from '@material-ui/icons';

const style = {
    selecticon: {
        backgroundColor: 'blue', // color
        position: 'relative',
        top: '44%',
        height: 6,
        width: 6,
        marginRight: 5,
    },
    icon: {
        backgroundColor: 'grey', // color
        position: 'relative',
        top: '44%',
        height: 6,
        width: 6,
        marginRight: 5,
    },
    deleteButton: {
        border: 'none',
        background: 'none',
        padding: 0,
        paddingTop: 5,
        paddingLeft: 1,
        marginLeft: 5,
        width: 10,
    },
    deleteButtonIcon: {
        fill: 'blue',
        height: 13,
        width: 10,
    },
};

const OFFERED_LIST = 'periods-list-offered';

const UnselectedIcon = () => <div style={style.icon} className="unselected-icon" />;
const SelectedIcon = () => <div style={style.selecticon} />;

const RemoveItemButton = ({ action }) => (
    <button style={style.deleteButton} className="remove-item-button" onClick={action} tabIndex={0}>
        <Close style={style.deleteButtonIcon} />
    </button>
);

class PeriodListItem extends Component {
    onPeriodClick = (event) => {
        this.props.onPeriodClick(this.props.period, this.props.index, event.shiftKey, event.metaKey);
    };

    onRemovePeriodClick = () => {

    };

    getIcon = () => (
        this.props.listName === OFFERED_LIST
            ? <UnselectedIcon />
            : <SelectedIcon />
    );

    render = () => {
        const Icon = this.getIcon();
        const RemoveButton = this.props.listName === OFFERED_LIST
            ? null
            : <RemoveItemButton action={this.onPeriodClick} />;

        return (
            <li
                key={this.props.period.id}
                className="period-dimension-item"
            >
                <div
                    role="button"
                    tabIndex={0}
                    onClick={this.onPeriodClick}
                    onDoubleClick={this.onPeriodClick}
                    className={this.props.listName === OFFERED_LIST ? 'period-offered-label' : 'period-selected-label'}
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
    period: PropTypes.object.isRequired,
    listName: PropTypes.string.isRequired,
};

export default PeriodListItem;

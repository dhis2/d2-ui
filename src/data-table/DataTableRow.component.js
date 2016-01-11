import React from 'react';
import classes from 'classnames';
import {isObject} from 'd2-utils';
import moment from 'moment';

function valueTypeGuess(valueType, value) {
    switch (valueType) {
    case 'DATE':
        return moment(new Date(value)).fromNow();
    default:
        break;
    }

    return value;
}

function getValueAfterValueTypeGuess(dataSource, columnName) {
    if (dataSource && dataSource.modelDefinition && dataSource.modelDefinition.modelValidations && dataSource.modelDefinition.modelValidations[columnName]) {
        return valueTypeGuess(dataSource.modelDefinition.modelValidations[columnName].type, dataSource[columnName]);
    }

    return dataSource[columnName];
}

const DataTableRow = React.createClass({
    propTypes: {
        columns: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        dataSource: React.PropTypes.object,
        isEven: React.PropTypes.bool,
        isOdd: React.PropTypes.bool,
        itemClicked: React.PropTypes.func.isRequired,
        primaryClick: React.PropTypes.func.isRequired,
    },

    render() {
        const classList = classes(
            'data-table__rows__row',
            {
                'data-table__rows__row--even': !this.props.isOdd,
                'data-table__rows__row--odd': this.props.isOdd,
            });

        const columns = this.props.columns.map((columnName, index) => {
            const rowValue = getValueAfterValueTypeGuess(this.props.dataSource, columnName);
            let displayValue;

            if (isObject(rowValue)) {
                displayValue = rowValue.displayName || rowValue.name || rowValue;
            } else {
                displayValue = rowValue;
            }

            return (
                <div key={index} className={'data-table__rows__row__column'}>{displayValue}</div>
            );
        });

        return (
            <div className={classList} onContextMenu={this.handleContextClick} onClick={this.handleClick}>
                {columns}
            </div>
        );
    },

    handleContextClick(event) {
        event.preventDefault();
        this.props.itemClicked(event, this.props.dataSource);
    },

    handleClick() {
        this.props.primaryClick(this.props.dataSource);
    },
});

export default DataTableRow;

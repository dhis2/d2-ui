import React from 'react';
import classes from 'classnames';
import isObject from 'd2-utilizr/lib/isObject';
import moment from 'moment';
import IconButton from 'material-ui/lib/icon-button';
import MoreVert from 'material-ui/lib/svg-icons/navigation/more-vert';
import Color from './data-value/Color.component';

import Translate from '../i18n/Translate.mixin';

function valueTypeGuess(valueType, value) {
    switch (valueType) {
    case 'DATE':
        return moment(new Date(value)).fromNow();
    case 'TEXT':
        if (/#([a-z0-9]{6})$/i.test(value)) {
            return (<Color value={value} />);
        }
        return value;
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

    mixins: [Translate],

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

            if (isObject(rowValue) && (rowValue.displayName || rowValue.name)) {
                displayValue = rowValue.displayName || rowValue.name || rowValue.toString();
            } else {
                displayValue = rowValue;
            }

            // TODO: PublicAccess Hack - need to make it so that value transformers can be registered
            if (columnName === 'publicAccess') {
                const dataSource = this.props.dataSource;

                if (dataSource[columnName]) {
                    if (dataSource[columnName] === 'rw------') {
                        displayValue = this.getTranslation('public_can_edit');
                    }

                    if (dataSource[columnName] === 'r-------') {
                        displayValue = this.getTranslation('public_can_view');
                    }

                    if (dataSource[columnName] === '--------') {
                        displayValue = this.getTranslation('public_none');
                    }
                }
            }

            return (
                <div
                    key={index}
                    className={'data-table__rows__row__column'}
                    onContextMenu={this.handleContextClick}
                    onClick={this.handleClick}
                >
                    {displayValue}
                </div>
            );
        });
        return (
            <div className={classList}>
                {columns}
                <div className={'data-table__rows__row__column'} style={{width: '1%'}}>
                    <IconButton tooltip={this.getTranslation('actions')} onClick={this.iconMenuClick}>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
        );
    },

    iconMenuClick(event) {
        event && event.preventDefault() && event.stopPropagation();
        this.props.itemClicked(event, this.props.dataSource);
    },

    handleContextClick(event) {
        event && event.preventDefault();
        this.props.itemClicked(event, this.props.dataSource);
    },

    handleClick() {
        this.props.primaryClick(this.props.dataSource);
    },
});

export default DataTableRow;

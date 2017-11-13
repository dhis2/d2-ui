import React, { isValidElement } from 'react';
import PropTypes from 'prop-types';
import classes from 'classnames';
import { isObject } from 'lodash/fp';
import { isString } from 'lodash/fp';
import IconButton from 'material-ui/IconButton';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert';
import addD2Context from '../component-helpers/addD2Context';
import { findValueRenderer } from './data-value/valueRenderers';

function getD2ModelValueType(dataSource, columnName) {
    return dataSource && dataSource.modelDefinition && dataSource.modelDefinition.modelValidations && dataSource.modelDefinition.modelValidations[columnName] && dataSource.modelDefinition.modelValidations[columnName].type;
}

const DataTableRow = addD2Context(React.createClass({
    propTypes: {
        columns: PropTypes.arrayOf(PropTypes.string).isRequired,
        dataSource: PropTypes.object,
        isEven: PropTypes.bool,
        isOdd: PropTypes.bool,
        itemClicked: PropTypes.func.isRequired,
        primaryClick: PropTypes.func.isRequired,
    },

    render() {
        const classList = classes(
            'data-table__rows__row',
            {
                'data-table__rows__row--even': !this.props.isOdd,
                'data-table__rows__row--odd': this.props.isOdd,
            });

        const columns = this.props.columns.map((columnName, index) => {
            const valueDetails = {
                valueType: getD2ModelValueType(this.props.dataSource, columnName),
                value: this.props.dataSource[columnName],
                columnName,
            };

            const Value = findValueRenderer(valueDetails);

            return (
                <div
                    key={index}
                    className={'data-table__rows__row__column'}
                    onContextMenu={this.handleContextClick}
                    onClick={this.handleClick}
                >
                    <Value {...valueDetails} />
                </div>
            );
        });
        return (
            <div className={classList}>
                {columns}
                <div className={'data-table__rows__row__column'} style={{ width: '1%' }}>
                    <IconButton tooltip={this.context.d2.i18n.getTranslation('actions')} onClick={this.iconMenuClick}>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
        );
    },

    iconMenuClick(event) {
        this.props.itemClicked(event, this.props.dataSource);
    },

    handleContextClick(event) {
        event && event.preventDefault();
        this.props.itemClicked(event, this.props.dataSource);
    },

    handleClick(event) {
        this.props.primaryClick(this.props.dataSource, event);
    },
}));

export default DataTableRow;

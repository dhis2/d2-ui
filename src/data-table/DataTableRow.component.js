import React from 'react';
import classes from 'classnames';

const DataTableRow = React.createClass({
    propTypes: {
        columns: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        dataSource: React.PropTypes.object,
        isEven: React.PropTypes.bool,
        isOdd: React.PropTypes.bool,
        itemClicked: React.PropTypes.func.isRequired,
    },

    render() {
        const classList = classes(
            'data-table__rows__row',
            {
                'data-table__rows__row--even': !this.props.isOdd,
                'data-table__rows__row--odd': this.props.isOdd,
            });

        const columns = this.props.columns.map((columnName, index) => {
            return (
                <div key={index} className={'data-table__rows__row__column'}>{this.props.dataSource[columnName]}</div>
            );
        });

        return (
            <div className={classList} onContextMenu={this.handleContextClick}>
                {columns}
            </div>
        );
    },

    handleContextClick(event) {
        event.preventDefault();
        this.props.itemClicked(event, this.props.dataSource);
    },
});

export default DataTableRow;

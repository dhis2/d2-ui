import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isArrayOfStrings from 'd2-utilizr/lib/isArrayOfStrings';
import isIterable from 'd2-utilizr/lib/isIterable';

import TableHeader from './TableHeader.component';
import TableRow from './TableRow.component';
import TableContextMenu from './TableContextMenu.component';

class Table extends Component {
    state = this.getStateFromProps(this.props);

    componentWillReceiveProps(newProps) {
        this.setState(this.getStateFromProps(newProps));
    }

    getStateFromProps(props) {
        let dataRows = [];

        if (isIterable(props.rows)) {
            dataRows = props.rows instanceof Map ? Array.from(props.rows.values()) : props.rows;
        }

        return {
            columns: isArrayOfStrings(props.columns) ? props.columns : ['name', 'lastUpdated'],
            dataRows,
            activeRow: undefined,
        };
    }

    handleRowClick = (event, rowSource) => {
        const cmt = event.currentTarget;
        this.setState(state => ({
            contextMenuTarget: cmt,
            showContextMenu: true,
            activeRow: rowSource !== state.activeRow ? rowSource : undefined,
        }));
    };

    hideContextMenu = () => {
        this.setState({
            activeRow: undefined,
            showContextMenu: false,
        });
    };

    hasContextMenu = () => {
        return Object.keys(this.props.contextMenuActions || {}).length > 1;
    };

    hasSingleAction = () => {
        return Object.keys(this.props.contextMenuActions || {}).length === 1;
    };

    renderRows() {
        return this.state.dataRows
            .map((dataRowsSource, dataRowsId) => (
                <TableRow
                    key={dataRowsId}
                    dataSource={dataRowsSource}
                    columns={this.state.columns}
                    isActive={this.state.activeRow === dataRowsId}
                    itemClicked={this.handleRowClick}
                    primaryClick={this.props.primaryAction || (() => { })}
                    contextMenuActions={this.props.contextMenuActions}
                    contextMenuIcons={this.props.contextMenuIcons}
                />
            ));
    }

    renderHeaders() {
        return this.state.columns.map((headerName, index) => (
            <TableHeader key={headerName} isOdd={Boolean(index % 2)} name={headerName} />
        ));
    }

    renderContextMenu() {
        const actionAccessChecker = (this.props.isContextActionAllowed && this.props.isContextActionAllowed.bind(null, this.state.activeRow)) || (() => true);

        const actionsToShow = Object.keys(this.props.contextMenuActions || {})
            .filter(actionAccessChecker)
            .reduce((availableActions, actionKey) => {
                availableActions[actionKey] = this.props.contextMenuActions[actionKey]; // eslint-disable-line
                return availableActions;
            }, {});

        return (
            <TableContextMenu
                target={this.state.contextMenuTarget}
                onRequestClose={this.hideContextMenu}
                actions={actionsToShow}
                activeItem={this.state.activeRow}
                icons={this.props.contextMenuIcons}
            />
        );
    }

    render() {
        return (
            <div className="data-table">
                <div className="data-table__headers">
                    {this.renderHeaders()}
                    { (this.hasContextMenu() || this.hasSingleAction()) &&
                        <TableHeader />
                    }
                </div>
                <div className="data-table__rows">
                    {this.renderRows()}
                </div>
                { this.hasContextMenu() &&
                    this.renderContextMenu()
                }
            </div>
        );
    }
}

Table.propTypes = {
    contextMenuActions: PropTypes.object,
    contextMenuIcons: PropTypes.object,
    primaryAction: PropTypes.func,
    isContextActionAllowed: PropTypes.func,
};

export default Table;

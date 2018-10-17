import React from 'react';
import { connect } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import ActionsMenu from './ActionsMenu';

import {
    changePage,
    setRowsPerPage,
    sortData,
    toggleActionsMenu,
    setActionsMenuAnchorEl,
    selectFavorite,
} from './actions';

const Time = ({ date }) => {
    const d = new Date(date);
    const time = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${(
        '0' + d.getDate()
    ).slice(-2)}`;

    return <time dateTime={d.toISOString()}>{time}</time>;
};

const EnhancedTableHead = props => {
    const { order, column, sortData } = props;
    // TODO i18n on labels
    const columns = [
        { id: 'displayName', label: 'Name' },
        { id: 'created', label: 'Created' },
        { id: 'lastUpdated', label: 'Last updated' },
    ];

    const createSortHandler = column => event => {
        sortData(event, column);
    };

    return (
        <TableHead>
            <TableRow>
                {columns.map(c => {
                    return (
                        <TableCell key={c.id}>
                            <TableSortLabel
                                active={column === c.id}
                                direction={order}
                                onClick={createSortHandler(c.id)}
                            >
                                {c.label}
                            </TableSortLabel>
                        </TableCell>
                    );
                })}
                <TableCell />
            </TableRow>
        </TableHead>
    );
};

const EnhancedTable = props => {
    const {
        data,
        rowsPerPage,
        totalRecords,
        page,
        changePage,
        order,
        column,
        sortData,
        toggleActionsMenu,
        setActionsMenuAnchorEl,
        selectFavorite,

        onFavoriteSelect,
        onFavoriteRename,
        onFavoriteDelete,
    } = props;

    const actionsMenuHandler = model => event => {
        selectFavorite(model);
        setActionsMenuAnchorEl(event.currentTarget);
        toggleActionsMenu();
    };

    const clickHandler = id => event => {
        onFavoriteSelect(id);
    };

    return (
        <div>
            <Table>
                <EnhancedTableHead order={order} column={column} sortData={sortData} />
                <TableBody>
                    {data.map(favorite => {
                        return (
                            <TableRow hover={true} key={favorite.id}>
                                <TableCell
                                    padding="dense"
                                    onClick={clickHandler(favorite.id)}
                                    style={{ width: '60%', cursor: 'pointer' }}
                                >
                                    {favorite.displayName}
                                </TableCell>
                                <TableCell padding="dense">
                                    <Time date={favorite.created} />
                                </TableCell>
                                <TableCell padding="dense">
                                    <Time date={favorite.lastUpdated} />
                                </TableCell>
                                <TableCell padding="dense">
                                    {favorite.access.update &&
                                    favorite.access.manage &&
                                    favorite.access.delete ? (
                                        <Tooltip title="Actions" placement="bottom">
                                            <IconButton onClick={actionsMenuHandler(favorite)}>
                                                <MoreVertIcon />
                                            </IconButton>
                                        </Tooltip>
                                    ) : (
                                        <IconButton disabled>
                                            <MoreVertIcon color="disabled" />
                                        </IconButton>
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            count={totalRecords}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={changePage}
                            //onChangeRowsPerPage={setRowsPerPage}
                            //rowsPerPageOptions={[5, 10, 15, 20]}
                            rowsPerPageOptions={[]}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
            <ActionsMenu onFavoriteRename={onFavoriteRename} onFavoriteDelete={onFavoriteDelete} />
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    order: state.sorting.order,
    column: state.sorting.column,
    page: state.pagination.page,
    rowsPerPage: state.pagination.rowsPerPage,
    totalRecords: state.data.totalRecords,
    data: state.data.records,
});

const mapDispatchToProps = {
    setRowsPerPage,
    changePage,
    sortData,
    toggleActionsMenu,
    setActionsMenuAnchorEl,
    selectFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTable);

import React from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

import i18n from '@dhis2/d2-i18n';

import BarIcon from './icons/BarIcon';
import StackedBarIcon from './icons/StackedBarIcon';
import ColumnIcon from './icons/ColumnIcon';
import StackedColumnIcon from './icons/StackedColumnIcon';
import LineIcon from './icons/LineIcon';
import AreaIcon from './icons/AreaIcon';
import PieIcon from './icons/PieIcon';
import RadarIcon from './icons/RadarIcon';
import GaugeIcon from './icons/GaugeIcon';
import YearOverYearLineIcon from './icons/YearOverYearLineIcon';
import YearOverYearColumnIcon from './icons/YearOverYearColumnIcon';
import SingleValueIcon from './icons/SingleValueIcon';
import PivotTableIcon from './icons/PivotTableIcon';

import { changePage, setRowsPerPage, sortData, selectFavorite } from './actions';

const visTypeMap = {
    BAR: { label: i18n.t('Bar'), icon: BarIcon },
    STACKED_BAR: { label: i18n.t('Stacked bar'), icon: StackedBarIcon },
    COLUMN: { label: i18n.t('Column'), icon: ColumnIcon },
    STACKED_COLUMN: { label: i18n.t('Stacked column'), icon: StackedColumnIcon },
    LINE: { label: i18n.t('Line'), icon: LineIcon },
    AREA: { label: i18n.t('Area'), icon: AreaIcon },
    PIE: { label: i18n.t('Pie'), icon: PieIcon },
    RADAR: { label: i18n.t('Radar'), icon: RadarIcon },
    GAUGE: { label: i18n.t('Gauge'), icon: GaugeIcon },
    YEAR_OVER_YEAR_LINE: { label: i18n.t('Year over year (line)'), icon: YearOverYearLineIcon },
    YEAR_OVER_YEAR_COLUMN: { label: i18n.t('Year over year (column)'), icon: YearOverYearColumnIcon },
    SINGLE_VALUE: { label: i18n.t('Single value'), icon: SingleValueIcon },
    PIVOT_TABLE: { label: i18n.t('Pivot table'), icon: PivotTableIcon },
};

const Time = ({ date }) => {
    const d = new Date(date);
    const time = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${(
        '0' + d.getDate()
    ).slice(-2)}`;

    return <time dateTime={d.toISOString()}>{time}</time>;
};

const EnhancedTableHead = props => {
    const { order, column, sortData } = props;
    const columns = [
        { id: 'displayName', label: i18n.t('Name') },
        { id: 'type', label: i18n.t('Type') },
        { id: 'created', label: i18n.t('Created') },
        { id: 'lastUpdated', label: i18n.t('Last updated') },
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
        onFavoriteSelect,
    } = props;

    const clickHandler = id => event => {
        onFavoriteSelect(id);
    };

    return (
        <div>
            <Table>
                <EnhancedTableHead order={order} column={column} sortData={sortData} />
                <TableBody>
                    {data.map(favorite => {
                        const visType = visTypeMap[favorite.type];

                        return (
                            <TableRow hover={true} key={favorite.id}>
                                <TableCell
                                    padding="dense"
                                    onClick={clickHandler(favorite.id)}
                                    style={{ width: '60%', cursor: 'pointer' }}
                                >
                                    {favorite.displayName}
                                </TableCell>
                                <TableCell
                                    padding="dense">
                                    <Tooltip title={visType.label}>
                                        {visType.icon}
                                    </Tooltip>
                                </TableCell>
                                <TableCell padding="dense">
                                    <Time date={favorite.created} />
                                </TableCell>
                                <TableCell padding="dense">
                                    <Time date={favorite.lastUpdated} />
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
    selectFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTable);

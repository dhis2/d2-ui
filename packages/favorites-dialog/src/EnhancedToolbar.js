import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';

import i18n from '@dhis2/d2-i18n';
import { filterData, searchData } from './actions';
import {
    CHART,
    PIVOT_TABLE,
    COLUMN,
    getVisTypeLabel,
    visTypeIcons,
} from './visTypes';

const toolbarStyles = () => ({
    search: {
        flex: '0 0 auto',
    },
    spacer: {
        flex: '1 1 100%',
    },
    filter: {
        marginLeft: 8,
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
    },
    menuIcon: {
        marginRight: 8,
        height: 16,
    },
});

const VisTypeFilterMenuItem = withStyles(toolbarStyles)(
    ({ classes, type, icon = undefined, label = undefined }) => (
        <span className={classes.menuItem}>
            <span className={classes.menuIcon}>
                {icon || visTypeIcons[type]}
            </span>
            {label || getVisTypeLabel(type)}
        </span>
    )
);

const EnhancedToolbar = (props) => {
    const {
        classes,
        createdByValue,
        searchValue,
        visTypeValue,
        searchData,
        filterData,
        showTypeFilter,
    } = props;

    return (
        <Toolbar>
            <TextField
                type="search"
                label={i18n.t('Search by name')}
                className={classes.search}
                value={searchValue}
                onChange={searchData}
            />

            <div className={classes.spacer} />
            <Fragment>
                {showTypeFilter ? (
                    <Select
                        className={classes.filter}
                        disableUnderline
                        value={visTypeValue}
                        onChange={(event) =>
                            filterData('visType', event.target.value)
                        }
                    >
                        <MenuItem value="all">{i18n.t('All types')}</MenuItem>
                        <Divider />
                        <MenuItem value={CHART}>
                            <VisTypeFilterMenuItem
                                type={CHART}
                                icon={visTypeIcons[COLUMN]}
                                label={i18n.t('All chart types')}
                            />
                        </MenuItem>
                        <MenuItem value={PIVOT_TABLE}>
                            <VisTypeFilterMenuItem type={PIVOT_TABLE} />
                        </MenuItem>
                        <Divider />
                        {Object.keys(visTypeIcons)
                            .filter((type) => type !== PIVOT_TABLE)
                            .map((type) => (
                                <MenuItem key={type} value={type}>
                                    <VisTypeFilterMenuItem type={type} />
                                </MenuItem>
                            ))}
                    </Select>
                ) : null}
                <Select
                    className={classes.filter}
                    disableUnderline
                    value={createdByValue}
                    onChange={(event) =>
                        filterData('owner', event.target.value)
                    }
                >
                    <MenuItem value="all">{i18n.t('All owners')}</MenuItem>
                    <MenuItem value="byme">{i18n.t('Created by you')}</MenuItem>
                    <MenuItem value="byothers">
                        {i18n.t('Created by others')}
                    </MenuItem>
                </Select>
            </Fragment>
        </Toolbar>
    );
};

const mapStateToProps = (state) => ({
    createdByValue: state.filtering.createdByValue,
    searchValue: state.filtering.searchValue,
    visTypeValue: state.filtering.visTypeValue,
});

const mapDispatchToProps = {
    searchData,
    filterData,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(toolbarStyles)(EnhancedToolbar));

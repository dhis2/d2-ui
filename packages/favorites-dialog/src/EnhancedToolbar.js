import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";

import i18n from '@dhis2/d2-i18n';
import { filterData, searchData } from "./actions";
import visTypeMap from './visTypes';

const toolbarStyles = () => ({
    search: {
        flex: "0 0 auto"
    },
    spacer: {
        flex: "1 1 100%"
    },
    filter: {
        marginLeft: 8
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center'
    },
    menuIcon: {
        marginRight: 8,
        height: 16
    },
});

const EnhancedToolbar = props => {
    const {
        classes,
        createdByValue,
        searchValue,
        visTypeValue,
        searchData,
        filterData,
        showTypeFilter
    } = props;

    return (
        <Toolbar>
            <TextField
                type="search"
                label={i18n.t("Search by name")}
                className={classes.search}
                value={searchValue}
                onChange={searchData}
            />

            <div className={classes.spacer} />
                <Fragment>
                    {showTypeFilter ?
                        <Select
                            className={classes.filter}
                            disableUnderline
                            value={visTypeValue}
                            onChange={event => filterData('visType', event.target.value)}
                        >
                            <MenuItem value="all">{i18n.t('All types')}</MenuItem>
                            {Object.entries(visTypeMap).map(([ key, value ]) => <MenuItem key={key} value={key}><span className={classes.menuItem}><span className={classes.menuIcon}>{value.icon}</span> {value.label}</span></MenuItem>)}
                        </Select> : null
                    }
                    <Select
                        className={classes.filter}
                        disableUnderline
                        value={createdByValue}
                        onChange={event => filterData('owner', event.target.value)}
                    >
                        <MenuItem value="all">{i18n.t('All owners')}</MenuItem>
                        <MenuItem value="byme">{i18n.t('Created by you')}</MenuItem>
                        <MenuItem value="byothers">{i18n.t('Created by others')}</MenuItem>
                    </Select>
                </Fragment>
        </Toolbar>
    );
}

const mapStateToProps = state => ({
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

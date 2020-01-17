import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";

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
        flex: "0 0 auto"
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center'
    },
    menuIcon: {
        marginRight: 8
    }
});

class EnhancedToolbar extends Component {
    state = {
        filterTooltipOpen: false
    };

    showFilterTooltip = () => {
        this.setState({ filterTooltipOpen: true });
    };
    hideFilterTooltip = () => {
        this.setState({ filterTooltipOpen: false });
    };

    render() {
        const {
            classes,
            createdByValue,
            searchValue,
            visTypeValue,
            searchData,
            filterData
        } = this.props;

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
                <Tooltip
                    className={classes.filter}
                    title={i18n.t("Filter list")}
                    open={this.state.filterTooltipOpen}
                >
                    <Fragment>
                        <Select
                            disableUnderline
                            value={visTypeValue}
                            onChange={event => filterData('visType', event.target.value)}
                            onMouseEnter={this.showFilterTooltip}
                            onMouseLeave={this.hideFilterTooltip}
                            MenuProps={{
                                onEnter: this.hideFilterTooltip
                            }}
                        >
                            <MenuItem value="all">{i18n.t('All types')}</MenuItem>
                            {Object.entries(visTypeMap).map(([ key, value ]) => <MenuItem value={key}><span className={classes.menuItem}><span className={classes.menuIcon}>{value.icon}</span> {value.label}</span></MenuItem>)}
                        </Select>
                        <Select
                            disableUnderline
                            value={createdByValue}
                            onChange={event => filterData('owner', event.target.value)}
                            onMouseEnter={this.showFilterTooltip}
                            onMouseLeave={this.hideFilterTooltip}
                            MenuProps={{
                                onEnter: this.hideFilterTooltip
                            }}
                        >
                            <MenuItem value="all">{i18n.t('All owners')}</MenuItem>
                            <MenuItem value="byme">{i18n.t('Created by me')}</MenuItem>
                            <MenuItem value="byothers">{i18n.t('Created by others')}</MenuItem>
                        </Select>
                    </Fragment>
                </Tooltip>
            </Toolbar>
        );
    }
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

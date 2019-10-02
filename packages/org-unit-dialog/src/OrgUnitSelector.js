import React, { Component, Fragment } from 'react';
import { OrgUnitTreeMultipleRoots } from '@dhis2/d2-ui-org-unit-tree';
import i18n from '@dhis2/d2-i18n';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './styles/OrgUnitSelector.style';
import UserOrgUnitsPanel from './UserOrgUnitsPanel';
import removeLastPathSegment from './util';
import GridControl from './GridControl';

class OrgUnitSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuAnchorElement: null,
            children: null,
            loadingChildren: false,
            initiallyExpanded: this.props.selected.map(ou =>
                removeLastPathSegment(ou.path)
            ),
        };
    }

    componentDidUpdate(prevProps) {
        // if props.selected.length changed by more than 1, then another analytic object was selected
        if (
            Math.abs(prevProps.selected.length - this.props.selected.length) > 1
        ) {
            // In this case refresh expanded org units
            // eslint-disable-next-line
            this.setState({
                initiallyExpanded: this.props.selected.map(ou =>
                    removeLastPathSegment(ou.path)
                ),
            });
        } else {
            // If props.selected.length changed by 1 or didnt change
            // then check if analytic object was changed by comparing ids
            // if more than 1 ids are different, then and we should refresh expanded org units
            let counter = 0;

            const orgUnits =
                prevProps.selected.length < this.props.selected.length
                    ? prevProps.selected
                    : this.props.selected;

            for (let i = 0; i < orgUnits.length; ++i) {
                if (prevProps.selected[i].id !== this.props.selected[i].id) {
                    counter += 1;

                    if (counter > 1) {
                        // eslint-disable-next-line
                        this.setState({
                            initiallyExpanded: this.props.selected.map(ou =>
                                removeLastPathSegment(ou.path)
                            ),
                        });

                        break;
                    }
                }
            }
        }
    }

    onExpand = orgUnit => {
        this.setState({
            initiallyExpanded: [...this.state.initiallyExpanded, orgUnit.path],
        });
    };

    onCollapse = orgUnit => {
        this.setState({
            // Clear all org units which are children of collapsed org unit
            initiallyExpanded: this.state.initiallyExpanded.filter(
                path => !path.includes(orgUnit.id)
            ),
        });
    };

    onContextMenuClick = (event, orgUnit, hasChildren, loadChildren) => {
        if (!hasChildren) {
            return;
        }

        this.setState(
            {
                menuAnchorElement: event.currentTarget,
                loadingChildren: true,
            },
            () => {
                loadChildren().then(children => {
                    this.setState({
                        children: Array.isArray(children)
                            ? children
                            : children.toArray(),
                        loadingChildren: false,
                    });
                });
            }
        );
    };

    normalizeOptions = (result, item) => ({ ...result, [item.id]: item });

    selectChildren = () => {
        this.closeContextMenu();

        this.props.handleMultipleOrgUnitsSelect(this.state.children);
    };

    closeContextMenu = () => {
        this.setState({ menuAnchorElement: null });
    };

    renderGroupOptions = selected => {
        if (this.props.groupOptions.length > 0) {
            const options = this.props.groupOptions.reduce(
                this.normalizeOptions,
                {}
            );

            return selected
                .filter(id => options[id])
                .map(id => options[id].displayName)
                .join(', ');
        }

        return '';
    };

    renderLevelOptions = selected => {
        if (this.props.levelOptions.length > 0) {
            const options = this.props.levelOptions.reduce(
                this.normalizeOptions,
                {}
            );

            return selected
                .filter(id => options[id])
                .map(id => options[id].displayName)
                .join(', ');
        }

        return '';
    };

    renderOptionsPanel = () => (
        <div style={styles.footer}>
            <Grid container>
                <GridControl
                    label={i18n.t('Level')}
                    placeholder={i18n.t('Select a level')}
                    value={this.props.level}
                    onChange={this.props.onLevelChange}
                    options={this.props.levelOptions}
                    disabled={this.props.userOrgUnits.length > 0}
                    renderValue={this.renderLevelOptions}
                    multiple
                />
                <GridControl
                    label={i18n.t('Group')}
                    placeholder={i18n.t('Select a group')}
                    value={this.props.group}
                    onChange={this.props.onGroupChange}
                    options={this.props.groupOptions}
                    disabled={this.props.userOrgUnits.length > 0}
                    renderValue={this.renderGroupOptions}
                    multiple
                />
            </Grid>
        </div>
    );

    render = () => {
        const tooltipStyles = {
            ...styles.orgUnitsContainer.tooltip,
            backgroundColor: this.props.deselectAllTooltipBackgroundColor,
            color: this.props.deselectAllTooltipFontColor,
        };

        return (
            <Fragment>
                <div style={styles.orgUnitsContainer}>
                    <div style={styles.scrollableContainer.index}>
                        <UserOrgUnitsPanel
                            selected={this.props.selected}
                            styles={styles.userOrgUnits}
                            userOrgUnits={this.props.userOrgUnits}
                            handleUserOrgUnitClick={
                                this.props.handleUserOrgUnitClick
                            }
                            checkboxColor={this.props.checkboxColor}
                        />
                        <div
                            style={styles.scrollableContainer.overlayContainer}
                        >
                            {this.props.userOrgUnits.length > 0 && (
                                <div
                                    style={styles.scrollableContainer.overlay}
                                />
                            )}
                            <OrgUnitTreeMultipleRoots
                                roots={this.props.roots}
                                root={this.props.root}
                                selected={this.props.selected.map(
                                    orgUnit => orgUnit.path
                                )}
                                initiallyExpanded={this.state.initiallyExpanded}
                                onSelectClick={this.props.handleOrgUnitClick}
                                onExpand={this.onExpand}
                                onCollapse={this.onCollapse}
                                onContextMenuClick={this.onContextMenuClick}
                                treeStyle={styles.orgUnitTree.treeStyle}
                                labelStyle={styles.orgUnitTree.labelStyle}
                                selectedLabelStyle={
                                    styles.orgUnitTree.selectedLabelStyle
                                }
                                checkboxColor={this.props.checkboxColor}
                                displayNameProperty={
                                    this.props.displayNameProperty
                                }
                                showFolderIcon
                                disableSpacer
                            />
                            <Menu
                                anchorEl={this.state.menuAnchorElement}
                                open={Boolean(this.state.menuAnchorElement)}
                                onClose={this.closeContextMenu}
                            >
                                <MenuItem
                                    onClick={this.selectChildren}
                                    disabled={this.state.loadingChildren}
                                    dense
                                >
                                    {i18n.t('Select children')}
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                    <div style={styles.orgUnitsContainer.tooltipContainer}>
                        {this.props.selected.length > 0 && (
                            <div style={tooltipStyles}>
                                {this.props.selected.length}{' '}
                                {i18n.t('selected')} -
                                <button
                                    onClick={this.props.onDeselectAllClick}
                                    style={
                                        styles.orgUnitsContainer.tooltip.link
                                    }
                                >
                                    {i18n.t('Deselect all')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div>{this.renderOptionsPanel()}</div>
            </Fragment>
        );
    };
}

OrgUnitSelector.propTypes = {
    /**
     * Display name property taken from user settings
     */
    displayNameProperty: PropTypes.string,

    /**
     * Array of objects with required param id
     */
    selected: PropTypes.array,

    /**
     * Array of user organisation units
     * See userOrgUnits.js for static options
     */
    userOrgUnits: PropTypes.array,

    /**
     * Level multiselect array of ids
     */
    level: PropTypes.array,

    /**
     * Group multiselect array of ids
     */
    group: PropTypes.array,

    /**
     * Org unit level options.
     */
    levelOptions: PropTypes.array,

    /**
     * Org unit groups options.
     */
    groupOptions: PropTypes.array,

    /**
     * Setter function for level multiselect value
     */
    onLevelChange: PropTypes.func.isRequired,

    /**
     * Setter for group multiselect value
     */
    onGroupChange: PropTypes.func.isRequired,

    /**
     * On deselect all click handler
     */
    onDeselectAllClick: PropTypes.func.isRequired,

    /**
     * Function for handling multiple org units select
     */
    handleMultipleOrgUnitsSelect: PropTypes.func.isRequired,

    /**
     * Callback handler for selecting orgunit
     * Arguments supplied in callback: event, orgunit
     */
    handleOrgUnitClick: PropTypes.func.isRequired,

    /**
     * Callback handler for selecting user orgunit
     * Arguments supplied in callback: event, checked
     */
    handleUserOrgUnitClick: PropTypes.func.isRequired,

    /**
     * Root organisation units whenever multiple roots are available
     */
    roots: PropTypes.array,

    /**
     * Root organisation unit
     */
    root: PropTypes.object.isRequired,

    /**
     * Font color for text in deselect all tooltip
     */
    deselectAllTooltipFontColor: PropTypes.string,

    /**
     * Font color for background in deselect all tooltip
     */
    deselectAllTooltipBackgroundColor: PropTypes.string,

    /**
     * Checkbox color in org unit tree
     */
    checkboxColor: PropTypes.string,
};

OrgUnitSelector.defaultProps = {
    displayNameProperty: 'displayName',
    selected: [],
    userOrgUnits: [],
    level: [],
    group: [],
    levelOptions: [],
    groupOptions: [],
    checkboxColor: 'primary',
    deselectAllTooltipFontColor: 'white',
    deselectAllTooltipBackgroundColor: 'gray',
};

export default OrgUnitSelector;

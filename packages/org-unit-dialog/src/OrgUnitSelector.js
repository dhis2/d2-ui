import React, { Component, Fragment } from 'react';
import { OrgUnitTree } from '@dhis2/d2-ui-org-unit-tree';
import Grid from '@material-ui/core/Grid/Grid';
import i18n from '@dhis2/d2-i18n';
import PropTypes from 'prop-types';
import styles from './styles/OrgUnitSelector.style';
import UserOrgUnitsPanel from './UserOrgUnitsPanel';
import removeLastPathSegment from './util';
import GridControl from './GridControl';

class OrgUnitSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initiallyExpanded: this.props.selected.map(ou => removeLastPathSegment(ou.path)),
        };
    }

    componentDidUpdate(prevProps) {
        // if props.selected.length changed by more than 1, then another analytic object was selected
        if (Math.abs(prevProps.selected.length - this.props.selected.length) > 1) {
            // In this case refresh expanded org units
            // eslint-disable-next-line
            this.setState({
                initiallyExpanded: this.props.selected.map(ou => removeLastPathSegment(ou.path)),
            });
        } else {
            // If props.selected.length changed by 1 or didnt change
            // then check if analytic object was changed by comparing ids
            // if more than 1 ids are different, then and we should refresh expanded org units
            let counter = 0;

            const orgUnits = prevProps.selected.length < this.props.selected.length
                ? prevProps.selected
                : this.props.selected;

            for (let i = 0; i < orgUnits.length; ++i) {
                if (prevProps.selected[i].id !== this.props.selected[i].id) {
                    counter += 1;

                    if (counter > 1) {
                        // eslint-disable-next-line
                        this.setState({
                            initiallyExpanded: this.props.selected.map(ou => removeLastPathSegment(ou.path)),
                        });

                        break;
                    }
                }
            }
        }
    }

    onExpand = (orgUnit) => {
        this.setState({
            initiallyExpanded: [
                ...this.state.initiallyExpanded,
                orgUnit.path,
            ],
        });
    };

    onCollapse = (orgUnit) => {
        this.setState({
            // Clear all org units which are children of collapsed org unit
            initiallyExpanded: this.state.initiallyExpanded.filter(path => !path.includes(orgUnit.id)),
        });
    };

    normalizeOptions = (result, item) => ({ ...result, [item.id]: item });

    renderGroupOptions = (selected) => {
        if (this.props.groupOptions.length > 0) {
            const options = this.props.groupOptions.reduce(this.normalizeOptions, {});

            return selected
                .filter(id => options[id])
                .map(id => options[id].displayName)
                .join(', ');
        }

        return '';
    };

    renderLevelOptions = (selected) => {
        if (this.props.levelOptions.length > 0) {
            const options = this.props.levelOptions.reduce(this.normalizeOptions, {});

            return selected
                .filter(id => options[id])
                .map(id => options[id].displayName)
                .join(', ');
        }

        return '';
    };

    renderOptionsPanel = () => (
        <div style={styles.footer.index}>
            <Grid
                style={styles.footer.gridContainer}
                container
            >
                <GridControl
                    id="level-select"
                    title={i18n.t('Level')}
                    value={this.props.level}
                    onChange={this.props.onLevelChange}
                    options={this.props.levelOptions}
                    disabled={this.props.userOrgUnits.length > 0}
                    renderValue={this.renderLevelOptions}
                    multiple
                />
                <GridControl
                    id="group-select"
                    title={i18n.t('Group')}
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

    render = () => (
        <Fragment>
            <div style={styles.orgUnitsContainer}>
                <div style={styles.scrollableContainer.index}>
                    <div style={styles.userOrgUnits.index}>
                        <UserOrgUnitsPanel
                            styles={styles.userOrgUnits}
                            userOrgUnits={this.props.userOrgUnits}
                            handleUserOrgUnitClick={this.props.handleUserOrgUnitClick}
                        />
                    </div>
                    <div style={styles.scrollableContainer.overlayContainer}>
                        {this.props.userOrgUnits.length > 0 && (
                            <div style={styles.scrollableContainer.overlay} />
                        )}
                        <OrgUnitTree
                            root={this.props.root}
                            selected={this.props.selected.map(orgUnit => orgUnit.path)}
                            initiallyExpanded={this.state.initiallyExpanded}
                            onSelectClick={this.props.handleOrgUnitClick}
                            onExpand={this.onExpand}
                            onCollapse={this.onCollapse}
                            treeStyle={styles.orgUnitTree.treeStyle}
                            labelStyle={styles.orgUnitTree.labelStyle}
                            selectedLabelStyle={styles.orgUnitTree.selectedLabelStyle}
                            checkboxColor={this.props.checkboxColor}
                            showFolderIcon
                            disableSpacer
                        />
                    </div>
                </div>
                <div style={styles.orgUnitsContainer.tooltipContainer}>
                    {this.props.selected.length > 0 && (
                        <div style={styles.orgUnitsContainer.tooltip}>
                            {this.props.selected.length} {i18n.t('selected')}.
                            <button
                                onClick={this.props.onDeselectAllClick}
                                style={styles.orgUnitsContainer.tooltip.link}
                            >
                                {i18n.t('Deselect all')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div>{this.renderOptionsPanel()}</div>
        </Fragment>
    )
}

OrgUnitSelector.propTypes = {
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
     * Root organisation unit
     */
    root: PropTypes.object.isRequired,

    /**
     * Checkbox color in org unit tree
     */
    checkboxColor: PropTypes.string,
};

OrgUnitSelector.defaultProps = {
    selected: [],
    userOrgUnits: [],
    level: [],
    group: [],
    levelOptions: [],
    groupOptions: [],
    checkboxColor: 'primary',
};

export default OrgUnitSelector;

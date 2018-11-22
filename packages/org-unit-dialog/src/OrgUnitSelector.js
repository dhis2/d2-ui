import React, { Component, Fragment } from 'react';
import { OrgUnitTree } from '@dhis2/d2-ui-org-unit-tree';
import Grid from '@material-ui/core/Grid/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import i18n from '@dhis2/d2-i18n';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select/Select';
import styles from './styles/OrgUnitDialog.style';
import UserOrgUnitsPanel from './UserOrgUnitsPanel';
import removeLastPathSegment from './util';

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
            <div style={styles.footer.tooltipContainer}>
                {this.props.selected.length > 0 && (
                    <div style={styles.footer.tooltip}>
                        {this.props.selected.length} selected.
                        <a
                            onClick={this.props.onDeselectAllClick}
                            style={styles.footer.tooltip.link}
                            // eslint-disable-next-line
                            href="javascript:void(0)"
                        >
                            Deselect all
                        </a>
                    </div>
                )}
            </div>
            <Grid style={styles.footer.gridContainer} container>
                <Grid
                    item
                    xs={4}
                    style={styles.footer.gridContainer.gridItem}
                >
                    <FormControl style={{ width: '100%' }}>
                        <InputLabel htmlFor="level-select">{i18n.t('Level')}</InputLabel>
                        <Select
                            value={this.props.level}
                            onChange={this.props.onLevelChange}
                            input={<Input id="level-select" />}
                            renderValue={this.renderLevelOptions}
                            disabled={this.props.userOrgUnits.length > 0}
                            fullWidth
                            multiple
                        >
                            {this.props.levelOptions.map(option => (
                                <MenuItem key={option.id} value={option.id}>{option.displayName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={4}
                    style={styles.footer.gridContainer.gridItem}
                >
                    <FormControl style={{ width: '100%' }}>
                        <InputLabel htmlFor="group">{i18n.t('Group')}</InputLabel>
                        <Select
                            value={this.props.group}
                            onChange={this.props.onGroupChange}
                            input={<Input name="group" id="group" />}
                            renderValue={this.renderGroupOptions}
                            disabled={this.props.userOrgUnits.length > 0}
                            multiple
                            displayEmpty
                            fullWidth
                        >
                            {this.props.groupOptions.map(option => (
                                <MenuItem key={option.id} value={option.id}>{option.displayName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
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

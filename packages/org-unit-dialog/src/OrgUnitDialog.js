import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { OrgUnitTree } from '@dhis2/d2-ui-org-unit-tree';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import UserOrgUnitsPanel from './UserOrgUnitsPanel';
import { removeLastPathSegment } from './util';

const styles = {
    orgUnitsContainer: {
        border: '1px solid #dedede',
    },
    scrollableContainer: {
        index: {
            height: '400px',
            overflowY: 'auto',
        },
        overlayContainer: {
            position: 'relative',
            paddingLeft: 20,
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 10,
            backgroundColor: 'rgba(255,255,255, 0.8)',
        },
    },
    orgUnitTree: {
        selectedLabelStyle: {
            fontWeight: 400,
            fontSize: 14,
            color: 'inherit',
        },
        labelStyle: {
            fontSize: 14,
            fontWeight: 400,

            checkbox: {
                position: 'relative',
                bottom: 3,
            },
            folderIcon: {
                fontSize: 18,
                position: 'relative',
                top: 3,
                margin: '0 4px 0 2px',
                color: '#6eadff',
            },
            stopIcon: {
                color: '#a8a7a8',
                fontSize: 15,
                position: 'relative',
                top: 3,
                margin: '0px 2px 0px 0px',
            },
        },
        treeStyle: {
            marginLeft: 5,
            arrow: {
                color: '#a7a7a7',
                fontSize: 15,
            },
        },
    },
    userOrgUnits: {
        index: {
            background: '#F4F5F8',
            margin: '0 0px 10px',
        },
        checkbox: {
            fontSize: 16,
        },
        stopIcon: {
            position: 'relative',
            top: '4px',
            color: '#9e9e9e',
            fontSize: '15px',
            margin: '0 3px 0 -10px',
        },
        text: {
            color: '#000',
            position: 'relative',
            top: '3px',
        },
    },
    footer: {
        index: {
            marginTop: 10,
        },
    },
};

class OrgUnitDialog extends React.PureComponent {
    constructor(props) {
        super(props);

        this.i18n = props.d2.i18n;
        this.d2 = props.d2;

        this.state = {
            initiallyExpanded: this.props
                .selected
                .map(ou => removeLastPathSegment(ou.path)),
        };
    }

    getChildContext() {
        return {
            d2: this.props.d2,
        };
    }

    componentDidUpdate(prevProps) {
        // if props.periods.length changed by more than 1, then new/favorite was selected
        if (Math.abs(prevProps.selected.length - this.props.selected.length) > 1) {
            // In this case refresh expanded org units
            this.setState({
                initiallyExpanded: this.props.selected.map(ou => removeLastPathSegment(ou.path)),
            });
        } else {
            // If props.periods.length changed by 1 or didnt change
            // then check if new/favorite was selected by comparing ids
            // if more than 1 ids are different, then new/favorite was selected
            // and we should refresh expanded org units
            let counter = 0;

            const periods = prevProps.selected.length < this.props.selected.length
                ? prevProps.selected
                : this.props.selected;

            for (let i = 0; i < periods.length; ++i) {
                if (prevProps.selected[i].id !== this.props.selected[i].id) {
                    counter += 1;

                    if (counter > 1) {
                        this.setState({
                            initiallyExpanded: this.props.selected.map(ou => removeLastPathSegment(ou.path)),
                        });
                    }
                }
            }
        }
    }

    onUpdateClick = () => {
        this.props.onUpdate();
    };

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
        <Grid
            spacing={8}
            style={styles.footer.index}
            container
        >
            <Grid item xs={4}>
                <InputLabel htmlFor="level">{this.i18n.getTranslation('Level')}</InputLabel>
                <Select
                    value={this.props.level}
                    onChange={this.props.setLevel}
                    input={<Input name="level" id="level" />}
                    renderValue={this.renderLevelOptions}
                    disabled={this.props.userOrgUnits.length > 0}
                    multiple
                    displayEmpty
                    fullWidth
                >
                    <MenuItem value="">
                        <em>{this.i18n.getTranslation('Select a level')}</em>
                    </MenuItem>
                    {this.props.levelOptions.map(option => (
                        <MenuItem
                            key={option.id}
                            value={option.id}
                        >
                            {option.displayName}
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid item xs={4}>
                <InputLabel htmlFor="group">{this.i18n.getTranslation('Group')}</InputLabel>
                <Select
                    value={this.props.group}
                    onChange={this.props.setGroup}
                    input={<Input name="group" id="group" />}
                    renderValue={this.renderGroupOptions}
                    disabled={this.props.userOrgUnits.length > 0}
                    multiple
                    displayEmpty
                    fullWidth
                >
                    <MenuItem value="">
                        <em>{this.i18n.getTranslation('Select a group')}</em>
                    </MenuItem>
                    {this.props.groupOptions.map(option => (
                        <MenuItem
                            key={option.id}
                            value={option.id}
                        >
                            {option.displayName}
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
        </Grid>
    );

    render = () => (
        <Dialog
            open={this.props.open}
            onClose={this.props.onClose}
            fullWidth={this.props.fullWidth}
            maxWidth={this.props.maxWidth}
        >
            <DialogTitle>
                {this.i18n.getTranslation('Organisation units')}
            </DialogTitle>
            <DialogContent>
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
                            {this.props.userOrgUnits.length > 0 &&
                                <div style={styles.scrollableContainer.overlay} />
                            }
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
                                showFolderIcon
                                disableSpacer
                            />
                        </div>
                    </div>
                </div>
                <div>
                    {this.renderOptionsPanel()}
                </div>
            </DialogContent>
            <DialogActions style={{ padding: '24px' }}>
                <Button onClick={this.props.onClose}>
                    {this.i18n.getTranslation('Hide')}
                </Button>
                <Button
                    color={'primary'}
                    onClick={this.onUpdateClick}
                >
                    {this.i18n.getTranslation('Update')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

OrgUnitDialog.defaultProps = {
    selected: [],
    userOrgUnits: [],
    level: [],
    group: [],
    levelOptions: [],
    groupOptions: [],

    // dialog related props
    open: false,
    fullWidth: true,
    maxWidth: 'md',
};

OrgUnitDialog.propTypes = {
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
    setLevel: PropTypes.func.isRequired,

    /**
     * Setter for group multiselect value
     */
    setGroup: PropTypes.func.isRequired,

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
     * D2 object
     */
    d2: PropTypes.object.isRequired,

    /**
     * Root organisation unit
     */
    root: PropTypes.object.isRequired,

    // Dialog related props
    onClose: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    open: PropTypes.bool,
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.string,
};

OrgUnitDialog.childContextTypes = {
    d2: PropTypes.object,
};

export default OrgUnitDialog;

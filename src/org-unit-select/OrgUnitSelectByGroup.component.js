import React from 'react';
import log from 'loglevel';

import DropDown from '../form-fields/DropDown.component';
import RaisedButton from 'material-ui/lib/raised-button';
import LinearProgress from 'material-ui/lib/linear-progress';


const style = {
    button: {
        position: 'relative',
        top: 3,
        marginLeft: 16,
    },
    progress: {
        height: 2,
        backgroundColor: 'rgba(0,0,0,0)',
        top: 46,
    },
};
style.button1 = Object.assign({}, style.button, { marginLeft: 0 });

class OrgUnitSelectByLevel extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: false,
            groupId: '',
        };
        this.groupCache = {};

        this.addToSelection = this.addToSelection.bind(this);
        this.removeFromSelection = this.removeFromSelection.bind(this);
        this.getOrgUnitsForGroup = this.getOrgUnitsForGroup.bind(this);

        this.handleChangeGroup = this.handleChangeGroup.bind(this);
        this.handleSelectAll = this.handleSelectAll.bind(this);
        this.handleDeselectAll = this.handleDeselectAll.bind(this);

        this.getTranslation = context.d2.i18n.getTranslation.bind(context.d2.i18n);
    }

    addToSelection(orgUnits) {
        const res = orgUnits;
        this.props.selected.forEach(orgUnitId => {
            if (res.indexOf(orgUnitId) === -1) {
                res.push(orgUnitId);
            }
        });
        this.props.onUpdateSelection(res);
    }

    removeFromSelection(orgUnits) {
        this.props.onUpdateSelection(this.props.selected.filter(orgUnit => orgUnits.indexOf(orgUnit) === -1));
    }

    getOrgUnitsForGroup(groupId, ignoreCache = false) {
        return new Promise(resolve => {
            if (!ignoreCache && this.groupCache.hasOwnProperty(groupId)) {
                resolve(this.groupCache[groupId].slice());
            } else {
                log.debug(`Loading org units for group ${groupId}`);
                this.setState({ loading: true });

                const d2 = this.context.d2;
                d2.models.organisationUnitGroups.get(groupId, { fields: 'organisationUnits[id]' })
                    .then(orgUnitGroups => orgUnitGroups.organisationUnits.toArray().map(orgUnit => orgUnit.id))
                    .then(orgUnitIds => {
                        log.debug(`Loaded ${orgUnitIds.length} org units for group ${groupId}`);
                        this.setState({ loading: false });
                        this.groupCache[groupId] = orgUnitIds;

                        // Make a copy of the returned array to ensure that the cache won't be modified from elsewhere
                        resolve(orgUnitIds.slice());
                    })
                    .catch(err => {
                        this.setState({ loading: false });
                        log.error(`Failed to load org units in group ${groupId}:`, err);
                    });
            }
        });
    }

    handleChangeGroup(event) {
        this.setState({ groupId: event.target.value });
    }

    handleSelectAll() {
        this.getOrgUnitsForGroup(this.state.groupId)
            .then(orgUnits => {
                this.addToSelection(orgUnits);
            });
    }

    handleDeselectAll() {
        this.getOrgUnitsForGroup(this.state.groupId)
            .then(orgUnits => {
                this.removeFromSelection(orgUnits);
            });
    }

    renderControls() {
        return (
            <div style={{ position: 'absolute', display: 'inline-block', top: 24, marginLeft: 16 }}>
                {this.state.loading && (
                    <LinearProgress size={0.5} style={style.progress} />
                )}
                <RaisedButton
                    label={this.getTranslation('select')}
                    style={style.button1}
                    onClick={this.handleSelectAll}
                    disabled={this.state.loading}
                />
                <RaisedButton
                    label={this.getTranslation('deselect')}
                    style={style.button}
                    onClick={this.handleDeselectAll}
                    disabled={this.state.loading}
                />
            </div>
        );
    }

    render() {
        const menuItems = (Array.isArray(this.props.groups) && this.props.groups || this.props.groups.toArray());

        // The minHeight on the wrapping div below is there to compensate for the fact that a
        // Material-UI SelectField will change height depending on whether or not it has a value
        return (
            <div style={{ position: 'relative', minHeight: 89 }}>
                <DropDown
                    value={this.state.groupId}
                    menuItems={menuItems}
                    onChange={this.handleChangeGroup}
                    floatingLabelText="Organisation Unit Group"
                    disabled={this.state.loading}
                />
                {(this.state.groupId.length > 0 || this.state.loading) && this.renderControls()}
            </div>
        );
    }
}

OrgUnitSelectByLevel.propTypes = {
    // groups is an array of either ModelCollection objects or plain objects,
    // where each object should contain `id` and `displayName` properties
    groups: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array,
    ]).isRequired,

    // selected is an array of selected organisation unit IDs
    selected: React.PropTypes.array.isRequired,

    // Whenever the selection changes, onUpdateSelection will be called with
    // one argument: The new array of selected organisation units
    onUpdateSelection: React.PropTypes.func.isRequired,

    // TODO: Add group cache prop?
};

OrgUnitSelectByLevel.contextTypes = { d2: React.PropTypes.any.isRequired };

export default OrgUnitSelectByLevel;

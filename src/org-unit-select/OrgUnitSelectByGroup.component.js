import React from 'react';
import log from 'loglevel';

import { addToSelection, removeFromSelection, handleChangeSelection, renderDropdown, renderControls } from './common';


class OrgUnitSelectByGroup extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: false,
            selection: undefined,
        };
        this.groupCache = {};

        this.addToSelection = addToSelection.bind(this);
        this.removeFromSelection = removeFromSelection.bind(this);
        this.handleChangeSelection = handleChangeSelection.bind(this);
        this.renderControls = renderControls.bind(this);

        this.getOrgUnitsForGroup = this.getOrgUnitsForGroup.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleDeselect = this.handleDeselect.bind(this);

        this.getTranslation = context.d2.i18n.getTranslation.bind(context.d2.i18n);
    }

    getOrgUnitsForGroup(groupId, ignoreCache = false) {
        const d2 = this.context.d2;
        return new Promise(resolve => {
            if (this.props.currentRoot) {
                log.debug(`Loading org units for group ${groupId} within ${this.props.currentRoot.displayName}`);
                this.setState({ loading: true });

                d2.models.organisationUnits.list({
                    root: this.props.currentRoot.id,
                    paging: false,
                    includeDescendants: true,
                    fields: 'id',
                    filter: `organisationUnitGroups.id:eq:${groupId}`,
                })
                    .then(orgUnits => orgUnits.toArray().map(orgUnit => orgUnit.id))
                    .then(orgUnitIds => {
                        log.debug(`Loaded ${orgUnitIds.length} org units for group ${groupId} within ${this.props.currentRoot.displayName}`);
                        this.setState({ loading: false });

                        resolve(orgUnitIds.slice());
                    });
            } else if (!ignoreCache && this.groupCache.hasOwnProperty(groupId)) {
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

    handleSelect() {
        this.getOrgUnitsForGroup(this.state.selection)
            .then(orgUnits => {
                this.addToSelection(orgUnits);
            });
    }

    handleDeselect() {
        this.getOrgUnitsForGroup(this.state.selection)
            .then(orgUnits => {
                this.removeFromSelection(orgUnits);
            });
    }

    render() {
        const menuItems = (Array.isArray(this.props.groups) && this.props.groups || this.props.groups.toArray());

        const label = 'organisation_unit_group';

        // The minHeight on the wrapping div below is there to compensate for the fact that a
        // Material-UI SelectField will change height depending on whether or not it has a value
        return renderDropdown.call(this, menuItems, label);
    }
}

OrgUnitSelectByGroup.propTypes = {
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

    // If currentRoot is set, only org units that are descendants of the
    // current root org unit will be added to or removed from the selection
    currentRoot: React.PropTypes.object,

    // TODO: Add group cache prop?
};

OrgUnitSelectByGroup.contextTypes = { d2: React.PropTypes.any.isRequired };

export default OrgUnitSelectByGroup;

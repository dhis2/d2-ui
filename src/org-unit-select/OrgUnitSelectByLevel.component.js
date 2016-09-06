import React from 'react';
import log from 'loglevel';
import { addToSelection, removeFromSelection, handleChangeSelection, renderDropdown, renderControls } from './common';


class OrgUnitSelectByLevel extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: false,
            selection: undefined,
        };
        this.levelCache = {};

        this.addToSelection = addToSelection.bind(this);
        this.removeFromSelection = removeFromSelection.bind(this);
        this.handleChangeSelection = handleChangeSelection.bind(this);
        this.renderControls = renderControls.bind(this);

        this.getOrgUnitsForLevel = this.getOrgUnitsForLevel.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleDeselect = this.handleDeselect.bind(this);

        this.getTranslation = context.d2.i18n.getTranslation.bind(context.d2.i18n);
    }

    getOrgUnitsForLevel(level, ignoreCache = false) {
        return new Promise(resolve => {
            if (!ignoreCache && this.levelCache.hasOwnProperty(level)) {
                resolve(this.levelCache[level].slice());
            } else {
                log.debug(`Loading org units for level ${level}`);
                this.setState({ loading: true });

                const d2 = this.context.d2;
                d2.models.organisationUnits.list({ paging: false, level, fields: 'id' })
                    .then(orgUnits => orgUnits.toArray().map(orgUnit => orgUnit.id))
                    .then(orgUnitIds => {
                        log.debug(`Loaded ${orgUnitIds.length} org units for level ${level}`);
                        this.setState({ loading: false });
                        this.levelCache[level] = orgUnitIds;

                        // Make a copy of the returned array to ensure that the cache won't be modified from elsewhere
                        resolve(orgUnitIds.slice());
                    })
                    .catch(err => {
                        this.setState({ loading: false });
                        log.error(`Failed to load org units in level ${level}:`, err);
                    });
            }
        });
    }

    handleSelect() {
        this.getOrgUnitsForLevel(this.state.selection)
            .then(orgUnits => {
                this.addToSelection(orgUnits);
            });
    }

    handleDeselect() {
        this.getOrgUnitsForLevel(this.state.selection)
            .then(orgUnits => {
                this.removeFromSelection(orgUnits);
            });
    }

    render() {
        const menuItems = (Array.isArray(this.props.levels) && this.props.levels || this.props.levels.toArray())
            .map(level => ({ id: level.level, displayName: level.displayName }));
        const label = 'organisation_unit_level';

        // The minHeight on the wrapping div below is there to compensate for the fact that a
        // Material-UI SelectField will change height depending on whether or not it has a value
        return renderDropdown.call(this, menuItems, label);
    }
}

OrgUnitSelectByLevel.propTypes = {
    // levels is an array of either ModelCollection objects or plain objects,
    // where each object should contain `level` and `displayName` properties
    levels: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array,
    ]).isRequired,

    // selected is an array of selected organisation unit IDs
    selected: React.PropTypes.array.isRequired,

    // Whenever the selection changes, onUpdateSelection will be called with
    // one argument: The new array of selected organisation units
    onUpdateSelection: React.PropTypes.func.isRequired,

    // TODO: Add level cache prop?
};

OrgUnitSelectByLevel.contextTypes = { d2: React.PropTypes.any.isRequired };

export default OrgUnitSelectByLevel;

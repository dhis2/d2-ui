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
        };
        this.levelCache = {};

        this.addToSelection = this.addToSelection.bind(this);
        this.removeFromSelection = this.removeFromSelection.bind(this);
        this.getOrgUnitsForLevel = this.getOrgUnitsForLevel.bind(this);

        this.handleChangeLevel = this.handleChangeLevel.bind(this);
        this.handleSelectAll = this.handleSelectAll.bind(this);
        this.handleDeselectAll = this.handleDeselectAll.bind(this);

        this.getTranslation = context.d2.i18n.getTranslation.bind(context.d2.i18n);
    }

    addToSelection(orgUnits) {
        const res = this.props.selected;
        orgUnits.forEach(orgUnitId => {
            if (res.indexOf(orgUnitId) === -1) {
                res.push(orgUnitId);
            }
        });
        this.props.onUpdateSelection(res);
    }

    removeFromSelection(orgUnits) {
        this.props.onUpdateSelection(this.props.selected.filter(orgUnit => orgUnits.indexOf(orgUnit) === -1));
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

    handleChangeLevel(event) {
        this.setState({ level: event.target.value });
    }

    handleSelectAll() {
        this.getOrgUnitsForLevel(this.state.level)
            .then(orgUnits => {
                this.addToSelection(orgUnits);
            });
    }

    handleDeselectAll() {
        this.getOrgUnitsForLevel(this.state.level)
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
        const menuItems = (Array.isArray(this.props.levels) && this.props.levels || this.props.levels.toArray())
            .map(level => ({ id: level.level, displayName: level.displayName }));

        // The minHeight on the wrapping div below is there to compensate for the fact that a
        // Material-UI SelectField will change height depending on whether or not it has a value
        return (
            <div style={{ position: 'relative', minHeight: 89 }}>
                <DropDown
                    value={this.state.level}
                    menuItems={menuItems}
                    onChange={this.handleChangeLevel}
                    floatingLabelText="Organisation Unit Level"
                    disabled={this.state.loading}
                />
                {(this.state.level > 0 || this.state.loading) && this.renderControls()}
            </div>
        );
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

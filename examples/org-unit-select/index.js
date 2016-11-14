import React from 'react';
import { render } from 'react-dom';
import log from 'loglevel';
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import D2Lib from 'd2/lib/d2';
import OrgUnitTree from '../../src/org-unit-tree/OrgUnitTree.component';
import OrgUnitSelectByLevel from '../../src/org-unit-select/OrgUnitSelectByLevel.component';
import OrgUnitSelectByGroup from '../../src/org-unit-select/OrgUnitSelectByGroup.component';
import OrgUnitSelectAll from '../../src/org-unit-select/OrgUnitSelectAll.component';

injectTapEventPlugin();

const el = document.getElementById('app');
const dhisDevConfig = DHIS_CONFIG;
const baseUrl = `${dhisDevConfig.baseUrl}/api`;

const styles = {
    card: {
        display: 'inline-block',
        margin: 16,
        width: 510,
        transition: 'all 175ms ease-out',
    },
    cardText: {
        paddingTop: 0,
    },
    cardHeader: {
        padding: '16px',
        margin: '16px -16px',
        borderBottom: '1px solid #eeeeee',
    },
    left: {
        display: 'inline-block',
        position: 'absolute',
        height: 350,
        width: 524,
        overflowY: 'scroll',
        marginBottom: 16,
    },
    right: {
        display: 'inline-block',
        position: 'absolute',
        width: 475,
        right: 16,
    },
    ouLabel: {
        background: 'rgba(0,0,0,0.05)',
        borderRadius: 5,
        border: '1px solid rgba(0,0,0,0.1)',
        padding: '1px 6px 1px 3px',
        fontStyle: 'italic',
    },
};
styles.cardWide = Object.assign({}, styles.card, {
    width: 1052,
});

class OrgUnitSelectExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
        };

        this.handleSelectionUpdate = this.handleSelectionUpdate.bind(this);
        this.handleOrgUnitClick = this.handleOrgUnitClick.bind(this);
    }

    getChildContext() {
        return {
            d2: this.props.d2,
        };
    }

    handleSelectionUpdate(newSelection) {
        this.setState({ selected: newSelection });
    }

    handleOrgUnitClick(event, orgUnit) {
        if (this.state.selected.includes(orgUnit.id)) {
            this.state.selected.splice(this.state.selected.indexOf(orgUnit.id), 1);
            this.setState({ selected: this.state.selected });
        } else {
            this.setState({ selected: this.state.selected.concat(orgUnit.id) });
        }
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
                <Card style={styles.card}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Select By Org Unit Level</h3>
                        <OrgUnitSelectByLevel
                            levels={this.props.levels}
                            selected={this.state.selected}
                            onUpdateSelection={this.handleSelectionUpdate}
                        />
                    </CardText>
                </Card>
                <Card style={styles.card}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Select by Org Unit Group</h3>
                        <OrgUnitSelectByGroup
                            groups={this.props.groups}
                            selected={this.state.selected}
                            onUpdateSelection={this.handleSelectionUpdate}
                        />
                    </CardText>
                </Card>
                <Card style={styles.cardWide}>
                    <CardText style={Object.assign({}, styles.cardText, { height: 420, position: 'relative' })}>
                        <h3 style={styles.cardHeader}>Combined with Org Unit Tree: {this.state.selected.length}</h3>
                        <div style={styles.left}>
                            <OrgUnitTree
                                root={this.props.root}
                                selected={this.state.selected}
                                currentRoot={this.state.currentRoot}
                                initiallyExpanded={this.props.root.id}
                                onClick={this.handleOrgUnitClick}
                                onChangeCurrentRoot={(currentRoot) => { this.setState({ currentRoot }); }}
                            />
                        </div>
                        <div style={styles.right}>
                            <div>
                                {this.state.currentRoot ? (
                                    <div>For organisation units within <span style={styles.ouLabel}>{
                                        this.state.currentRoot.displayName
                                    }</span>:</div>
                                ) : <div>For all organisation units:</div>}
                                <div style={{ marginBottom: -24, marginTop: -16 }}>
                                    <OrgUnitSelectByLevel
                                        levels={this.props.levels}
                                        selected={this.state.selected}
                                        currentRoot={this.state.currentRoot}
                                        onUpdateSelection={this.handleSelectionUpdate}
                                    />
                                </div>
                                <div>
                                    <OrgUnitSelectByGroup
                                        groups={this.props.groups}
                                        selected={this.state.selected}
                                        currentRoot={this.state.currentRoot}
                                        onUpdateSelection={this.handleSelectionUpdate}
                                    />
                                </div>
                                <div style={{ float: 'right' }}>
                                    <OrgUnitSelectAll
                                        selected={this.state.selected}
                                        currentRoot={this.state.currentRoot}
                                        onUpdateSelection={this.handleSelectionUpdate}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardText>
                </Card>
            </div>
            </MuiThemeProvider>
        );
    }
}
OrgUnitSelectExample.propTypes = {
    d2: React.PropTypes.object.isRequired,
    levels: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array,
    ]).isRequired,
    groups: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array,
    ]).isRequired,
    root: React.PropTypes.object.isRequired,
};
OrgUnitSelectExample.childContextTypes = { d2: React.PropTypes.object.isRequired };

render(<div>Initialising D2...</div>, el);

D2Lib.config.baseUrl = baseUrl;
D2Lib.init({ baseUrl })
    .then(d2 => {
        log.info('D2 initialised successfully', d2);
        render(<div>Loading Organisation Units...</div>, el);
        window.d2 = d2;

        // Hack in some translations since these examples don't have localisation files
        d2.i18n.translations.organisation_unit_group = 'Organisation Unit Group';
        d2.i18n.translations.organisation_unit_level = 'Organisation Unit Level';
        d2.i18n.translations.select = 'Select';
        d2.i18n.translations.deselect = 'Deselect';
        d2.i18n.translations.select_all = 'Select All Org Units';
        d2.i18n.translations.deselect_all = 'Deselect All Org Units';

        Promise.all([
            d2.models.organisationUnits.list({
                paging: false,
                level: 1,
                fields: 'id,displayName,level,path,children::isNotEmpty',
            }),
            d2.models.organisationUnitLevels.list({
                paging: false,
                fields: 'id,level,displayName',
                order: 'level:asc',
            }),
            d2.models.organisationUnitGroups.list({
                paging: false,
                fields: 'id,displayName',
            }),
        ])
            .then(([roots, levels, groups]) => {
                const root = roots.toArray()[0];
                render(<OrgUnitSelectExample d2={d2} root={root} levels={levels} groups={groups} />, el);
            });
    })
    .catch(err => {
        log.error('Failed to initialise D2:', err);
        render(<div>Failed to initialise D2: {err}</div>, el);
    });

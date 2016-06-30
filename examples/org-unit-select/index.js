import React from 'react';
import { render } from 'react-dom';
import log from 'loglevel';
import { Card, CardText } from 'material-ui/lib/card';

import D2Lib from 'd2/lib/d2';

import OrgUnitTree from '../../src/org-unit-tree/OrgUnitTree.component';
import OrgUnitSelectByLevel from '../../src/org-unit-select/OrgUnitSelectByLevel.component';
import OrgUnitSelectByGroup from '../../src/org-unit-select/OrgUnitSelectByGroup.component';

const el = document.getElementById('app');
const dhisDevConfig = DHIS_CONFIG;
const baseUrl = `${dhisDevConfig.baseUrl}/api`;

const styles = {
    card: {
        // display: 'inline-block',
        margin: 16,
        width: 580,
        transition: 'all 175ms ease-out',
    },
    cardText: {
        paddingTop: 0,
    },
    cardHeader: {
        padding: '0 16px 16px',
        margin: '16px -16px',
        borderBottom: '1px solid #eeeeee',
    },
};
styles.cardFloat = Object.assign({}, styles.card, {
    float: 'right',
});

class OrgUnitSelectExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
        };

        this.handleSelectionUpdate = this.handleSelectionUpdate.bind(this);
    }

    getChildContext() {
        return {
            d2: this.props.d2,
        };
    }

    handleSelectionUpdate(newSelection) {
        this.setState({ selected: newSelection });
    }

    render() {
        return (
            <div>
                <Card style={styles.cardFloat}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Seleced Org Units: {this.state.selected.length}</h3>
                        <OrgUnitTree root={this.props.root} selected={this.state.selected} />
                    </CardText>
                </Card>
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
                <Card style={styles.card}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Combined with Org Unit Tree</h3>
                        (All the stuff)
                    </CardText>
                </Card>
            </div>
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

jQuery.ajaxSetup({ headers: { Authorization: dhisDevConfig.authorization } });
D2Lib.config.baseUrl = baseUrl;
D2Lib.init({ baseUrl })
    .then(d2 => {
        log.info('D2 initialised successfully', d2);
        render(<div>Loading Organisation Units...</div>, el);
        window.d2 = d2;

        Promise.all([
            d2.models.organisationUnits.list({
                paging: false,
                level: 1,
                fields: 'id,displayName,children::isNotEmpty',
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
            // .catch(err => render(<div>Error: {err}</div>));
    })
    .catch(err => {
        log.error('Failed to initialise D2:', err);
        render(<div>Failed to initialise D2: {err}</div>, el);
    });

import React from 'react';
import { render } from 'react-dom';
import log from 'loglevel';
import { Card, CardText } from 'material-ui/lib/card';

import { init } from 'd2/lib/d2';
import OrgUnitTree from '../../src/org-unit-tree';

import InitiallyExpanded from './initially-expanded';
import SingleSelection from './single-selection';
import MultipleSelection from './multiple-selection';

const el = document.getElementById('app');
const baseUrl = 'http://localhost:8080/api';
// const baseUrl = 'https://play.dhis2.org/dev/api';


function OrgUnitTreeExample(props) {
    const styles = {
        card: {
            margin: 16,
            width: 350,
            float: 'left',
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
        customLabel: {
            fontStyle: 'italic',
        },
        customLabelSelected: {
            color: 'blue',
            weight: 900,
        },
    };

    styles.cardWide = Object.assign({}, styles.card, {
        width: (styles.card.width * 3) + (styles.card.margin * 4),
    });

    return (
        <div>
            <Card style={styles.card}>
                <CardText style={styles.cardText}>
                    <h3 style={styles.cardHeader}>Plain OrgUnitTree</h3>
                    <OrgUnitTree root={props.root} />
                </CardText>
            </Card>
            <Card style={styles.card}>
                <CardText style={styles.cardText}>
                    <h3 style={styles.cardHeader}>Three Independent Trees</h3>
                    {props.roots.length > 0 ? (
                        <div>
                            <OrgUnitTree root={props.roots[0]} />
                            <OrgUnitTree root={props.roots[1]} />
                            <OrgUnitTree root={props.roots[2]} />
                        </div>
                    ) : 'Loading...' }
                </CardText>
            </Card>
            <Card style={styles.card}>
                <CardText style={styles.cardText}>
                    <h3 style={styles.cardHeader}>Custom Styling</h3>
                    <OrgUnitTree
                        root={props.root}
                        labelStyle={styles.customLabel}
                        selectedLabelStyle={styles.customLabelSelected}
                        selected={['O6uvpzGd5pu', 'lc3eMKXaEfw', 'PMa2VCrupOd', 'qhqAxPSTUXp', 'jmIPBj66vD6']}
                        arrowSymbol="+"
                    />
                </CardText>
            </Card>
            <Card style={styles.card}>
                <CardText style={styles.cardText}>
                    <h3 style={styles.cardHeader}>Single Selection Tree</h3>
                    <SingleSelection root={props.root} />
                </CardText>
            </Card>
            <Card style={styles.card}>
                <CardText style={styles.cardText}>
                    <h3 style={styles.cardHeader}>Multiple Selection Tree</h3>
                    <MultipleSelection root={props.root} />
                </CardText>
            </Card>
            <Card style={styles.card}>
                <CardText style={styles.cardText}>
                    <h3 style={styles.cardHeader}>Initially Expanded</h3>
                    <InitiallyExpanded root={props.root} />
                </CardText>
            </Card>
            <Card style={styles.card}>
                <CardText style={styles.cardText}>
                    <h3 style={styles.cardHeader}>Initially Expanded, 3 levels pre-loaded</h3>
                    { props.preRoot ? <InitiallyExpanded root={props.preRoot} /> : 'Loading...' }
                </CardText>
            </Card>
        </div>
    );
}
OrgUnitTreeExample.propTypes = { root: React.PropTypes.any, roots: React.PropTypes.any, preRoot: React.PropTypes.any };

render(<div>Initialising D2...</div>, el);

jQuery.ajaxSetup({ headers: { Authorization: 'Basic YWRtaW46ZGlzdHJpY3Q=' } });
init({ baseUrl })
    .then(d2 => {
        log.info('D2 initialised successfully', d2);
        render(<div>Loading Organisation Units...</div>, el);
        window.d2 = d2;

        d2.models.organisationUnits.list({ paging: false, level: 1, fields: 'id,displayName,children::isNotEmpty' })
            .then(rootLevel => rootLevel.toArray()[0])
            .then(rootUnit => {
                window.rootUnit = rootUnit;
                render(<OrgUnitTreeExample root={rootUnit} roots={[]} />, el);

                Promise.all([
                    d2.models.organisationUnits.get('at6UHUQatSo', { fields: 'id,displayName' }),
                    d2.models.organisationUnits.get('fdc6uOvgoji', { fields: 'id,displayName,children::isNotEmpty' }),
                    d2.models.organisationUnits.list({
                        paging: false,
                        level: 1,
                        fields: 'id,displayName,children[id,displayName]',
                    }),
                ])
                    .then(roots => [roots[0], roots[1], roots[2].toArray()[0]])
                    .then(roots => {
                        render(<OrgUnitTreeExample root={rootUnit} roots={roots} />, el);
                        d2.models.organisationUnits.list({
                            paging: false,
                            level: 1,
                            fields: 'id,displayName,children[id,displayName,children[id,displayName,children::isNotEmpty]]',
                        })
                            .then(preRoot => preRoot.toArray()[0])
                            .then(preRoot => {
                                render(<OrgUnitTreeExample root={rootUnit} roots={roots} preRoot={preRoot} />, el);
                            });
                    });
            })
            .catch(err => render(<div>Error: {err}</div>));
    })
    .catch(err => {
        log.error('Failed to initialise D2:', err);
        render(<div>Failed to initialise D2: {err}</div>, el);
    });

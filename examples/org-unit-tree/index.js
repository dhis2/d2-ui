import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

import log from 'loglevel';
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import D2Lib from 'd2/lib/d2';
import OrgUnitTree from '../../src/org-unit-tree/OrgUnitTree.component';
import OrgUnitTreeMultipleRoots from '../../src/org-unit-tree/OrgUnitTreeMultipleRoots.component';
import InitiallyExpanded from './initially-expanded';
import SingleSelection from './single-selection';
import SingleSelectionNoCheckbox from './single-selection-no-checkbox';
import SingleSelectionMultipleRoots from './single-selection-multiple-roots';
import MultipleSelection from './multiple-selection';
import MultipleSelectionNoCheckbox from './multiple-selection-no-checkbox';
import MultipleSelectionMultipleRoots from './multiple-selection-multiple-roots';
import ChangeRoot from './change-root';
import MultipleSelectionChangeRoot from './multiple-selection-change-root';

const el = document.getElementById('app');
const dhisDevConfig = DHIS_CONFIG;
const baseUrl = `${dhisDevConfig.baseUrl}/api`;


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
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
                <section>Plain Organisation Unit Trees</section>

                <Card style={styles.card}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Plain OrgUnitTree</h3>
                        <OrgUnitTree root={props.root} />
                    </CardText>
                </Card>
                <Card style={styles.card}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Plain OrgUnitTree with filter</h3>
                        <OrgUnitTree
                            root={props.root}
                            orgUnitsPathsToInclude={['/ImspTQPwCqd/Vth0fbpFcsO/EjnIQNVAXGp', '/ImspTQPwCqd/TEQlaapDQoK/ZiOVcrSjSYe']}
                        />
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
                        <h3 style={styles.cardHeader}>Tree with multiple roots</h3>
                        {props.roots.length > 0 ? (
                            <OrgUnitTreeMultipleRoots roots={props.roots} />
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
                            selected={[
                                '/ImspTQPwCqd/O6uvpzGd5pu',
                                '/ImspTQPwCqd/lc3eMKXaEfw',
                                '/ImspTQPwCqd/PMa2VCrupOd',
                                '/ImspTQPwCqd/qhqAxPSTUXp',
                                '/ImspTQPwCqd/jmIPBj66vD6',
                            ]}
                            arrowSymbol="+"
                        />
                    </CardText>
                </Card>

                <section>Single Selection</section>

                <Card style={styles.card}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Single Selection Tree</h3>
                        <SingleSelection root={props.root} />
                    </CardText>
                </Card>
                <Card style={styles.card}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Single Selection Tree without Checkboxes</h3>
                        <SingleSelectionNoCheckbox root={props.root} />
                    </CardText>
                </Card>
                <Card style={styles.card}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Single Selection with multiple roots</h3>
                        {props.roots.length > 0 ? (
                            <SingleSelectionMultipleRoots roots={props.roots} />
                        ) : 'Loading...' }
                    </CardText>
                </Card>

                <section>Multiple Selection</section>

                <Card style={styles.card}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Multiple Selection Tree</h3>
                        <MultipleSelection root={props.root} />
                    </CardText>
                </Card>
                <Card style={styles.card}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Multiple Selection without Checkboxes</h3>
                        <MultipleSelectionNoCheckbox root={props.root} />
                    </CardText>
                </Card>
                <Card style={styles.card}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Multiple Selection with multiple roots</h3>
                        {props.roots.length > 0 ? (
                            <MultipleSelectionMultipleRoots roots={props.roots} />
                        ) : 'Loading...' }
                    </CardText>
                </Card>

                <section>Initially Expanded and Pre-Loaded Trees</section>

                <Card style={styles.card}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Initially Expanded</h3>
                        <InitiallyExpanded roots={props.root} />
                    </CardText>
                </Card>
                <Card style={styles.card}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Initially Expanded Multiple Roots</h3>
                        <InitiallyExpanded
                            roots={props.roots}
                            selected={['/ImspTQPwCqd', '/ImspTQPwCqd/fdc6uOvgoji']}
                        />
                    </CardText>
                </Card>
                <Card style={styles.card}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Initially Expanded, 3 levels pre-loaded</h3>
                        { props.preRoot ? <InitiallyExpanded roots={props.preRoot} /> : 'Loading...' }
                    </CardText>
                </Card>

                <section>Root Selection</section>

                <Card style={styles.card}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Root Selection</h3>
                        <ChangeRoot root={props.root} />
                    </CardText>
                </Card>
                <Card style={styles.card}>
                    <CardText style={styles.cardText}>
                        <h3 style={styles.cardHeader}>Root Selection & Multiple Selection</h3>
                        <MultipleSelectionChangeRoot root={props.root} />
                    </CardText>
                </Card>
            </div>
        </MuiThemeProvider>
    );
}
OrgUnitTreeExample.propTypes = {
    root: PropTypes.any.isRequired,
    roots: PropTypes.any.isRequired,
    preRoot: PropTypes.any,
};
OrgUnitTreeExample.defaultProps = {
    preRoot: undefined,
};

render(<div>Initialising D2...</div>, el);

D2Lib.config.baseUrl = baseUrl;
D2Lib.init({ baseUrl, schemas: ['organisationUnit', 'dataSet'] })
    .then((d2) => {
        log.info('D2 initialised successfully', d2);
        render(<div>Loading Organisation Units...</div>, el);
        window.d2 = d2;
        let rootUnit;
        const childFields = 'id,path,displayName,children::isNotEmpty';

        d2.models.organisationUnits.list({
            paging: false,
            level: 1,
            fields: childFields,
        })
            .then(rootLevel => rootLevel.toArray()[0])
            .then((loadRootUnit) => {
                rootUnit = loadRootUnit;
                window.rootUnit = rootUnit;
                render(<OrgUnitTreeExample root={loadRootUnit} roots={[]} />, el);
            })
            .then(() => Promise.all([
                d2.models.organisationUnits.get('at6UHUQatSo', { fields: childFields }),
                d2.models.organisationUnits.get('fdc6uOvgoji', { fields: childFields }),
                d2.models.organisationUnits.list({
                    paging: false,
                    level: 1,
                    fields: 'id,path,displayName,children[id,path,displayName,children::isNotEmpty]',
                }),
            ]))
            .then(roots => [roots[0], roots[1], roots[2].toArray()[0]])
            .then((roots) => {
                render(<OrgUnitTreeExample root={rootUnit} roots={roots} />, el);
                d2.models.organisationUnits.list({
                    paging: false,
                    level: 1,
                    fields: `id,path,displayName,children[id,path,displayName,children[${childFields}]]`,
                })
                    .then(preRoot => preRoot.toArray()[0])
                    .then((preRoot) => {
                        render(<OrgUnitTreeExample root={rootUnit} roots={roots} preRoot={preRoot} />, el);
                    });
            })
            .catch(err => render(<div>Error: {err}</div>, el));
    })
    .catch((err) => {
        log.error('Failed to initialise D2:', err);
        render(<div>Failed to initialise D2: {err}</div>, el);
    });

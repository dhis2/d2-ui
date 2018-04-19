import React from 'react';
import PropTypes from 'prop-types';

import log from 'loglevel';
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import InitiallyExpanded from './org-unit-tree/initially-expanded';
import SingleSelection from './org-unit-tree/single-selection';
import SingleSelectionNoCheckbox from './org-unit-tree/single-selection-no-checkbox';
import SingleSelectionMultipleRoots from './org-unit-tree/single-selection-multiple-roots';
import MultipleSelection from './org-unit-tree/multiple-selection';
import MultipleSelectionNoCheckbox from './org-unit-tree/multiple-selection-no-checkbox';
import MultipleSelectionMultipleRoots from './org-unit-tree/multiple-selection-multiple-roots';
import ChangeRoot from './org-unit-tree/change-root';
import MultipleSelectionChangeRoot from './org-unit-tree/multiple-selection-change-root';

import { OrgUnitTreeMultipleRoots, OrgUnitTree } from 'd2-ui-org-unit-tree';

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

export default class OrgUnitTreeExample extends React.Component {
	constructor (props) {
		super(props);

		const d2 = props.d2;
		this.state = {
			d2: d2,
			roots: [],
			root: undefined,
			preRoot: undefined
		};

		const childFields = 'id,path,displayName,children::isNotEmpty';

		d2.models.organisationUnits
			.list({
				paging: false,
				level: 1,
				fields: childFields,
			})
			.then(rootLevel => rootLevel.toArray()[0])
			.then((loadRootUnit) => {
				this.setState({
					root: loadRootUnit,
					roots: []
				})
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
				this.setState({
					roots
				});
				d2.models.organisationUnits.list({
					paging: false,
					level: 1,
					fields: `id,path,displayName,children[id,path,displayName,children[${childFields}]]`,
				})
				.then(preRoot => preRoot.toArray()[0])
				.then((preRoot) => {
					this.setState({
						preRoot
					})
				});
			})
	}

	render () {
		const { root, roots, preRoot } = this.state;

		console.log(root, roots, preRoot)
		if (!root || !roots || !preRoot) {
			return null;
		}

		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					<section>Plain Organisation Unit Trees</section>

					<Card style={styles.card}>
						<CardText style={styles.cardText}>
							<h3 style={styles.cardHeader}>Plain OrgUnitTree</h3>
							<OrgUnitTree root={root} />
						</CardText>
					</Card>
					<Card style={styles.card}>
						<CardText style={styles.cardText}>
							<h3 style={styles.cardHeader}>Plain OrgUnitTree with filter</h3>
							<OrgUnitTree
								root={root}
								orgUnitsPathsToInclude={['/ImspTQPwCqd/Vth0fbpFcsO/EjnIQNVAXGp', '/ImspTQPwCqd/TEQlaapDQoK/ZiOVcrSjSYe']}
							/>
						</CardText>
					</Card>
					<Card style={styles.card}>
						<CardText style={styles.cardText}>
							<h3 style={styles.cardHeader}>Three Independent Trees</h3>
							{roots.length > 0 ? (
								<div>
									<OrgUnitTree root={roots[0]} />
									<OrgUnitTree root={roots[1]} />
									<OrgUnitTree root={roots[2]} />
								</div>
							) : 'Loading...' }
						</CardText>
					</Card>
					<Card style={styles.card}>
						<CardText style={styles.cardText}>
							<h3 style={styles.cardHeader}>Tree with multiple roots</h3>
							{roots.length > 0 ? (
								<OrgUnitTreeMultipleRoots roots={roots} />
							) : 'Loading...' }
						</CardText>
					</Card>
					<Card style={styles.card}>
						<CardText style={styles.cardText}>
							<h3 style={styles.cardHeader}>Custom Styling</h3>
							<OrgUnitTree
								root={root}
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
							<SingleSelection root={root} />
						</CardText>
					</Card>

					<Card style={styles.card}>
						<CardText style={styles.cardText}>
							<h3 style={styles.cardHeader}>Single Selection Tree without Checkboxes</h3>
							<SingleSelectionNoCheckbox root={root} />
						</CardText>
					</Card>

					<Card style={styles.card}>
						<CardText style={styles.cardText}>
							<h3 style={styles.cardHeader}>Single Selection with multiple roots</h3>
							{roots.length > 0 ? (
								<SingleSelectionMultipleRoots roots={roots} />
							) : 'Loading...' }
						</CardText>
					</Card>

					<section>Multiple Selection</section>

					<Card style={styles.card}>
						<CardText style={styles.cardText}>
							<h3 style={styles.cardHeader}>Multiple Selection Tree</h3>
							<MultipleSelection root={root} />
						</CardText>
					</Card>

					<Card style={styles.card}>
						<CardText style={styles.cardText}>
							<h3 style={styles.cardHeader}>Multiple Selection without Checkboxes</h3>
							<MultipleSelectionNoCheckbox root={root} />
						</CardText>
					</Card>

					<Card style={styles.card}>
						<CardText style={styles.cardText}>
							<h3 style={styles.cardHeader}>Multiple Selection with multiple roots</h3>
							{roots.length > 0 ? (
								<MultipleSelectionMultipleRoots root={root} roots={roots} />
							) : 'Loading...' }
						</CardText>
					</Card>

					<section>Initially Expanded and Pre-Loaded Trees</section>

					<Card style={styles.card}>
						<CardText style={styles.cardText}>
							<h3 style={styles.cardHeader}>Initially Expanded</h3>
							<InitiallyExpanded root={root} roots={root} />
						</CardText>
					</Card>

					<Card style={styles.card}>
						<CardText style={styles.cardText}>
							<h3 style={styles.cardHeader}>Initially Expanded Multiple Roots</h3>
							<InitiallyExpanded
								root={root}
								roots={roots}
								selected={['/ImspTQPwCqd', '/ImspTQPwCqd/fdc6uOvgoji']}
							/>
						</CardText>
					</Card>

					<Card style={styles.card}>
						<CardText style={styles.cardText}>
							<h3 style={styles.cardHeader}>Initially Expanded, 3 levels pre-loaded</h3>
							{ preRoot ? <InitiallyExpanded root={root} roots={preRoot} /> : 'Loading...' }
						</CardText>
					</Card>

					<section>Root Selection</section>

					<Card style={styles.card}>
						<CardText style={styles.cardText}>
							<h3 style={styles.cardHeader}>Root Selection</h3>
							<ChangeRoot root={root} />
						</CardText>
					</Card>

					<Card style={styles.card}>
						<CardText style={styles.cardText}>
							<h3 style={styles.cardHeader}>Root Selection & Multiple Selection</h3>
							<MultipleSelectionChangeRoot root={root} />
						</CardText>
					</Card>
				</div>
			</MuiThemeProvider>
		);
	}
}

OrgUnitTreeExample.propTypes = {
    d2: PropTypes.object.isRequired,
};

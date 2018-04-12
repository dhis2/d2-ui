import React from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';

import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { OrgUnitTree } from 'd2-ui-org-unit-select';
import { OrgUnitSelectByLevel } from 'd2-ui-org-unit-select';
import { OrgUnitSelectByGroup } from 'd2-ui-org-unit-select';
import { OrgUnitSelectAll } from 'd2-ui-org-unit-select';

import { TreeView } from 'd2-ui-core';

import { mergeChildren, incrementMemberCount, decrementMemberCount } from '../../src/org-unit-tree/utils';

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

export default class OrgUnitSelectExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: props.selected,
            rootWithMembers: props.rootWithMembers,
        };

        this.handleSelectionUpdate = this.handleSelectionUpdate.bind(this);
        this.handleOrgUnitClick = this.handleOrgUnitClick.bind(this);

        this.handleChildrenLoaded = this.handleChildrenLoaded.bind(this);
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
        if (this.state.selected.includes(orgUnit.path)) {
            this.state.selected.splice(this.state.selected.indexOf(orgUnit.path), 1);
            decrementMemberCount(this.state.rootWithMembers, orgUnit);
            this.setState({ selected: this.state.selected });
        } else {
            incrementMemberCount(this.state.rootWithMembers, orgUnit);
            this.setState({ selected: this.state.selected.concat(orgUnit.path) });
        }
    }

    handleChildrenLoaded(children) {
        function countChildren(root) {
            if (root.children && root.children.size && root.children.size > 0) {
                return root.children.toArray().reduce((sum, child) => sum + countChildren(child), 1);
            }

            return 1;
        }

        this.setState(state => ({
            rootWithMembers: mergeChildren(state.rootWithMembers, children)
        }));
    }

    render() {
        const changeRoot = (currentRoot) => {
            this.setState({ currentRoot });
        };

        await Promise.all([
            d2.models.organisationUnitLevels.list({
                paging: false,
                fields: 'id,level,displayName',
                order: 'level:asc',
            }),
            d2.models.organisationUnitGroups.list({
                paging: false,
                fields: 'id,displayName',
            }),
            d2.models.organisationUnits.list({
                paging: false,
                level: 1,
                fields: 'id,displayName,path,children::isNotEmpty,memberCount',
                memberCollection: 'dataSets',
                memberObject: 'TuL8IOPzpHh',
            }),
            d2.models.dataSets.get('TuL8IOPzpHh', {
                paging: false,
                fields: 'organisationUnits[id,path]',
            }),
        ])

        .then(([levels, groups, rootWithDataSetMembers, dataSetMembers]) => {
            const rootWithMembers = rootWithDataSetMembers.toArray()[0];
            const selected = dataSetMembers.organisationUnits.toArray().map(ou => ou.path);
            render(<OrgUnitSelectExample
                d2={d2}
                levels={levels}
                groups={groups}
                rootWithMembers={rootWithMembers}
                selected={selected}
            />);
        });

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
                            <h3 style={styles.cardHeader}>Selected: {this.state.selected.length}</h3>
                            <div style={styles.left}>
                                <OrgUnitTree
                                    root={this.props.rootWithMembers}
                                    selected={this.state.selected}
                                    currentRoot={this.state.currentRoot}
                                    initiallyExpanded={[`/${this.props.rootWithMembers.id}`]}
                                    onSelectClick={this.handleOrgUnitClick}
                                    onChangeCurrentRoot={changeRoot}
                                    memberCollection="dataSets"
                                    memberObject="TuL8IOPzpHh"
                                    onChildrenLoaded={this.handleChildrenLoaded}
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
                    <Card style={styles.card}>
                        <CardText style={{ maxHeight: 250, overflowY: 'auto' }}>
                            <TreeView label={`Selected (${this.state.selected.length})`}>
                                <div style={{ fontFamily: 'monospace' }}>
                                    {this.state.selected.sort().map(ou => <div key={ou}>{ou}</div>)}
                                </div>
                            </TreeView>
                        </CardText>
                    </Card>
                </div>
            </MuiThemeProvider>
        );
    }
}

OrgUnitSelectExample.propTypes = {
    d2: PropTypes.object.isRequired,
    levels: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]).isRequired,
    groups: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]).isRequired,
};

OrgUnitSelectExample.childContextTypes = { d2: PropTypes.object.isRequired };

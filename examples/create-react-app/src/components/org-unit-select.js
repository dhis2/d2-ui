import React from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';

import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { OrgUnitTree } from '@dhis2/d2-ui-org-unit-tree';
import { OrgUnitSelectByLevel } from '@dhis2/d2-ui-org-unit-select';
import { OrgUnitSelectByGroup } from '@dhis2/d2-ui-org-unit-select';
import { OrgUnitSelectAll } from '@dhis2/d2-ui-org-unit-select';

import { TreeView } from '@dhis2/d2-ui-core';

import { mergeChildren, incrementMemberCount, decrementMemberCount } from '@dhis2/d2-ui-org-unit-tree';

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
            d2: props.d2,
        };

        Promise.all([
            props.d2.models.organisationUnitLevels.list({
                paging: false,
                fields: 'id,level,displayName',
                order: 'level:asc',
            }),
            props.d2.models.organisationUnitGroups.list({
                paging: false,
                fields: 'id,displayName',
            }),
            props.d2.models.organisationUnits.list({
                paging: false,
                level: 1,
                fields: 'id,displayName,path,children::isNotEmpty,memberCount',
                memberCollection: 'dataSets',
                memberObject: 'TuL8IOPzpHh',
            }),
            props.d2.models.dataSets.get('TuL8IOPzpHh', {
                paging: false,
                fields: 'organisationUnits[id,path]',
            }),
        ])
        .then(([levels, groups, rootWithDataSetMembers, dataSetMembers]) => {
            const rootWithMembers = rootWithDataSetMembers.toArray()[0];
            const selected = dataSetMembers.organisationUnits.toArray().map(ou => ou.path);

            this.setState({
                levels,
                rootWithMembers,
                selected,
                groups
            })
        });

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

        const state = this.state;
        if (!state.levels || !state.selected) {
            console.info('What is state?', state);
            return null;
        }

        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <Card style={styles.card}>
                        <CardText style={styles.cardText}>
                            <h3 style={styles.cardHeader}>Select By Org Unit Level</h3>
                            <OrgUnitSelectByLevel
                                levels={this.state.levels}
                                selected={this.state.selected}
                                onUpdateSelection={this.handleSelectionUpdate}
                            />
                        </CardText>
                    </Card>
                    <Card style={styles.card}>
                        <CardText style={styles.cardText}>
                            <h3 style={styles.cardHeader}>Select by Org Unit Group</h3>
                            <OrgUnitSelectByGroup
                                groups={this.state.groups}
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
                                    root={this.state.rootWithMembers}
                                    selected={this.state.selected}
                                    currentRoot={this.state.currentRoot}
                                    initiallyExpanded={[`/${this.state.rootWithMembers.id}`]}
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
                                            levels={this.state.levels}
                                            selected={this.state.selected}
                                            currentRoot={this.state.currentRoot}
                                            onUpdateSelection={this.handleSelectionUpdate}
                                        />
                                    </div>
                                    <div>
                                        <OrgUnitSelectByGroup
                                            groups={this.state.groups}
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
};

OrgUnitSelectExample.childContextTypes = { d2: PropTypes.object.isRequired };

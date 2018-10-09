import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import OrgUnitDialog from '@dhis2/d2-ui-org-unit-dialog';

export const defaultState = {
    orgUnitDialog: {
        open: false,
    },
    snackbar: {
        open: false,
        message: '',
    },
    root: undefined,
    userOrgUnits: [],
    selected: [
        { id: 'O6uvpzGd5pu', path: '/ImspTQPwCqd/O6uvpzGd5pu' },
        { id: 'EjnIQNVAXGp', path: '/ImspTQPwCqd/Vth0fbpFcsO/EjnIQNVAXGp' },
        { id: 'ZiOVcrSjSYe', path: '/ImspTQPwCqd/TEQlaapDQoK/ZiOVcrSjSYe' },
        { id: 'aF6iPGbrcRk', path: '/ImspTQPwCqd/Vth0fbpFcsO/CF243RPvNY7/aF6iPGbrcRk' },
        { id: 'Vth0fbpFcsO', path: '/ImspTQPwCqd/Vth0fbpFcsO' },
    ],
    group: ['EYbopBOJWsW', 'tDZVQ1WtwpA'],
    level: ['tTUf91fCytl', 'wjP19dkFeIk'],
    levelOptions: [],
    groupOptions: [],
};


export default class OrgUnitDialogExample extends Component {
    constructor(props) {
        super(props);

        this.state = defaultState;

        this.props.d2
            .models
            .organisationUnits
            .list({
                paging: false,
                level: 1,
                fields: 'id,path,displayName,children::isNotEmpty',
            })
            .then(rootLevel => rootLevel.toArray()[0])
            .then((loadRootUnit) => {
                this.setState({
                    root: loadRootUnit,
                });
            });

        this.loadOrgUnitLevels();
        this.loadOrgUnitGroups();
    }

    onOrgUnitSelect = () => {
        const selectedOrgUnits = this.state.userOrgUnits.length > 0
            ? this.state.userOrgUnits.map(orgUnit => orgUnit.path || orgUnit.id)
            : this.state.selected.map(orgUnit => orgUnit.path || orgUnit.id);

        this.setState({
            snackbar: {
                open: true,
                message: `Selected org units: ${selectedOrgUnits.join(', ')},
                        levels: ${this.state.level.join(', ')}
                        groups: ${this.state.group.join(', ')}
                `,
            },
            orgUnitDialog: {
                open: false,
            },
        });
    };

    onSnackbarClose = () => {
        this.setState({
            snackbar: {
                open: false,
                message: '',
            },
        });
    };

    setLevel = (event) => {
        this.setState({
            level: event.target.value,
        });
    };

    setGroup = (event) => {
        this.setState({
            group: event.target.value,
        });
    };

    toggleDialog = () => {
        this.setState({
            orgUnitDialog: {
                open: !this.state.orgUnitDialog.open,
            },
        });
    };

    loadOrgUnitGroups = () => {
        this.props
            .d2
            .models
            .organisationUnitGroups
            .list({ paging: false })
            .then(collection => collection.toArray())
            .then(groupOptions => this.setState({ groupOptions }));
    };

    loadOrgUnitLevels = () => {
        this.props
            .d2
            .models
            .organisationUnitLevels
            .list({ paging: false })
            .then(collection => collection.toArray())
            .then(levelOptions => this.setState({ levelOptions }));
    };

    handleOrgUnitClick = (event, orgUnit) => {
        if (this.state.selected.some(ou => ou.path === orgUnit.path)) {
            this.setState({
                selected: this.state.selected.filter(ou => ou.path !== orgUnit.path),
            });
        } else {
            this.setState({
                selected: [
                    ...this.state.selected,
                    { id: orgUnit.id, displayName: orgUnit.displayName, path: orgUnit.path },
                ],
            });
        }
    };

    handleUserOrgUnitClick = (event, checked) => {
        if (checked) {
            this.setState({
                userOrgUnits: [...this.state.userOrgUnits, { id: event.target.name }],
            });
        } else {
            this.setState({
                userOrgUnits: this.state.userOrgUnits.filter(ou => ou.id !== event.target.name),
            });
        }
    };

    render = () => (
        <div>
            <div style={{ padding: 16 }}>
                <Button
                    onClick={this.toggleDialog}
                    variant="raised"
                >
                    Select org units
                </Button>
            </div>
            <OrgUnitDialog
                open={this.state.orgUnitDialog.open}
                root={this.state.root}
                d2={this.props.d2}

                selected={this.state.selected}
                userOrgUnits={this.state.userOrgUnits}
                level={this.state.level}
                group={this.state.group}
                levelOptions={this.state.levelOptions}
                groupOptions={this.state.groupOptions}

                setLevel={this.setLevel}
                setGroup={this.setGroup}
                handleUserOrgUnitClick={this.handleUserOrgUnitClick}
                handleOrgUnitClick={this.handleOrgUnitClick}

                onClose={this.toggleDialog}
                onUpdate={this.onOrgUnitSelect}
            />
            <Snackbar
                open={this.state.snackbar.open}
                message={this.state.snackbar.message}
                autoHideDuration={4000}
                onClose={this.onSnackbarClose}
            />
        </div>
    );
}

OrgUnitDialogExample.propTypes = {
    d2: PropTypes.object.isRequired,
};

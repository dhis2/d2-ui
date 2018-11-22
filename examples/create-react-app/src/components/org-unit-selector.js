import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { OrgUnitSelector } from '@dhis2/d2-ui-org-unit-dialog';

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


export default class OrgUnitSelectorExample extends Component {
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

    onLevelChange = (event) => {
        this.setState({
            level: event.target.value,
        });
    };

    onGroupChange = (event) => {
        this.setState({
            group: event.target.value,
        });
    };

    onDeselectAllClick = () => {
        this.setState({ selected: [] });
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

    render = () => {
        if (this.state.root) {
            return (<Card>
                <OrgUnitSelector
                    root={this.state.root}
                    selected={this.state.selected}
                    userOrgUnits={this.state.userOrgUnits}
                    level={this.state.level}
                    group={this.state.group}
                    levelOptions={this.state.levelOptions}
                    groupOptions={this.state.groupOptions}
                    onLevelChange={this.onLevelChange}
                    onGroupChange={this.onGroupChange}
                    onDeselectAllClick={this.onDeselectAllClick}
                    handleUserOrgUnitClick={this.handleUserOrgUnitClick}
                    handleOrgUnitClick={this.handleOrgUnitClick}
                />
            </Card>);
        }

        return 'loading...';
    }
}

OrgUnitSelectorExample.propTypes = {
    d2: PropTypes.object.isRequired,
};

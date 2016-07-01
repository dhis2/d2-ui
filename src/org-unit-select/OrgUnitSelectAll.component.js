import React from 'react';
import log from 'loglevel';

import RaisedButton from 'material-ui/lib/raised-button';
import LinearProgress from 'material-ui/lib/linear-progress';

import { addToSelection } from './common';


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

class OrgUnitSelectAll extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: false,
            cache: null,
        };

        this.addToSelection = addToSelection.bind(this);

        this.handleSelectAll = this.handleSelectAll.bind(this);
        this.handleDeselectAll = this.handleDeselectAll.bind(this);

        this.getTranslation = context.d2.i18n.getTranslation.bind(context.d2.i18n);
    }

    handleSelectAll() {
        if (Array.isArray(this.state.cache)) {
            this.props.onUpdateSelection(this.state.cache.slice());
        } else {
            this.setState({ loading: true });

            this.context.d2.models.organisationUnits.list({ fields: 'id', paging: false })
                .then(orgUnits => {
                    const ous = orgUnits.toArray().map(ou => ou.id);
                    this.setState({
                        cache: ous,
                        loading: false,
                    });

                    this.props.onUpdateSelection(ous.slice());
                })
                .catch(err => {
                    this.setState({ loading: false });
                    log.error('Failed to load all org units:', err);
                });
        }
    }

    handleDeselectAll() {
        this.props.onUpdateSelection([]);
    }

    render() {
        return (
            <div>
                <RaisedButton
                    style={style.button1}
                    label={this.getTranslation('select_all')}
                    onClick={this.handleSelectAll}
                    disabled={this.state.loading}
                />
                <RaisedButton
                    style={style.button}
                    label={this.getTranslation('deselect_all')}
                    onClick={this.handleDeselectAll}
                    disabled={this.state.loading}
                />
            </div>
        );
    }
}

OrgUnitSelectAll.propTypes = {
    // selected is an array of selected organisation unit IDs
    selected: React.PropTypes.array.isRequired,

    // Whenever the selection changes, onUpdateSelection will be called with
    // one argument: The new array of selected organisation units
    onUpdateSelection: React.PropTypes.func.isRequired,
};

OrgUnitSelectAll.contextTypes = { d2: React.PropTypes.object.isRequired };

export default OrgUnitSelectAll;

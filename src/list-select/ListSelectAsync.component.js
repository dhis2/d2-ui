import React from 'react';
import PropTypes from 'prop-types';
import { Observable } from 'rxjs';
import log from 'loglevel';
import ListSelect from './ListSelect.component';

const ListSelectAsync = React.createClass({
    propTypes: {
        source: PropTypes.instanceOf(Observable),
        onItemDoubleClick: PropTypes.func.isRequired,
        listStyle: PropTypes.object,
    },

    getInitialState() {
        return {
            listSource: [],
        };
    },

    componentWillMount() {
        if (!this.props.source) {
            return;
        }

        this.subscription = this.props.source
            .subscribe(
                listValues => this.setState({ listSource: listValues }),
                error => log.error(error),
            );
    },

    componentWillUnmount() {
        this.subscription && this.subscription.unsubscribe();
    },

    render() {
        return (
            <ListSelect
                {...this.props}
                onItemDoubleClick={this.props.onItemDoubleClick}
                source={this.state.listSource}
                listStyle={this.props.listStyle}
            />
        );
    },
});

export default ListSelectAsync;

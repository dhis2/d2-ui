import React from 'react';
import ListSelect from './ListSelect.component';
import {Observable} from 'rx/dist/rx.all';

const ListSelectAsync = React.createClass({
    propTypes: {
        source: React.PropTypes.instanceOf(Observable),
        onItemDoubleClick: React.PropTypes.func.isRequired,
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

        this.disposable = this.props.source
            .subscribe(
                (listValues) => this.setState({listSource: listValues}),
                (error) => log.error(error)
            );
    },

    componentWillUnmount() {
        this.disposable && this.disposable.dispose();
    },

    render() {
        return (
            <ListSelect onItemDoubleClick={this.props.onItemDoubleClick} source={this.state.listSource} />
        );
    },
});

export default ListSelectAsync;

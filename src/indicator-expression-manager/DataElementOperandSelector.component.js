import React from 'react';
import ListSelectAsync from '../list-select/ListSelectAsync.component';
import dataElementOperandStore from './dataElementOperand.store';
import dataElementOperandSelectorActions from './dataElementOperandSelector.actions';

const DataElementOperandSelector = React.createClass({
    propTypes: {
        dataElementOperandModelDefinition: React.PropTypes.object.isRequired,
        onItemDoubleClick: React.PropTypes.func.isRequired,
        listStyle: React.PropTypes.object,
    },

    componentWillMount() {
        if (this.props.dataElementOperandModelDefinition) {
            dataElementOperandSelectorActions.loadList(this.props.dataElementOperandModelDefinition.list());
        }

        this.storeObservable = dataElementOperandStore
            .tap(collection => this.setState({pager: collection.pager}))
            .map(collection => collection.toArray())
            .map(collection => {
                return collection.map(item => {
                    return {
                        label: item.displayName,
                        value: item.id,
                    };
                });
            });
    },

    render() {
        return (
            <div className="data-element-operand-selector">
                <ListSelectAsync onItemDoubleClick={this.props.onItemDoubleClick}
                                 source={this.storeObservable}
                                 listStyle={this.props.listStyle}
                    />
            </div>
        );
    },
});

export default DataElementOperandSelector;

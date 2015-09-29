import React from 'react';
import ListSelectAsync from '../list-select/ListSelectAsync.component';
import dataElementOperandStore from './dataElementOperand.store';
import dataElementOperandSelectorActions from './dataElementOperandSelector.actions';
import TextField from 'material-ui/lib/text-field';
import LinearProgress from 'material-ui/lib/linear-progress';
import Pagination from '../pagination/Pagination.component';

const DataElementOperandSelector = React.createClass({
    propTypes: {
        dataElementOperandSelectorActions: React.PropTypes.object.isRequired,
        onItemDoubleClick: React.PropTypes.func.isRequired,
        listStyle: React.PropTypes.object,
    },

    getInitialState() {
        return {
            isLoading: true,
            pager: {
                hasNextPage: () => false,
                hasPreviousPage: () => false,
            },
        };
    },

    componentWillMount() {
        if (this.props.dataElementOperandSelectorActions) {
            dataElementOperandSelectorActions.loadList();
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
            })
            .tap((value) => {
                this.setState({isLoading: false});
                return value;
            });

        this.disposable = this.storeObservable
            .map(collection => collection.pager)
            .filter(pager => Boolean(pager))
            .subscribe(pager => {
                this.setState({
                    pager: pager,
                });
            });
    },

    componentWillUnmount() {
        this.disposable && this.disposable.dispose();
    },

    getNextPage() {
        this.setState({isLoading: true});
        this.props.dataElementOperandSelectorActions.getNextPage(this.state.pager);
    },

    getPreviousPage() {
        this.setState({isLoading: true});
        this.props.dataElementOperandSelectorActions.getPreviousPage(this.state.pager);
    },

    render() {
        return (
            <div className="data-element-operand-selector">
                <Pagination hasNextPage={() => this.state.pager.hasNextPage()}
                            hasPreviousPage={() => this.state.pager.hasPreviousPage()}
                            onNextPageClick={this.getNextPage}
                            onPreviousPageClick={this.getPreviousPage}
                    />
                <TextField hintText={this.i18n.search} onChange={this.searchDataElement} />
                {this.state.isLoading ? <LinearProgress mode="indeterminate"  /> : null}
                <ListSelectAsync onItemDoubleClick={this.props.onItemDoubleClick}
                                 source={this.storeObservable}
                                 listStyle={this.props.listStyle}
                    />
            </div>
        );
    },

    searchDataElement(event) {
        const value = event.target.value;
        this.props.dataElementOperandSelectorActions.search(value)
            .subscribe(() => {
                this.setState({isLoading: false});
            });

        this.setState({isLoading: true});
    },

    i18n: {
        search: 'search_by_name',
    },
});

export default DataElementOperandSelector;

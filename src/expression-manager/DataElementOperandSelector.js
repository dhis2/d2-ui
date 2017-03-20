import React from 'react';
import ListSelectAsync from '../list-select/ListSelectAsync.component';
import TextField from 'material-ui/TextField/TextField';
import LinearProgress from 'material-ui/LinearProgress/LinearProgress';
import Pagination from '../pagination/Pagination.component';
import Translate from '../i18n/Translate.mixin';
import Store from '../store/Store';
import { createDataElementOperandActions, subscribeDataElementActionsToStore } from './dataElementOperandSelector.actions';
import { config } from 'd2/lib/d2';

config.i18n.strings.add('search_by_name');

const DataElementOperandSelector = React.createClass({
    propTypes: {
        dataElementOperandSelectorActions: React.PropTypes.object,
        dataElementOperandStore: React.PropTypes.object,
        onItemDoubleClick: React.PropTypes.func.isRequired,
        listStyle: React.PropTypes.object,
    },

    mixins: [Translate],

    getDefaultProps() {
        return {
            dataElementOperandSelectorActions: createDataElementOperandActions(),
            dataElementOperandStore: Store.create(),
        };
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
        this.actionSubscriptions = subscribeDataElementActionsToStore(this.props.dataElementOperandSelectorActions, this.props.dataElementOperandStore);

        if (this.props.dataElementOperandSelectorActions) {
            this.props.dataElementOperandSelectorActions.loadList();
        }

        this.storeObservable = this.props.dataElementOperandStore
            .do(collection => this.setState({ pager: collection.pager }))
            .map(collection => collection.toArray())
            .map(collection => {
                return collection.map(item => {
                    return {
                        label: item.displayName,
                        value: item.id,
                    };
                });
            })
            .do((value) => {
                this.setState({ isLoading: false });
                return value;
            });

        this.disposable = this.storeObservable
            .map(collection => collection.pager)
            .filter(pager => Boolean(pager))
            .subscribe(pager => {
                this.setState({ pager });
            });
    },

    componentWillUnmount() {
        this.disposable && this.disposable.unsubscribe();
        this.actionSubscriptions.forEach(subscription => subscription.unsubscribe());
    },

    getNextPage() {
        this.setState({ isLoading: true });
        this.props.dataElementOperandSelectorActions.getNextPage(this.state.pager, this.state.searchValue);
    },

    getPreviousPage() {
        this.setState({ isLoading: true });
        this.props.dataElementOperandSelectorActions.getPreviousPage(this.state.pager, this.state.searchValue);
    },

    render() {
        return (
            <div className="data-element-operand-selector">
                <div style={{ float: 'right' }}>
                <Pagination
                    hasNextPage={() => this.state.pager.hasNextPage()}
                    hasPreviousPage={() => this.state.pager.hasPreviousPage()}
                    onNextPageClick={this.getNextPage}
                    onPreviousPageClick={this.getPreviousPage}
                />
                </div>
                <TextField
                    style={{marginLeft: '1rem'}}
                    hintText={this.getTranslation('search_by_name')}
                    onChange={this.searchDataElement}
                />
                {this.state.isLoading ? <LinearProgress mode="indeterminate" /> : null}
                <ListSelectAsync
                    size={12}
                    onItemDoubleClick={this.props.onItemDoubleClick}
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
                this.setState({
                    isLoading: false,
                    searchValue: value,
                });
            });

        this.setState({ isLoading: true });
    },
});

export default DataElementOperandSelector;

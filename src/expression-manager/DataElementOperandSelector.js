import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { config } from 'd2/lib/d2';

import TextField from 'material-ui/TextField/TextField';
import LinearProgress from 'material-ui/LinearProgress/LinearProgress';

import ListSelectAsync from '../list-select/ListSelectAsync.component';
import Pagination from '../pagination/Pagination.component';
import Store from '../store/Store';
import {
    createDataElementOperandActions,
    subscribeDataElementActionsToStore,
} from './dataElementOperandSelector.actions';

config.i18n.strings.add('search_by_name');

const styles = {
    list: {
        width: '100%',
        outline: 'none',
        border: 'none',
        padding: '0rem 1rem',
    },
    pagination: {
        float: 'right',
    },
    textField: {
        marginLeft: '1rem',
    },
};

class DataElementOperandSelector extends Component {
    constructor(props, context) {
        super(props, context);

        const i18n = this.context.d2.i18n;
        this.getTranslation = i18n.getTranslation.bind(i18n);
    }

    state = {
        isLoading: true,
        pager: {
            hasNextPage: () => false,
            hasPreviousPage: () => false,
        },
    };

    componentWillMount() {
        this.actionSubscriptions = subscribeDataElementActionsToStore(this.props.dataElementOperandSelectorActions, this.props.dataElementOperandStore);

        if (this.props.dataElementOperandSelectorActions) {
            this.props.dataElementOperandSelectorActions.loadList();
        }

        this.storeObservable = this.props.dataElementOperandStore
            .do(collection => this.setState({ pager: collection.pager }))
            .map(collection => collection.toArray())
            .map(collection => collection.map(item => ({
                label: item.displayName,
                value: item.id,
            })))
            .do((value) => {
                this.setState({ isLoading: false });
                return value;
            });

        this.disposable = this.storeObservable
            .map(collection => collection.pager)
            .filter(pager => Boolean(pager))
            .subscribe((pager) => {
                this.setState({ pager });
            });
    }

    componentWillUnmount() {
        this.disposable && this.disposable.unsubscribe();
        this.actionSubscriptions.forEach(subscription => subscription.unsubscribe());
    }

    getNextPage = () => {
        this.setState({ isLoading: true });
        this.props.dataElementOperandSelectorActions.getNextPage(this.state.pager, this.state.searchValue);
    }

    getPreviousPage = () => {
        this.setState({ isLoading: true });
        this.props.dataElementOperandSelectorActions.getPreviousPage(this.state.pager, this.state.searchValue);
    }

    searchDataElement = (event) => {
        const value = event.target.value;
        this.props.dataElementOperandSelectorActions.search(value)
            .subscribe(() => {
                this.setState({
                    isLoading: false,
                    searchValue: value,
                });
            });

        this.setState({ isLoading: true });
    }

    render() {
        return (
            <div className="data-element-operand-selector">
                <div style={styles.pagination}>
                    <Pagination
                        hasNextPage={() => this.state.pager.hasNextPage()}
                        hasPreviousPage={() => this.state.pager.hasPreviousPage()}
                        onNextPageClick={this.getNextPage}
                        onPreviousPageClick={this.getPreviousPage}
                    />
                </div>
                <TextField
                    style={styles.textField}
                    hintText={this.getTranslation('search_by_name')}
                    onChange={this.searchDataElement}
                />
                {this.state.isLoading && <LinearProgress mode="indeterminate" />}
                <ListSelectAsync
                    size={12}
                    onItemDoubleClick={this.props.onSelect}
                    source={this.storeObservable}
                    listStyle={this.props.listStyle}
                />
            </div>
        );
    }
}

DataElementOperandSelector.propTypes = {
    dataElementOperandSelectorActions: PropTypes.object,
    dataElementOperandStore: PropTypes.object,
    onSelect: PropTypes.func.isRequired,
    listStyle: PropTypes.object,
};

DataElementOperandSelector.defaultProps = {
    dataElementOperandSelectorActions: createDataElementOperandActions(),
    dataElementOperandStore: Store.create(),
    listStyle: styles.list,
};

DataElementOperandSelector.contextTypes = {
    d2: PropTypes.object,
};

export default DataElementOperandSelector;

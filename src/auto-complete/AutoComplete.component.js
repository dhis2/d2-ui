import {createClass, PropTypes, default as React} from 'react';
import TextField from 'material-ui/TextField';
import Action from '../action/Action';
import {Observable, helpers, Scheduler, default as Rx} from 'rx';
import {config} from 'd2/lib/d2';
import d2Lib from 'd2/lib/d2';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Paper from 'material-ui/Paper';
import Translate from '../i18n/Translate.mixin';
import log from 'loglevel';

config.i18n.strings.add('members');
config.i18n.strings.add('search_for_user_groups');

function searchByForModel(searchBy, modelTypeToSearch, valueToSearchFor, options = {}) {
    if (!Boolean(modelTypeToSearch) || !Boolean(valueToSearchFor)) {
        log.warn('forType property and value should be provided to be able to show results');

        return Observable.just([]);
    }

    const searchQueryRequest = d2Lib.getInstance()
        .then(d2 => d2.models[modelTypeToSearch])
        .then(modelType => modelType.filter().on(searchBy).ilike(valueToSearchFor))
        .then(modelTypeWithFilter => modelTypeWithFilter.list(options))
        .then(collection => collection.toArray())
        .catch(error => log.error(error));

    return Observable.fromPromise(searchQueryRequest);
}

const AutoComplete = createClass({
    propTypes: {
        actions: PropTypes.object,
        forType: PropTypes.string.isRequired,
        onSuggestionClicked: PropTypes.func.isRequired,
        closeOnItemClicked: PropTypes.bool,
        clearValueOnItemClicked: PropTypes.bool,
        filterForSuggestions: PropTypes.func,
    },

    mixins: [Translate],

    getDefaultProps() {
        return {
            actions: Action.createActionsFromNames(['loadAutoCompleteSuggestions']),
            debounceTime: 500,
            propertyToSearchBy: 'displayName',
            scheduler: Scheduler.default,
            closeOnItemClicked: true,
            clearValueOnItemClicked: true,
        };
    },
    //
    getInitialState() {
        return {
            showAutoComplete: false,
            autoCompleteValues: [],
            loadingSuggestions: false,
        };
    },

    componentWillMount() {
        const {actions, forType} = this.props;
        let searchValue;

        this.disposable = actions.loadAutoCompleteSuggestions
            .map(({ data: args }) => args[1])
            .tap(value => {
                searchValue = value;
                this.setState({
                    loadingSuggestions: true,
                    showAutoComplete: Boolean(value),
                    value: searchValue,
                });
            })
            .debounce(this.props.debounceTime, this.props.scheduler)
            .distinctUntilChanged()
            // TODO: Do not hardcore these fields to search for
            .map(valueToSearchFor => searchByForModel(this.props.propertyToSearchBy, forType, valueToSearchFor, {fields: 'id,displayName|rename(name),users::size', pageSize: 10}))
            .concatAll()
            .map(suggestions => Array.isArray(suggestions) ? suggestions.filter(this.props.filterForSuggestions || helpers.identity) : [])
            .map(suggestions => suggestions.slice(0, 5))
            .subscribe(
                autoCompleteValues => this.setState({
                    autoCompleteValues,
                    loadingSuggestions: false,
                    value: searchValue,
                }),
                (errorMessage) => log.error(errorMessage)
            );
    },

    componentWillUnmount() {
        this.disposable && this.disposable.dispose();
    },

    onSuggestionClick(item) {
        return event => {
            const {
                closeOnItemClicked,
                clearValueOnItemClicked,
                onSuggestionClicked,
                } = this.props;

            if (closeOnItemClicked) {
                this.refs.autoCompleteField.focus();
            }

            if (clearValueOnItemClicked) {
                this.props.actions.loadAutoCompleteSuggestions({
                    target: {value: ''},
                });
            }

            this.setState({
                showAutoComplete: !closeOnItemClicked,
                value: clearValueOnItemClicked ? '' : this.state.value,
            });

            if (onSuggestionClicked) {
                onSuggestionClicked(item, event);
            }
        };
    },

    // TODO: Allow the component user to specify how to render the list items or at least the primary and secondary texts
    renderAutoCompleteSuggestions() {
        return (
            <div style={{position: 'absolute', zIndex: 100}}>
                <Paper>
                    <List>
                        {this.state.autoCompleteValues.map(userGroup => {
                            return (
                                <ListItem
                                    primaryText={userGroup.name}
                                    secondaryText={`${userGroup.users} ${this.getTranslation('members')}`}
                                    innerDivStyle={{paddingTop: '.5rem', paddingBottom: '.5rem'}}
                                    onClick={this.onSuggestionClick(userGroup)}
                                    />
                            );
                        })}
                    </List>
                </Paper>
            </div>
        );
    },

    render() {
        const {actions, forType, ...other} = this.props;

        return (
            <div style={{position: 'relative'}} onClick={event => event.stopPropagation()}>
                <TextField
                    ref="autoCompleteField" {...other}
                    onChange={actions.loadAutoCompleteSuggestions}
                    hintText={this.getTranslation('search_for_user_groups')}
                    value={this.state.value}
                    fullWidth
                />
                {(this.state.showAutoComplete && !this.state.loadingSuggestions) ? this.renderAutoCompleteSuggestions() : null}
            </div>
        );
    },
});

export default AutoComplete;

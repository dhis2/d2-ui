import {createClass, PropTypes, default as React} from 'react';
import TextField from 'material-ui/lib/text-field';
import Action from 'd2-flux/action/Action';
import {Observable, helpers} from 'rx';
import {getInstance, config} from 'd2/lib/d2';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Paper from 'material-ui/lib/paper';
import Translate from '../i18n/Translate.mixin';
import log from 'loglevel';

config.i18n.strings.add('members');
config.i18n.strings.add('search_for_user_groups');

function searchByForModel(searchBy, modelTypeToSearch, valueToSearchFor, options = {}) {
    if (!Boolean(valueToSearchFor)) {
        return Observable.just([]);
    }

    const searchQueryRequest = getInstance()
        .then(d2 => d2.models[modelTypeToSearch])
        .then(modelType => modelType.filter().on(searchBy).ilike(valueToSearchFor))
        .then(modelTypeWithFilter => modelTypeWithFilter.list(options))
        .then(collection => collection.toArray());

    return Observable.fromPromise(searchQueryRequest);
}

export default createClass({
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
            closeOnItemClicked: true,
            clearValueOnItemClicked: true,
        };
    },

    getInitialState() {
        return {
            showAutoComplete: false,
            autoCompleteValues: [],
            loadingSuggestions: false,
        };
    },

    componentWillMount() {
        const {actions, forType} = this.props;

        this.disposable = actions.loadAutoCompleteSuggestions
            .map(({data: event}) => event.target.value)
            .tap(value => this.setState({
                loadingSuggestions: true,
                showAutoComplete: Boolean(value),
            }))
            .debounce(500)
            .distinctUntilChanged()
            .map(valueToSearchFor => searchByForModel('name', forType, valueToSearchFor, {fields: 'id,displayName|rename(name),users::size', pageSize: 10}))
            .concatAll()
            .map(suggestions => suggestions.filter(this.props.filterForSuggestions || helpers.identity))
            .map(suggestions => suggestions.slice(0, 5))
            .subscribe(
                autoCompleteValues => this.setState({
                    autoCompleteValues,
                    loadingSuggestions: false,
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
                this.refs.autoCompleteField.setValue('');
                this.props.actions.loadAutoCompleteSuggestions({
                    target: {value: ''},
                });
            }

            this.setState({
                showAutoComplete: !closeOnItemClicked,
            });

            if (onSuggestionClicked) {
                onSuggestionClicked(item, event);
            }
        };
    },

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
                    fullWidth
                />
                {(this.state.showAutoComplete && !this.state.loadingSuggestions) ? this.renderAutoCompleteSuggestions() : null}
            </div>
        );
    },
});

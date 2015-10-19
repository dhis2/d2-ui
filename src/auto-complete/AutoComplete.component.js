import {createClass, default as React} from 'react';
import TextField from 'material-ui/lib/text-field';
import Action from 'd2-flux/action/Action';
import {Observable} from 'rx';
import {getInstance} from 'd2/lib/d2';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Paper from 'material-ui/lib/paper';

function searchByForModel(searchBy, modelTypeToSearch, valueToSearchFor) {
    const searchQueryRequest = getInstance()
        .then(d2 => d2.models[modelTypeToSearch])
        .then(modelType => modelType.filter().on(searchBy).like(valueToSearchFor))
        .then(modelTypeWithFilter => modelTypeWithFilter.list())
        .then(collection => collection.toArray());

    return Observable.fromPromise(searchQueryRequest);
}

export default createClass({
    getDefaultProps() {
        return {
            actions: Action.createActionsFromNames(['loadAutoCompleteSuggestions']),
        };
    },

    getInitialState() {
        return {
            showAutoComplete: false,
            autoCompleteValues: [],
        };
    },

    componentWillMount() {
        const {actions, forType} = this.props;

        this.disposable = actions.loadAutoCompleteSuggestions
            .map(({data: event}) => {
                return event.target.value;
            })
            .tap(value => this.setState({showAutoComplete: Boolean(value)}))
            .debounce(500)
            .distinctUntilChanged()
            .map(valueToSearchFor => searchByForModel('name', forType, valueToSearchFor))
            .concatAll()
            .map(suggestionsList => {
                // TODO: Instead of limiting the results here we probably want to limit them on the api side
                return Observable.fromArray(suggestionsList)
                    .take(10)
                    .reduce((all, value) => all.concat(value), []);
            })
            .concatAll()
            .subscribe(
                autoCompleteValues => this.setState({autoCompleteValues}),
                (errorMessage) => console.error(errorMessage)
            );
    },

    componentWillUnmount() {
        this.disposable && this.disposable.dispose();
    },

    render() {
        const {
            actions,
            forType,
            ...other,
        } = this.props;

        return (
            <div style={{position: 'relative'}} onClick={event => event.stopPropagation()}>
                <TextField ref="autoCompleteField" {...other} onChange={actions.loadAutoCompleteSuggestions} />
                {this.state.showAutoComplete ? this.renderAutoCompleteSuggestions() : null}
            </div>
        );
    },

    renderAutoCompleteSuggestions() {
        return (
            <div style={{position: 'absolute', zIndex: 100}}>
                <Paper>
                    <List>
                        {this.state.autoCompleteValues.map(value => {
                            return (<ListItem primaryText={value.name} />);
                        })}
                    </List>
                </Paper>
            </div>
        );
    },
});

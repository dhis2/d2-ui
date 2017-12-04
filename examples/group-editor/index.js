import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import D2Lib from 'd2/lib/d2';
import Store from '../../src/store/Store';
import GroupEditor from '../../src/group-editor/GroupEditor.component';

const itemStore = Store.create();
const assignedItemStore = Store.create();

const el = document.getElementById('app');
const dhisDevConfig = DHIS_CONFIG;
const baseUrl = `${dhisDevConfig.baseUrl}/api`;

class GroupEditorExample extends React.Component {
    styles = {
        card: {
            margin: 16,
            width: 650,
            float: 'left',
            transition: 'all 175ms ease-out',
        },
        cardText: {
            paddingTop: 0,
        },
        cardHeader: {
            padding: '0 16px 16px',
            margin: '16px -16px',
            borderBottom: '1px solid #eeeeee',
        },
    };

    getChildContext() {
        return {
            d2: this.props.d2
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            filterText: '',
        };

        this.props.d2.i18n.translations['assign_all'] = 'Assign all';
        this.props.d2.i18n.translations['hidden_by_filters'] = 'Hidden by filters';

        this.filterChange = this.filterChange.bind(this);
    }

    static addItem() {
        if (!itemStore.state) {
            itemStore.state = [];
            assignedItemStore.state = [];
        }

        itemStore.state.push({ value: itemStore.state.length.toString(), text: `Item ${itemStore.state.length+1}` });
        itemStore.setState(itemStore.state);
    }

    static removeItem() {
        if (itemStore.state) {
            itemStore.state.pop();
            itemStore.setState(itemStore.state);
        }
    }

    static addAssignedItem() {
        if (!itemStore.state) {
            itemStore.state = [];
            assignedItemStore.state = [];
        }

        const item = { value: itemStore.state.length.toString(), text: `Item ${itemStore.state.length+1}` };

        if (!itemStore.state) {
            itemStore.state = [];
            assignedItemStore.state = [];
        }

        itemStore.state.push(item);
        assignedItemStore.state.push(item.value);

        itemStore.setState(itemStore.state);
        assignedItemStore.setState(assignedItemStore.state);
    }

    static removeAssignedItem() {
        if (assignedItemStore.state) {
            const item = assignedItemStore.state.pop();
            assignedItemStore.setState(assignedItemStore.state);
            itemStore.setState(itemStore.state.filter(i => i.value !== item));
        }
    }

    static assignItems(items) {
        const assigned = assignedItemStore.state.concat(items);
        assignedItemStore.setState(assigned);
        return Promise.resolve();
    }

    static unassignItems(items) {
        const assigned = assignedItemStore
            .state
            .filter(item => items.indexOf(item) === -1);
        assignedItemStore.setState(assigned);
        return Promise.resolve();
    }

    static stopLoading() {
        if (!itemStore.state) {
            itemStore.setState([]);
            assignedItemStore.setState([]);
        }
    }

    static startLoading() {
        itemStore.setState(false);
        assignedItemStore.setState(undefined);
    }

    filterChange(e) {
        this.setState({ filterText: e.target.value });
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}><div>
                <Card style={Object.assign({}, this.styles.card, { width: 250 })}>
                    <CardText style={this.styles.cardText}>
                        <h3 style={this.styles.cardHeader}>Data controls</h3>
                        <button onClick={GroupEditorExample.addItem}>+ Item</button>
                        <button onClick={GroupEditorExample.removeItem}>- Item</button>
                        <br/>
                        <button onClick={GroupEditorExample.addAssignedItem}>+ Assigned</button>
                        <button onClick={GroupEditorExample.removeAssignedItem}>- Assigned</button>
                        <br/>
                        <button onClick={GroupEditorExample.stopLoading}>Stop loading</button>
                        <button onClick={GroupEditorExample.startLoading}>Start loading</button>
                        <br/>
                        <label>Filter: <input onChange={this.filterChange} value={this.state.filterText} /></label>
                        <br/>
                        <button onClick={this.filterChange.bind(this, { target: { value: '' }})}>Clear filter</button>
                    </CardText>
                </Card>

                <Card style={this.styles.card}>
                    <CardText style={this.styles.cardText}>
                        <h3 style={this.styles.cardHeader}>Group editor</h3>
                        <div className="scroll">
                            <GroupEditor
                                itemStore={itemStore}
                                assignedItemStore={assignedItemStore}
                                onAssignItems={GroupEditorExample.assignItems}
                                onRemoveItems={GroupEditorExample.unassignItems}
                                height={250}
                                filterText={this.state.filterText}
                            />
                        </div>
                    </CardText>
                </Card>
            </div></MuiThemeProvider>
        );
    }
}
GroupEditorExample.childContextTypes = { d2: PropTypes.object };

ReactDOM.render(<div>Initializing...</div>, el);

D2Lib.config.baseUrl = baseUrl;
D2Lib.init({ baseUrl })
    .then(d2 => ReactDOM.render(<GroupEditorExample d2={d2}/>, el)
    )
    .catch(err => {
        console.error(err);
        ReactDOM.render(<div>Fail!</div>, el)
    });

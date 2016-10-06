import React from 'react';
import ReactDOM from 'react-dom';
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

        itemStore.setState([]);
        assignedItemStore.setState([]);

        this.props.d2.i18n.translations['assign_all'] = 'Assign all';
        this.props.d2.i18n.translations['hidden_by_filters'] = 'Hidden by filters';

        this.filterChange = this.filterChange.bind(this);
    }

    static addItem() {
        itemStore.state.push({ value: itemStore.state.length.toString(), text: `Item ${itemStore.state.length+1}` });
        itemStore.setState(itemStore.state);
    }

    static removeItem() {
        itemStore.state.pop();
        itemStore.setState(itemStore.state);
    }

    static addAssignedItem() {
        const item = { value: itemStore.state.length.toString(), text: `Item ${itemStore.state.length+1}` };

        itemStore.state.push(item);
        assignedItemStore.state.push(item.value);

        itemStore.setState(itemStore.state);
        assignedItemStore.setState(assignedItemStore.state);
    }

    static removeAssignedItem() {
        const item = assignedItemStore.state.pop();
        assignedItemStore.setState(assignedItemStore.state);
        itemStore.setState(itemStore.state.filter(i => i.value !== item));
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

    filterChange(e) {
        this.setState({ filterText: e.target.value });
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}><div>
                <Card style={Object.assign({}, this.styles.card, { width: 250 })}>
                    <CardText style={this.styles.cardText}>
                        <h3 style={this.styles.cardHeader}>Data controls</h3>
                        <ul style={{ cursor: 'pointer' }}>
                            <li onClick={GroupEditorExample.addItem}>Add item</li>
                            <li onClick={GroupEditorExample.removeItem}>Remove item</li>
                            <li onClick={GroupEditorExample.addAssignedItem}>Add assigned item</li>
                            <li onClick={GroupEditorExample.removeAssignedItem}>Remove assigned item</li>
                        </ul>
                        <input onChange={this.filterChange} />
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
GroupEditorExample.childContextTypes = { d2: React.PropTypes.object };

ReactDOM.render(<div>Initializing...</div>, el);

D2Lib.config.baseUrl = baseUrl;
D2Lib.init({ baseUrl })
    .then(d2 => ReactDOM.render(<GroupEditorExample d2={d2}/>, el)
    )
    .catch(err => {
        console.error(err);
        ReactDOM.render(<div>Fail!</div>, el)
    });

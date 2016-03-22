import React from 'react';
import Form from '../src/forms/Form.component';
import TextField from 'material-ui/lib/text-field';
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import {init, getInstance} from 'd2/lib/d2';
import Store from 'd2-flux/store/Store';

import IndicatorExpressionManagerExample from './IndicatorExpressionManagerExample';
import SharingDialogExample from './SharingDialogExample';

import GroupEditorWithOrdering from '../src/group-editor/GroupEditorWithOrdering.component';
import GroupEditor from '../src/group-editor/GroupEditor.component';

const style = {
    spacing: Spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: Colors.blue500,
        primary2Color: Colors.blue700,
        primary3Color: Colors.lightBlack,
        accent1Color: '#276696',
        accent2Color: '#E9E9E9',
        accent3Color: Colors.grey500,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.white,
        borderColor: Colors.grey300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    },
};

const alwaysWrong = (value) => {
    return value.length > 2;
};
alwaysWrong.message = 'Always wrong LOL!';

let alwaysAsyncTimeout = null;
const alwaysAsync = (value) => {
    return new Promise((resolve, reject) => {
        if (alwaysAsyncTimeout) {
            clearTimeout(alwaysAsyncTimeout);
            alwaysAsyncTimeout = null;
        }

        setTimeout(() => {
            if (value.length < 8) {
                resolve(true);
            } else {
                reject('Not shorter than 8');
            }
            alwaysAsyncTimeout = null;
        }, 500);
    });
};

function notDataElementName(value) {
    return getInstance()
        .then(d2 => {
            return d2.models.dataElement
                .filter()
                .on('name')
                .equals(value)
                .list();
        })
        .then(modelCollection => modelCollection.toArray())
        .then(modelCollection => {
            if (modelCollection.length === 0) {
                return true;
            }
            return Promise.reject('Already exists');
        });
}

const fcs = [
    {
        name: 'username',
        type: TextField,
        fieldOptions: {
            floatingLabelText: 'username',
        },
    },
    {
        name: 'password',
        type: TextField,
        fieldOptions: {
            floatingLabelText: 'password',
        },
        validators: [
            alwaysWrong,
            notDataElementName,
        ],
    },
];

const user = {
    username: 'Mark',
    password: 'SuperSecret',
};

function renderExamples(d2) {
    const Main = React.createClass({

        childContextTypes: {
            muiTheme: React.PropTypes.object,
            d2: React.PropTypes.object,
        },

        getChildContext() {
            return {
                muiTheme: ThemeManager.getMuiTheme(style),
                d2: d2,
            };
        },

        render() {
            return (
                <div>
                    <GroupEditorWithOrdering {...this.props.groupEditorProps} />
                </div>
            );
        },
    });

    React.render(
        <div>Loading data...</div>,
        document.getElementById('app')
    );

    Promise.all([d2.models.category.get('KfdsGBcoiCa', {fields: ':all,categoryOptions[id,displayName]'}), d2.models.categoryOption.list({paging: false})])
        .then(([category, categoryOptions]) => {
            const itemStore = Store.create();
            itemStore.state = categoryOptions;
            const assignedItemStore = Store.create();
            assignedItemStore.state = category.categoryOptions.toArray().map(value => value.id);

            assignedItemStore
                .subscribe((modelCollection) => {
                    console.log(category.categoryOptions.toArray().map(m => m.displayName || m.name));
                });

            const handlers = {
                onRemoveItems: (items) => {
                    items.forEach(item => {
                        category.categoryOptions.delete(itemStore.state.get(item).id);
                        assignedItemStore.setState(category.categoryOptions.toArray().map(value => value.id));
                    });
                    return Promise.resolve(true);
                },
                onAssignItems: (items) => {
                    items.forEach(item => {
                        category.categoryOptions.add(itemStore.state.get(item));
                        assignedItemStore.setState(category.categoryOptions.toArray().map(value => value.id));
                    });

                    return Promise.resolve(true);
                },
                onOrderChanged(newOrder) {
                    const itemList = itemStore.getState();

                    // Reset the ModelCollectionProperty / ModelCollection
                    category.categoryOptions.clear();

                    // Add the items back in the correct order
                    newOrder.forEach(item => {
                        if (itemList.has(item)) {
                            category.categoryOptions.add(itemList.get(item));
                        }
                    });

                    // Set the state to the store to emit the value to all subscribers
                    assignedItemStore.setState(category.categoryOptions.toArray().map(value => value.id));
                }
            }

            React.render(
                <Main d2={d2} groupEditorProps={{itemStore, assignedItemStore, ...handlers}} />,
                document.getElementById('app')
            );
        });
}

jQuery.ajaxSetup({
    headers: {
//         Authorization: 'Basic ' + btoa('markpo:Markpo1234')
//        Authorization: 'Basic ' + btoa('system:System123')
                Authorization: 'Basic ' + btoa('admin:district')
//                Authorization: 'Basic ' + btoa('user:Admin123')
    },
});


init({baseUrl: 'http://localhost:8080/dhis/api'}).then(renderExamples);



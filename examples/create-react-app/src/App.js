import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';

import Buttons from './components/button';
import Chips from './components/chip';
import CircularProgresses from './components/circular-progress';
import Controlbars from './components/controlbar';
import Tables from './components/table';
import ExpressionManager from './components/expression-manager';
import FileMenu from './components/file-menu';
import FavoritesDialog from './components/favorites-dialog';
import SharingDialog from './components/sharing';
import FeedbackSnackbar from './components/feedback-snackbar';
import FormBuilder from './components/form-builder';
import GroupEditor from './components/group-editor';
import Layout from './components/layout';
import Legend from './components/legend';
import PeriodPicker from './components/period-picker';
import SelectField from './components/select-field';
import Sidebar from './components/sidebar';
import SvgIcon from './components/svg-icon';
import TextField from './components/text-field';
import Tabs from './components/tabs';
import Translation from './components/translation';
import HeaderBarExample from './components/header-bar';
import InterpretationsExample from './components/interpretations';
import Containers from './components/containers';

import FormEditor from './components/formula-editor';
import IconPicker from './components/icon-picker';

import ListSelectExamples from './components/list-select.js';

import D2UIApp from '@dhis2/d2-ui-app';

/** these examples need to be rewritten */
import OrgUnitSelect from './components/org-unit-select';
import OrgUnitTree from './components/org-unit-tree';
import TreeViews from './components/tree-view';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            d2: props.d2,
        };
    }

    getChildContext() {
        return { d2: this.state.d2 };
    }

    render() {
        if (!this.state.d2) {
            console.log('no');
            return null;
        }

        return (
            <D2UIApp>
                <header className="header">
                    <h1 className="App-title">Welcome to the DHIS2 UI library</h1>
                </header>

                <h2>HeaderBar</h2>
                <HeaderBarExample d2={this.state.d2} />
                <p>Look at the top of the screen...</p>

                <h2>Containers</h2>
                <Containers />

                <h2>Buttons</h2>
                <Buttons />

                <h2>Chips</h2>
                <Chips />

                <h2>Circular Progress</h2>
                <CircularProgresses />

                <h2>Controlbars</h2>
                <Controlbars />

                <h2>Tables</h2>
                <Tables d2={this.state.d2} />

                <h2>Expression Manager</h2>
                <ExpressionManager d2={this.state.d2} />

                <h2>File Menu</h2>
                <FileMenu d2={this.state.d2} />

                <h2>Favorites Dialog</h2>
                <FavoritesDialog d2={this.state.d2} />

                <h2>Sharing Dialog</h2>
                <SharingDialog d2={this.state.d2} />

                <h2>Feedback Snackbar</h2>
                <FeedbackSnackbar />

                <h2>FormBuilder</h2>
                <FormBuilder />

                <h2>GroupEditor</h2>
                <GroupEditor d2={this.state.d2} />

                <h2>Layout</h2>
                <Layout />

                <h2>Legend</h2>
                <Legend d2={this.state.d2} />

                <h2>List Select</h2>
                <ListSelectExamples />

                <h2>PeriodPicker</h2>
                <PeriodPicker d2={this.state.d2} />

                <h2>SelectField</h2>
                <SelectField />

                <h2>Sidebar</h2>
                <Sidebar />

                <h2>SvgIcon</h2>
                <SvgIcon />

                <h2>TextField</h2>
                <TextField />

                <h2>Tabs</h2>
                <Tabs />

                <h2>Translation</h2>
                <Translation d2={this.state.d2} />

                <h2>IconPicker</h2>
                <IconPicker d2={this.state.d2} />

                <h2>FormEditor</h2>
                <FormEditor />

                <h2>OrgUnitSelect</h2>
                <OrgUnitSelect d2={this.state.d2} />

                <h2>OrgUnitTree</h2>
                <OrgUnitTree d2={this.state.d2} />

                <div style={{clear:"both"}}>
                    <h2>TreeViews</h2>
                    <TreeViews />
                </div>

                <h2>Intepretations</h2>
                <InterpretationsExample d2={this.state.d2} />
            </D2UIApp>
        );
    }
}

App.childContextTypes = {
    d2: PropTypes.object,
};

App.propTypes = {
    d2: PropTypes.object.isRequired,
};
export default App;

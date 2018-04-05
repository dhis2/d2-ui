import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';

import Buttons from './components/button'
import Chips from './components/chip'
import Controlbars from './components/controlbar'
import DataTables from './components/data-table'
import ExpressionManager from './components/expression-manager'
import FavoritesDialog from './components/favorites-dialog'
import SharingDialog from './components/sharing'
import FeedbackSnackbar from './components/feedback-snackbar'
import FormBuilder from './components/form-builder'
import GroupEditor from './components/group-editor'
import Layout from './components/layout'
import Legend from './components/legend'
import PeriodPicker from './components/period-picker'
import SelectField from './components/select-field'
import Sidebar from './components/sidebar'
import SvgIcon from './components/svg-icon'
import TextField from './components/text-field'
import Tabs from './components/tabs'
import Translation from './components/translation'
import HeaderBar from './components/header-bar'

//import OrgUnitSelect from './components/org-unit-select'
//import FormEditor from './components/formula-editor'
//import IconPicker from './components/icon-picker'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
        d2: props.d2
    }
  }

  getChildContext() {
      return { d2: this.state.d2 };
  }

  render() {
    if (!this.state.d2) {
        console.log('no')
        return null
    }

    return (
      <div className="">
        <header className="header">
          <h1 className="App-title">Welcome to the DHIS2 UI library</h1>
        </header>

        <h2>Buttons</h2>
        <Buttons/>

        <h2>Chips</h2>
        <Chips/>

        <h2>Controlbars</h2>
        <Controlbars/>

        <h2>Data Tables</h2>
        <DataTables d2={this.state.d2}/>

        <h2>Expression Manager</h2>
        <ExpressionManager d2={this.state.d2}/>

        <h2>Favorites Dialog</h2>
        <FavoritesDialog d2={this.state.d2}/>

        <h2>Sharing Dialog</h2>
        <SharingDialog d2={this.state.d2}/>

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

        <h2>HeaderBar</h2>
        <HeaderBar d2={this.state.d2} />
  {/*
        <h2>IconPicker</h2>
        <IconPicker d2={this.state.d2} />

        <h2>OrgUnitSelect</h2>
        <OrgUnitSelect />

        <h2>FormEditor</h2>
        <FormEditor />

  */}

      </div>
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

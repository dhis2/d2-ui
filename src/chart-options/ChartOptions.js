import React, { Component } from 'react';
import Card, { CardContent } from 'material-ui-next/Card';
// import { connect } from 'react-redux';

import ChartTabs from './ChartTabs';
import DataOptions from './DataOptions';
import StyleOptions from './StyleOptions';
import AxesOptions from './AxesOptions';
import GeneralOptions from './GeneralOptions';
import './index.css';
import * as actionType from './ActionTypes';

class ChartOptions extends Component {
  showSelectedTab = (tabIndex) => {
      const tabComponentArray = [
          <DataOptions
              tabContent={this.props.tabContent.data}
              checkBoxContent={this.props.tabContent.checkbox}
              handleFieldChange={this.props.handleDataContentChange}
              handleCheckBoxChange={this.props.handleCheckBoxChange}
          />,
          <AxesOptions
              tabContent={this.props.tabContent.axes}
              handleChange={this.props.handleAxesContentChange}
          />,
          <StyleOptions
              tabContent={this.props.tabContent.checkbox}
              handleChange={this.props.handleCheckBoxChange}
          />,
      ];
      return tabComponentArray[tabIndex];
  }

  render = () => (
      <div className="chart">
          <Card>
              <CardContent>
                  <h3>Chart Options</h3>
                  <ChartTabs
                      activeTab={this.props.activeTab}
                      handleChange={this.props.handleTabChange}
                  />
                  {this.showSelectedTab(this.props.activeTab)}
                  <GeneralOptions
                      handleChange={this.props.handleCheckBoxChange}
                      tabContent={this.props.tabContent.checkbox}
                  />
              </CardContent>
          </Card>
      </div>
  )
}

/*
const mapStateToProps = state => ({
    activeTab: state.tabs.currentTab,
    tabContent: state.tabContent,
});

const mapDispatchToProps = dispatch => ({
    handleTabChange: (id) => {
        dispatch(actionType.updateTabIndex(id));
    },
    handleDataContentChange: (fieldName, event) => {
        dispatch(actionType.updateTabContent(fieldName, event.target.value));
    },
    handleAxesContentChange: (fieldName, event) => {
        dispatch(actionType.updateAxesContent(fieldName, event.target.value));
    },
    handleCheckBoxChange: (fieldName, event) => {
        dispatch(actionType.updateCheckBoxContent(fieldName, event.target.checked));
    },
});

const showActiveTab = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChartOptions);

*/
export default ChartOptions;

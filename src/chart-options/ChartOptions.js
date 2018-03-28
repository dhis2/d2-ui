import React, { Component } from 'react';
import Card, { CardContent } from 'material-ui-next/Card';

import ChartTabs from './ChartTabs';
import DataOptions from './DataOptions';
import StyleOptions from './StyleOptions';
import AxesOptions from './AxesOptions';
import GeneralOptions from './GeneralOptions';
import './index.css';

class ChartOptions extends Component {
  showSelectedTab = (tabIndex) => {
      const tabComponentArray = [
          <DataOptions
              tabContent={this.props.optionsValues}
              onChange={this.props.onOptionsChange}
          />,
          <AxesOptions
              tabContent={this.props.optionsValues}
              onChange={this.props.onOptionsChange}
          />,
          <StyleOptions
              tabContent={this.props.optionsValues}
              onChange={this.props.onOptionsChange}
          />,
      ];
      return tabComponentArray[tabIndex];
  };
  render = () => (
      <div className="chart">
          <Card>
              <CardContent>
                  <h3>Chart Options</h3>
                  <ChartTabs
                      activeTab={this.props.activeTab}
                      onChange={this.props.onTabChange}
                  />
                  {this.showSelectedTab(this.props.activeTab)}
                  <GeneralOptions
                      tabContent={this.props.optionsValues}
                      onChange={this.props.onOptionsChange}
                  />
              </CardContent>
          </Card>
      </div>
  );
}
export default ChartOptions;

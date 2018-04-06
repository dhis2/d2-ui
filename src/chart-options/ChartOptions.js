import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card, { CardContent } from 'material-ui-next/Card';
import { createClassName } from '../component-helpers/utils';
import ChartTabs from './ChartTabs';
import DataOptions from './DataOptions';
import StyleOptions from './StyleOptions';
import AxesOptions from './AxesOptions';
import GeneralOptions from './GeneralOptions';

const chartStyle = {
    chart: {
        marginLeft: 120,
        marginRight: 120,
    },
};
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
  render = () => {
      const className = createClassName('d2-ui-chartoptions', this.props.selector);

      return (
          <div className={className} style={chartStyle.chart}>
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
  };
}

ChartOptions.propTypes = {
    activeTab: PropTypes.number,
    selector: PropTypes.string,
    onTabChange: PropTypes.func.isRequired,
    optionsValues: PropTypes.object,
    onOptionsChange: PropTypes.func.isRequired,
};

ChartOptions.defaultProps = {
    activeTab: 0,
    selector: undefined,
    optionsValues: {},
};
export default ChartOptions;

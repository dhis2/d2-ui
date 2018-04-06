import React from 'react';
import PropTypes from 'prop-types';
import Tabs, { Tab } from 'material-ui-next/Tabs';
import AppBar from 'material-ui-next/AppBar';
import strings from './utils';

const ChartTabs = props => (
    <div>
        <AppBar position="sticky" color="default">
            <Tabs
                centered
                value={props.activeTab}
                onChange={(event, value) => { props.onChange(value); }}
            >
                <Tab label={strings.tabs.dataLabel} />
                <Tab label={strings.tabs.axesLabel} />
                <Tab label={strings.tabs.stylesLabel} />
            </Tabs>
        </AppBar>
    </div>
);

ChartTabs.propTypes = {
    activeTab: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};
export default ChartTabs;

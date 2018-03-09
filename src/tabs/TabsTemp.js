import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs, { Tab } from 'material-ui-next/Tabs';
import { createClassName } from '../component-helpers/utils';

class TabsTemp extends Component {
    state = { tabIndex: 'one' };

    handleChange = (event, value) => {
        this.setState({ tabIndex: value });
    }

    render = () => (
        <Tabs value={this.state.tabIndex} onChange={this.handleChange} fullWidth>
            <Tab value={'one'} label="First" />
            <Tab value={'two'} label="Second" />
            <Tab value={'three'} label="Third" />
        </Tabs>
    )
}

TabsTemp.propTypes = {};

TabsTemp.defaultProps = {};

export default TabsTemp;

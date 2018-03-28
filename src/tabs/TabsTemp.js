import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs, { Tab } from 'material-ui-next/Tabs';
import AppBar from 'material-ui-next/AppBar';
import Typography from 'material-ui-next/Typography';

import { createClassName } from '../component-helpers/utils';

const style = {
    flexGrow: 1,
};


function TabContainer(props) {
    return (
        <Typography component={'div'} style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

const TabsTemp = ({ style, selector, children }) => {
    const className = createClassName('d2-ui-tabs', selector);

    return (
        <Tabs
            className={className}
            style={style}
        >
            {children}
        </Tabs>
    );
};

class TabTemp extends Component {
    state = { value: 0 };

    handleChange = (event, value) => {
        this.setState({ value });
    }

    render = () => {
        const className = createClassName('d2-ui-tab', this.props.selector);
        return (
            <Tab
                className={className}
            />
        );
    };
}

TabsTemp.propTypes = {
    tabCount: PropTypes.number,
    selector: PropTypes.string,
};

TabsTemp.defaultProps = {
    tabCount: 0,
};

export default TabTemp;
export { TabsTemp, TabTemp };

import React, { Component } from 'react';
import { Tabs as MuiTabs, Tab as MuiTab } from 'material-ui/Tabs';

const Tabs = ({ selector, children }) => {
    let className = 'd2-ui-tabs';

    if (selector) {
        className = `${className} ${className}-${selector}`;
    }

    return (
        <MuiTabs className={className}>
            {children}
        </MuiTabs>
    );
};

const Tab = class extends Component {
    static muiName = 'Tab';

    render () {
        const { selector } = this.props;
        let className = 'd2-ui-tab';

        if (selector) {
            className = `${className} ${className}-${selector}`;
        }

        return (
            <MuiTab
                className={className}
                {...this.props}
            />
        );
    }
};

export default Tabs;
export { Tabs, Tab };

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs as MuiTabs, Tab as MuiTab } from 'material-ui/Tabs';
import { createClassName } from '../component-helpers/utils';

const Tabs = ({ style, selector, children }) => {
    const className = createClassName('d2-ui-tabs', selector);

    return (
        <MuiTabs
            className={className}
            style={style}
        >
            {children}
        </MuiTabs>
    );
};

Tabs.propTypes = {
    /**
     * Override the inline-styles of the root element
     */
    style: PropTypes.object,

    /**
     * If set, adds a class to the element in the format d2-ui-tabs-selector
     */
    selector: PropTypes.string,
};

export default Tabs;

export class Tab extends Component {
    static propTypes = {
        /**
         * If set, adds a class to the element in the format d2-ui-tab-selector
         */
        selector: PropTypes.string,
    };

    static muiName = 'Tab';

    render() {
        const className = createClassName('d2-ui-tab', this.props.selector);

        return (
            <MuiTab
                className={className}
                {...this.props}
            />
        );
    }
};

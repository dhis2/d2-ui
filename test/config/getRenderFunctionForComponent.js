import React from 'react';
import injectTheme from '../config/inject-theme';

const {
    findRenderedComponentWithType,
    renderIntoDocument,
} = React.addons.TestUtils;

export default function getRenderFunctionForComponent(Component) {
    return function renderComponent(props = {}) {
        const ComponentWithContext = injectTheme(Component);
        const renderedComponents = renderIntoDocument(<ComponentWithContext {...props} />);

        return findRenderedComponentWithType(renderedComponents, Component);
    };
}

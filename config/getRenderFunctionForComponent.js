import React from 'react';
import injectTheme from './inject-theme';

export default function getRenderFunctionForComponent(Component) {
    const ComponentWithContext = injectTheme(Component);

    return ComponentWithContext;
}

import React from 'react';
import addContext from '../../src/component-helpers/addContext';

describe('addContext', () => {
    it('should be a function', () => {
        expect(typeof addContext).toBe('function');
    });

    it('should be return the passed in class with the context added to it', () => {
        class Component extends React.Component {}

        const componentWithContext = addContext(Component, {
            name: React.PropTypes.object,
        });

        expect(componentWithContext.contextTypes).toEqual({ name: React.PropTypes.object });
    });

    it('should also add the contextTypes to a function component', () => {
        function App() {}

        const componentWithD2Context = addContext(App, {
            name: React.PropTypes.string,
        });

        expect(componentWithD2Context.contextTypes).toEqual({ name: React.PropTypes.string });
    });

    it('should respect the contextTypes added earlier', () => {
        function App() {}
        App.contextTypes = { isAmazing: React.PropTypes.bool };

        const componentWithD2Context = addContext(App, {
            name: React.PropTypes.string,
        });

        expect(componentWithD2Context.contextTypes).toEqual({ name: React.PropTypes.string,  isAmazing: React.PropTypes.bool });
    });
});

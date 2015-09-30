import React from 'react/addons';
import AppWithD2 from '../../src/app/AppWithD2.component';
import log from 'loglevel';

const {
    renderIntoDocument,
    findRenderedComponentWithType,
} = React.addons.TestUtils;

describe('AppWithD2 component', () => {
    const  d2Mock = {};
    const TestComponent = React.createClass({
        contextTypes: {
            d2: React.PropTypes.object.isRequired,
        },

        render() { return <div />; },
    });
    let appWithD2Component;
    let testComponent;

    beforeEach(() => {
        spy(log, 'error');

        appWithD2Component = renderIntoDocument(
            <AppWithD2 d2={Promise.resolve(d2Mock)}>
                <TestComponent />
            </AppWithD2>
        );

        testComponent = findRenderedComponentWithType(appWithD2Component, TestComponent);
    });

    it('should render a component', () => {
        expect(appWithD2Component).to.not.be.undefined;
    });

    it('should provide d2 as context to other apps', (done) => {
        setTimeout(() => {
            expect(testComponent.context.d2).to.not.be.undefined;
            done();
        });
    });

    it('should log an error when there is no d2', () => {
        appWithD2Component = renderIntoDocument(
            <AppWithD2>
                <TestComponent />
            </AppWithD2>
        );

        expect(log.error).to.be.calledWith('D2 is a required prop to <AppWithD2 />');
    });

    it('should not throw on empty children', () => {
        const renderAppWithD2Component = () => renderIntoDocument(
            <AppWithD2 />
        );

        expect(renderAppWithD2Component).not.to.throw();
    });
});

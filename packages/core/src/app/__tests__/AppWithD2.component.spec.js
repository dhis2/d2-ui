
import React from 'react';
import { shallow } from 'enzyme';

import AppWithD2 from '../AppWithD2.component';

describe('AppWithD2 component', () => {
    let props;
    let expectedD2;
    let promiseToD2;
    let shallowApp;
    const children = (
        <section>
            <p key="a" className="child a">A</p>
            <p key="b" className="child b">B</p>
            <p key="c" className="child c">C</p>
        </section>
    );

    const appComponent = () => {
        if (!shallowApp) {
            shallowApp = shallow(<AppWithD2 {...props}>{children}</AppWithD2>, { lifecycleExperimental: true });
        }
        return shallowApp;
    };


    beforeEach(() => {
        expectedD2 = { currentUser: {}, models: {}, Api: {} };
        promiseToD2 = Promise.resolve(expectedD2);

        props = {
            d2: promiseToD2,
        };
    });

    it('should render an AppWithD2 component', () => {
        expect(appComponent().find('div')).toHaveLength(1);
    });

    it('should render all the children', () => {
        expect(appComponent().find('p.child')).toHaveLength(3);
    });

    it('should set d2 in the local state', () => {
        return promiseToD2
            .then(() => {
                expect(appComponent().state().d2).toEqual(expectedD2);
            });
    });
});

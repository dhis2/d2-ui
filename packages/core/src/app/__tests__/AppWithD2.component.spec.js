
import React from 'react';
import { shallow } from 'enzyme';

import AppWithD2 from '../AppWithD2.component';

describe('AppWithD2 component', () => {
    let Component;

    const children = (
        <section>
            <p key="a" className="child a">A</p>
            <p key="b" className="child b">B</p>
            <p key="c" className="child c">C</p>
        </section>
    );

    beforeEach(() => {
        Component = shallow(<AppWithD2>{children}</AppWithD2>);
    });

    it('should render an AppWithD2 component', () => {
        expect(Component.find('div')).toHaveLength(1);
    });

    it('should render all the children', () => {
        expect(Component.find('p.child')).toHaveLength(3);
    });

    it('should set d2 in the local state', () => {
        const expectedD2 = { currentUser: {}, models: {}, Api: {} };
        const promiseToD2 = Promise.resolve(expectedD2);

        const AppComp = shallow(<AppWithD2 d2={promiseToD2}>{children}</AppWithD2>, { lifecycleExperimental: true });

        return promiseToD2
            .then(() => {
                expect(AppComp.state().d2).toEqual(expectedD2);
            });
    });
});

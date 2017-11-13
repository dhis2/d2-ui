import React from 'react';
import { shallow } from 'enzyme';
import SvgIcon from '../SvgIcon';

describe('SvgIcon', () => {
    // const renderWithProps = props => shallow(<SvgIcon {...props} />, {
    //     context: getStubContext(),
    // });

    it('should render a star icon', () => {
        const promise = Promise.resolve('promise resolved');
        const props = {
            icon: 'star',
        };
        const wrapper = shallow(<SvgIcon {...props} />);

        return promise
            .then(() => {
                // wrapper.update();
            })
            .then(() => {
                expect(wrapper.text()).toContain('ToggleStar');
            });
    });
});

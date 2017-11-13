import React from 'react';
import { shallow } from 'enzyme';
// import { getStubContext } from '../../../config/inject-theme';
import D2UISvgIcon from '../D2UISvgIcon';

describe('D2UISvgIcon', () => {
    // const renderWithProps = props => shallow(<D2UISvgIcon {...props} />, {
    //     context: getStubContext(),
    // });

    it('should render a star icon', () => {
        const promise = Promise.resolve('plain promise');
        const props = {
            icon: 'star',
        };
        const wrapper = shallow(<D2UISvgIcon {...props} />);

        return promise
            .then(() => {
                // wrapper.update();
            })
            .then(() => {
                expect(wrapper.text()).toContain('ToggleStar');
            });
    });

    it('should render a game icon', () => {
        const promise = Promise.resolve('plain promise');
        const props = { icon: 'game' };
        const wrapper = shallow(<D2UISvgIcon {...props} />);

        return promise
            .then(() => {
                // wrapper.update();
            })
            .then(() => {
                expect(wrapper.text()).toContain('HardwareVideogameAsset');
            });
    });
});

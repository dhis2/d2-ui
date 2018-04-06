import React from 'react';
import { shallow } from 'enzyme';
import { getStubContext } from '../../../config/inject-theme';
import StyleOptions from '../StyleOptions';

describe('StyleOptions', () => {
    let props;
    let shallowStyleOptionsComponent;
    const styleOptions = () => {
        if (!shallowStyleOptionsComponent) {
            shallowStyleOptionsComponent = shallow(<StyleOptions {...props} />, {
                context: getStubContext(),
            });
        }
        return shallowStyleOptionsComponent;
    };
    beforeEach(() => {
        props = {
            tabContent: {
                noSpace: false,
            },
            onChange: jest.fn(),
        };
        shallowStyleOptionsComponent = undefined;
    });
});

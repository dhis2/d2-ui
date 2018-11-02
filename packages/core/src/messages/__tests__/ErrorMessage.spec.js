import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from '../ErrorMessage';
import Message from '../Message';

describe('ErrorMessage', () => {
    function renderComponent(props) {
        return shallow(<ErrorMessage {...props} />);
    }

    it('should render a Message component', () => {
        const component = renderComponent();

        expect(component.find(Message)).toHaveLength(1);
    });

    it('should pass the message down', () => {
        const component = renderComponent({ message: 'This is an error message' });

        expect(component.find(Message).props().message).toBe('This is an error message');
    });

    it('should pass the correct style to the Message component', () => {
        const component = renderComponent({ message: 'This is an error message' });

        expect(component.find(Message).props().style).toEqual({ color: 'red' });
    });
});

import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from '../../src/messages/ErrorMessage.component';
import Message from '../../src/messages/Message.component';

describe('ErrorMessage', () => {
    function renderComponent(props) {
        return shallow(<ErrorMessage {...props} />);
    }

    it('should render a Message component', () => {
        const component = renderComponent();

        expect(component.find(Message)).to.have.length(1);
    });

    it('should pass the message down', () => {
        const component = renderComponent({ message: 'This is an error message' });

        expect(component.find(Message).props().message).to.equal('This is an error message');
    });

    it('should pass the correct style to the Message component', () => {
        const component = renderComponent({ message: 'This is an error message' });

        expect(component.find(Message).props().style).to.deep.equal({ color: 'red' });
    });
});

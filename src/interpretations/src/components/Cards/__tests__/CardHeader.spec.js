import React from 'react';
import { shallow } from 'enzyme';
import { CardHeader } from '../CardHeader';
import { getStubContext } from '../../../../config/test-context';


const interpretationModel = {
    name: 'LOECMJN3DRF',
    id: 'LOECMJN3DRF',
    created: '2018-04-14T12:00:47.096',
    user: {
        id: 'xE7jOejl9FI',
        displayName: 'John Traore',
    },
};

const props = {
        classes: {},
        userName: interpretationModel.user.displayName,
        createdDate: interpretationModel.created,
    };

const context = getStubContext();

const renderComponent = () => {
    return shallow(<CardHeader {...props} />, {...context});
};

let cardHeaderComponent;

describe('components: Cards -> CardHeader component', () => {
    
    beforeEach(() => { 
        cardHeaderComponent = renderComponent();
    });

    it('should show the authors name', () => {
        const cardHeaderText = cardHeaderComponent.text();
        expect(cardHeaderText).toContain(interpretationModel.user.displayName);
    });
});

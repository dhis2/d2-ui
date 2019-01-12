import React from 'react';
import { shallow } from 'enzyme';
import { getStubContext } from '../../../../config/test-context';
import { CardHeader } from '../CardHeader';


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


const renderComponent = () => {
    const context = getStubContext();
    return shallow(<CardHeader {...props} />, {...context});
};

let cardHeaderComponent;

describe('components: Interpretation -> CardHeader component', () => {
    
    beforeEach(() => { 
        cardHeaderComponent = renderComponent();
    });

    it('should show the authors name', () => {
        const cardHeaderText = cardHeaderComponent.text();
        expect(cardHeaderText).toContain(interpretationModel.user.displayName);
    });
});
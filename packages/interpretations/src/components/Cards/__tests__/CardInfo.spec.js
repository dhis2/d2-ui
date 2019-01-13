import React from 'react';
import { shallow } from 'enzyme';
import { CardInfo } from '../CardInfo';
import Likes from '../../Interpretation/Likes';
import Replies from '../../Interpretation/Replies';

let shallowCardInfo;

const props = {
    classes: {},
    likedBy: ['John Traore, Tom Waikiki'],
    repliedBy: ['Kevin Boateng'],
    createdDate: '2 hours ago',
};

const cardInfo = () => {
    if (!shallowCardInfo) {
        shallowCardInfo = shallow(<CardInfo {...props} />);
    }
    return shallowCardInfo;
};

describe('components: Cards -> CardInfo component ', () => {
   beforeEach(() => {
       shallowCardInfo = undefined;
   });

    it('should render the current date', () => {
        const date = cardInfo().text();
        expect(date).toContain(props.createdDate);
    }); 
    
    it('should render Likes', () => {
        expect(cardInfo().find(Likes)).toExist();
    });

    it('should render Replies', () => {
        expect(cardInfo().find(Replies)).toExist();
    });
});
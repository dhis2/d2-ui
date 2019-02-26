import React from 'react';
import { shallow } from 'enzyme';
import { CollapsibleCard } from '../CollapsibleCard';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

let shallowCollapsible;

const props = {
    classes: {},
    title: 'Favorite details',
    actions: {},
    children: [<span key={1}>{'some'}</span>, <div key={2}>{'stuff'}</div>],
};

const collapsibleCard = () => {
    if (!shallowCollapsible) {
        shallowCollapsible = shallow(<CollapsibleCard {...props} />);
    }
    return shallowCollapsible;
};

describe('components: Cards -> CollapsibleCard component ', () => {
   beforeEach(() => {
        shallowCollapsible = undefined;
   });

   it('should render a Card containing everything else', () => {
       const card = collapsibleCard().find(Card).first();
        expect(card).toExist();
        expect(card.children()).toEqual(collapsibleCard().children())
   });

   it('should render a CardHeader', () => {
        expect(collapsibleCard().find(CardHeader)).toExist();
   });

   describe('The CardHeader', () => {

        it('should have the correct title', () => {
            const title = collapsibleCard().find(CardHeader).props().title;
            expect(title).toEqual(props.title);
        });
   });
});

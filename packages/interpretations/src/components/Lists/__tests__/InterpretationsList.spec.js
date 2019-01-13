import React from 'react';
import { shallow } from 'enzyme';
import { InterpretationsList } from '../InterpretationsList';
import Interpretation from '../../Interpretation/Interpretation';

const fourInterpretations = [
    { id: 'one', user: { id: 'testId' }},
    { id: 'two', user: { id: 'testId' }},
    { id: 'three', user: { id: 'testId' }},
    { id: 'four' , user: { id: 'testId' }}
]

const eightInterpretations = [
    { id: 'one', user: { id: 'testId' }},
    { id: 'two', user: { id: 'testId' }},
    { id: 'three', user: { id: 'testId' }},
    { id: 'four', user: { id: 'testId' }},
    { id: 'five', user: { id: 'testId' }},
    { id: 'six', user: { id: 'testId' }},
    { id: 'seven', user: { id: 'testId' }},
    { id: 'eight', user: { id: 'testId' }},
];

const baseProps = {
    classes: {},
    model: {},
    d2: {
        currentUser: {
            id: 'testId',
        }
    },
    interpretations: [],
    onSelect: jest.fn(),
    onChange: jest.fn(),
    isExpanded: false,
    toggleShowAllInterpretations: jest.fn(),
};

let shallowInterpretationsList;

const interpretationsList = (partialProps = {}) => {
    if (!shallowInterpretationsList) {
        const props = {...baseProps, ...partialProps}
        shallowInterpretationsList = shallow(<InterpretationsList {...props} />);
    }
    return shallowInterpretationsList;
};

describe('components: Lists -> InterpretationsList component ', () => {
    beforeEach(() => {
        shallowInterpretationsList = undefined;
    });

    describe('with no interpretations', () => {
        it('should return "No Interpretations"', () => {
            expect(interpretationsList().props().children).toEqual('No interpretations');
        });
    });

    describe('with interpretations under 5 items', () => {
        beforeEach(() => {
            interpretationsList({ interpretations: fourInterpretations })
        });

        it('should render all Interpretations', () => {
            expect(interpretationsList().find(Interpretation).length).toEqual(4);
        });
    });

    describe('with interpretations over 5 items', () => {
        beforeEach(() => {
            interpretationsList({ interpretations: eightInterpretations })
        });

        describe('with prop isExpanded as false', () => {
            it('should not show more than 5 interpretations', () => {
                expect(interpretationsList().find(Interpretation).length).toEqual(5);
            });

        });
        
    });

    describe('with interpretations over 5 items with props isExpanded as true,', () => {
        beforeEach(() => {
            interpretationsList({ interpretations: eightInterpretations, isExpanded: true })
        });
        
        it('should show all interpretations', () => {
            expect(interpretationsList().find(Interpretation).length).toEqual(8);
        });
    });
});
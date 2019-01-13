import React from 'react';
import { shallow } from 'enzyme';
import { InterpretationsList } from '../InterpretationsList';
import Interpretation from '../../Interpretation/Interpretation';
import ToggleList from '../../ToggleList/ToggleList';

const fourInterpretations = [
    { id: 'one' },
    { id: 'two' },
    { id: 'three' },
    { id: 'four' }
]

const eightInterpretations = [
    { id: 'one' },
    { id: 'two' },
    { id: 'three' },
    { id: 'four' },
    { id: 'five' },
    { id: 'six' },
    { id: 'seven' },
    { id: 'eight' },
];

const baseProps = {
    classes: {},
    model: {},
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
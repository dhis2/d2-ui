import React from 'react';
import { shallow } from 'enzyme';
import { NewInterpretationField } from '../NewInterpretationField';
import Button from '@material-ui/core/Button';
import { getStubContext } from '../../../../config/test-context';

const baseProps = {
    classes: {},
    model: {
        user: { id: 'testId', name: 'Tom Waikiki' },
        displayName: 'ANC: 1st and 3rd trends Monthly',
        userAccesses: [],
        userGroupAccesses: [],
        publicAccess: true,
        externalAccess: false,
    },
    onSave: jest.fn(),
    onPost: jest.fn(),
};

const onUpdate = jest.fn();
const onClose = jest.fn();

const context = getStubContext();

let shallowNewInterpretation;

const newInterpretation = (partialProps = {}) => {
    if (!shallowNewInterpretation) {
        const props = {...baseProps, ...partialProps};
        shallowNewInterpretation = shallow(<NewInterpretationField {...props} />, {context});
    }
    return shallowNewInterpretation;
};

describe('components: Interpretation -> NewInterpretation component ', () => {
    beforeEach(() => {
        shallowNewInterpretation = undefined;
    });

    describe('the initial component', () => {
        it('should render a textarea', () => {
            expect(newInterpretation().find('textarea')).toExist();
        });

        it('should not render any buttons', () => {
            expect(newInterpretation().find(Button)).not.toExist();
        });
    });

    describe('without prop interpretation', () =>  {
        it('should show an empty textarea', () => {
            expect(newInterpretation().find('textarea').props().value).toEqual('');
        });

        it('should update state text when textarea value is changed', () => {
            newInterpretation().find('textarea').props().onChange({ target: { value: 'some text' }})
            expect(newInterpretation().find('textarea').props().value).toEqual('some text');
        });

        describe('when new text is present', () => {
            beforeEach(() => {
                newInterpretation().find('textarea').props().onChange({ target: { value: 'some text' }})
            });

            it('should render two buttons', () => {
                expect(newInterpretation().find(Button).length).toEqual(2);
            });
        });
    });

    describe('with prop interpretation', () => {
        beforeEach(() => {
            newInterpretation({ 
                interpretation: { text: 'some saved text' }, 
                onUpdate: onUpdate, 
                onClose: onClose
            });
        });
        
        it('should show two buttons', ()=> {
            expect(newInterpretation().find(Button).length).toEqual(2);
        });

        it('should show the text passed from interpretation object', () => {
            expect(newInterpretation().find('textarea').props().value).toEqual('some saved text');
        });


        describe('when Save interpretation button is clicked', () => {
            it('should call prop onUpdate', () => {
                newInterpretation().find(Button)
                    .findWhere(button => button.props().children === 'Save interpretation')
                    .simulate('click');
                
                expect(onUpdate).toHaveBeenCalled();
            });
            
        });

        describe('when Cancel button is clicked', () => {
            it('should call prop onCancel', () => {
                newInterpretation().find(Button)
                    .findWhere(button => button.props().children === 'Cancel')
                    .simulate('click');
                
                expect(onClose).toHaveBeenCalled();
            });
        });
    });
});

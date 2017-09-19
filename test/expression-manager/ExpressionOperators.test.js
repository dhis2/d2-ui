import React from 'react';
import injectTheme from '../../config/inject-theme';
import ExpressionOperators from '../../src/expression-manager/ExpressionOperators';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import {shallow} from 'enzyme';

describe('ExpressionOperators component', () => {
    let expressionOperatorsComponent;
    let addOperatorCallback;

    function renderComponent(props = {}) {
        return shallow(<ExpressionOperators {...props} />);
    }

    beforeEach(() => {
        addOperatorCallback = jest.fn();

        expressionOperatorsComponent = renderComponent({
           operatorClicked: addOperatorCallback,
        });
    });

    it('should have the component name as a class', () => {
        expect(expressionOperatorsComponent.hasClass('expression-operators')).toBe(true);
    });

    it('should render an IconButtons for each of the operators', () => {
        const buttons = expressionOperatorsComponent.find(FlatButton);

        expect(buttons).toHaveLength(7);
    });

    describe('operator buttons', () => {
        let buttons;

        beforeEach(() => {
            buttons = expressionOperatorsComponent.find(FlatButton);
        });

        it('should call callback with "("', () => {
            buttons.at(0).simulate('click');

            expect(addOperatorCallback).toHaveBeenCalledWith('(');
        });

        it('should call callback with ")"', () => {
            buttons.at(1).simulate('click');

            expect(addOperatorCallback).toHaveBeenCalledWith(')');
        });

        it('should call callback with "*"', () => {
            buttons.at(2).simulate('click');

            expect(addOperatorCallback).toHaveBeenCalledWith(' * ');
        });

        it('should call callback with "/"', () => {
            buttons.at(3).simulate('click');

            expect(addOperatorCallback).toHaveBeenCalledWith(' / ');
        });

        it('should call callback with "+"', () => {
            buttons.at(4).simulate('click');

            expect(addOperatorCallback).toHaveBeenCalledWith(' + ');
        });

        it('should call callback with "-"', () => {
            buttons.at(5).simulate('click');

            expect(addOperatorCallback).toHaveBeenCalledWith(' - ');
        });

        it('should call callback with "[days]"', () => {
            buttons.at(6).simulate('click');

            expect(addOperatorCallback).toHaveBeenCalledWith(' [days] ');
        });
    });
});

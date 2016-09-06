import React from 'react';
import injectTheme from '../../config/inject-theme';
import TextField from 'material-ui/TextField/TextField';
import ExpressionDescription from '../../src/indicator-expression-manager/ExpressionDescription.component';
import {shallow} from 'enzyme';

describe('ExpressionDescription component', () => {
    let expressionDescriptionComponent;
    let onDescriptionChangeSpy;

    function renderComponent(props = {}) {
        return shallow(<ExpressionDescription {...props} />);
    }

    beforeEach(() => {
        onDescriptionChangeSpy = spy();
        expressionDescriptionComponent = renderComponent({
            onDescriptionChange: onDescriptionChangeSpy,
            descriptionLabel: "Numerator description",
            descriptionValue: "My indicator numerator description",
        });
    });

    it('should have the component name as a class', () => {
        expect(expressionDescriptionComponent.hasClass('expression-description')).to.be.true;
    });

    it('should render a textfield for description', () => {
        expect(expressionDescriptionComponent.find(TextField)).to.have.length(1);
    });

    describe('description field', () => {
        let descriptionComponent;

        beforeEach(() => {
            descriptionComponent = expressionDescriptionComponent.find(TextField);
        });

        it('should render the passed descriptionValue as the value of the TextField', () => {
            expect(descriptionComponent.props().value).to.equal('My indicator numerator description');
        });

        it('should have the a floatingLabelText that equals the descriptionLabel property', () => {
            expect(descriptionComponent.props().floatingLabelText).to.equal('Numerator description');
        });

        it('should set the value of the description onto the state after change', () => {
            descriptionComponent.simulate('change', {
                target: {
                    value: 'My indicator expression description',
                },
            });

            expect(onDescriptionChangeSpy).to.be.calledWith('My indicator expression description');
        });
    });
});

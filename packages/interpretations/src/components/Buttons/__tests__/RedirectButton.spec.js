import React from 'react';
import { shallow } from 'enzyme';
import { RedirectButton, getAppName } from '../RedirectButton';
import ActionButton from '../ActionButton';
import { getStubContext } from '../../../../config/test-context';

let shallowRedirect;

const props = {
    classes: {},
    interpretationId: 'someIdString',
};

const dashboardItem = {
    type: 'CHART',
    chart: {
        id: 'id',
    }
};

const context = getStubContext();

const redirectButton = (partialContext = {}) => {
    if (!shallowRedirect) {
        const fullContext = {...context, ...partialContext}
        shallowRedirect = shallow(<RedirectButton {...props} />, { context: fullContext});
    }
    return shallowRedirect;
};

describe('components: Cards -> CardInfo component ', () => {
   beforeEach(() => {
        shallowRedirect = undefined;
   });

   describe('when context appName does not equal dashboard', () => {

       it('should render null if context appName does not equal dashboard', () => {
            expect(redirectButton().find('a')).not.toExist();
       });
    });

   describe('when context appName equals dashboard', () => {
        beforeEach(() => {
            redirectButton({ appName: 'dashboard', item: dashboardItem })
        });
    
        it('should render a hyperlink element with correct href prop', () => {
            expect(redirectButton().find('a')).toExist();
        });
    
        it('should render an ActionButton', () => {
            expect(redirectButton().find(ActionButton)).toExist();
        });

        describe('The ActionButton', () => {

            it('should have the iconType: openApp', () => {
                const dashboardButtonType = 'openApp';
                const dashboardButton = redirectButton().find(ActionButton);

                expect(dashboardButton.props().iconType).toEqual(dashboardButtonType)
            });

            it('should not have an onClick prop', () => {
                const dashboardButton = redirectButton().find(ActionButton);

                expect(dashboardButton.props().onClick).toEqual(undefined);
            });

            it('should render the correct tooltip text', () => {
                const relativeTooltip = `View in ${getAppName(dashboardItem.type)} app`;
                const actionButton = redirectButton().find(ActionButton);
                
                expect(actionButton.props().tooltip).toEqual(relativeTooltip);
            })
        });
   });
   
});

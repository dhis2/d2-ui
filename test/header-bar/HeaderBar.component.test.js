//import React from 'react';
//import AppBar from '../../src/header-bar/HeaderBar.component';
//import dhis2 from '../../src/header-bar/dhis2';
//import injectTheme from '../../config/inject-theme';
//
//const {
//    renderIntoDocument,
//    findRenderedComponentWithType,
//} = React.addons.TestUtils;
//
//describe('HeaderBar', () => {
//    let appBarComponent;
//
//    beforeEach(() => {
//        dhis2.menu = {
//            ui: {
//                initMenu: spy(),
//            },
//        };
//
//        const AppBarWithContext = injectTheme(AppBar);
//        const renderedComponents = renderIntoDocument(<AppBarWithContext />);
//
//        appBarComponent = findRenderedComponentWithType(renderedComponents, AppBar);
//    });
//
//    it('should be defined', () => {
//        expect(AppBar).to.not.be.undefined;
//    });
//
//    it('should give the header the correct id', () => {
//        expect(React.findDOMNode(appBarComponent).id).to.equal('header');
//    });
//
//    it('should call the menu init on mount', () => {
//        expect(dhis2.menu.ui.initMenu).to.be.called;
//    });
//});

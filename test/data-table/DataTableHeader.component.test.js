import React from 'react/addons';
import {element} from 'd2-testutils';
import DataTableHeaderWithoutContext from '../../src/data-table/DataTableHeader.component';
import injectTheme from '../config/inject-theme';

const TestUtils = React.addons.TestUtils;

describe('DataTableHeader component', () => {
    let DataTableHeader;
    let dataTableComponent;

    beforeEach(() => {
        DataTableHeader = injectTheme(DataTableHeaderWithoutContext);
        const renderedComponents = TestUtils.renderIntoDocument(
            <DataTableHeader name={'lastUpdated'} />
        );

        dataTableComponent = TestUtils.findRenderedComponentWithType(renderedComponents, DataTableHeaderWithoutContext);
    });

    it('should load two columns', () => {
        expect(() => TestUtils.findRenderedDOMComponentWithTag(dataTableComponent, 'div')).to.not.throw();
    });

    it('should transform display as underscores and translate', () => {
        const renderedColumn = TestUtils.findRenderedDOMComponentWithTag(dataTableComponent, 'div');

        expect(renderedColumn.getDOMNode().textContent).to.equal('last_updated_translated');
    });

    it('should add the data-table__headers__header--even class', () => {
        dataTableComponent = TestUtils.renderIntoDocument(
            <DataTableHeader name={'lastUpdated'} />
        );
        const renderedColumn = TestUtils.findRenderedDOMComponentWithTag(dataTableComponent, 'div');

        expect(element(renderedColumn.getDOMNode()).hasClass('data-table__headers__header--even')).to.be.true;
    });

    it('should add the data-table__headers__header--odd class', () => {
        dataTableComponent = TestUtils.renderIntoDocument(
            <DataTableHeader name={'lastUpdated'} isOdd />
        );
        const renderedColumn = TestUtils.findRenderedDOMComponentWithTag(dataTableComponent, 'div');

        expect(element(renderedColumn.getDOMNode()).hasClass('data-table__headers__header--odd')).to.be.true;
    });
});

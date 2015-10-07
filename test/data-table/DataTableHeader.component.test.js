import React from 'react/addons';
import {element} from 'd2-testutils';
import DataTableHeader from '../../src/data-table/DataTableHeader.component';

const TestUtils = React.addons.TestUtils;

describe('DataTableHeader component', () => {
    let dataTableComponent;

    beforeEach(() => {
        dataTableComponent = TestUtils.renderIntoDocument(
            <DataTableHeader name={'lastUpdated'} />
        );
    });

    it('should load two columns', () => {
        expect(() => TestUtils.findRenderedDOMComponentWithTag(dataTableComponent, 'div')).to.not.throw();
    });

    it('should transform display as underscores', () => {
        const renderedColumn = TestUtils.findRenderedDOMComponentWithTag(dataTableComponent, 'div');

        expect(renderedColumn.getDOMNode().textContent).to.equal('last_updated');
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

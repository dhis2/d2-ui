import React from 'react/addons';
import {element} from 'd2-testutils';
import DataTable from '../../src/data-table/DataTable.component';

const TestUtils = React.addons.TestUtils;

describe('DataTable component', () => {
    let dataTableComponent;

    beforeEach(() => {
        dataTableComponent = TestUtils.renderIntoDocument(<DataTable />);
    });

    describe('initial state', () => {
        it('should have set the default columns', () => {
            expect(dataTableComponent.state.columns).to.deep.equal(['name', 'lastUpdated']);
        });

        it('should have a data-table row', () => {
            expect(element(dataTableComponent.getDOMNode()).hasClass('data-table')).to.be.true;
        });
    });

    describe('with headers', () => {
        it('should have set the passed columns', () => {
            const columns = ['name', 'code', 'lastUpdated'];
            dataTableComponent = TestUtils.renderIntoDocument(<DataTable columns={columns}/>);

            expect(dataTableComponent.state.columns).to.deep.equal(['name', 'code', 'lastUpdated']);
        });

        it('should not set the columns if the column value is not an array of strings', () => {
            const columns = ['name', 'code', 'lastUpdated', {}];

            dataTableComponent = TestUtils.renderIntoDocument(<DataTable columns={columns}/>);

            expect(dataTableComponent.state.columns).to.deep.equal(['name', 'lastUpdated']);
        });

        it('should generate the headers wrap', () => {
            expect(() => TestUtils.findRenderedDOMComponentWithClass(dataTableComponent, 'data-table__headers')).not.to.throw();
        });

        it('should generate the correct number of headers', () => {
            const headers = TestUtils.scryRenderedDOMComponentsWithClass(dataTableComponent, 'data-table__headers__header');

            expect(headers.length).to.equal(2);
        });
    });

    it('should have a property for rows that is empty', () => {
        expect(dataTableComponent.state.dataRows).to.be.an('array');
    });

    describe('with source', () => {
        beforeEach(() => {
            const dataTableSource = [
                {uid: 'b1', name: 'BDC', lastUpdated: 'Tomorrow'},
                {uid: 'f1', name: 'BFG', lastUpdated: 'Last year'},
                {uid: 'c1', name: 'BFG', lastUpdated: 'Today'},
            ];

            dataTableComponent = TestUtils.renderIntoDocument(
                <DataTable rows={dataTableSource}/>
            );
        });

        it('should have set the dataRows onto the state', () => {
            expect(dataTableComponent.state.dataRows.length).to.equal(3);
        });

        it('should not set the dataRows when the received value is not iterable', () => {
            dataTableComponent = TestUtils.renderIntoDocument(
                <DataTable rows={{}}/>
            );

            expect(dataTableComponent.state.dataRows.length).to.equal(0);
        });

        it('should generate a row wrap', () => {
            expect(() => TestUtils.findRenderedDOMComponentWithClass(dataTableComponent, 'data-table__rows')).not.to.throw();
        });

        it('should update the source when the rows property changes', () => {
            dataTableComponent.setProps({rows: [{uid: 'b1', name: 'BDC', lastUpdated: 'Tomorrow'}]});

            expect(dataTableComponent.state.dataRows.length).to.equal(1);
        });

        it('should correctly render a map', () => {
            dataTableComponent.setProps({
                rows: new Map([
                    ['b1', {uid: 'b1', name: 'BDC', lastUpdated: 'Tomorrow'}],
                    ['f1', {uid: 'f1', name: 'BFG', lastUpdated: 'Last year'}],
                    ['c1', {uid: 'c1', name: 'BFG', lastUpdated: 'Today'}],
                ]),
            });

            expect(dataTableComponent.state.dataRows.length).to.equal(3);
        });
    });

    describe('interaction', () => {
        beforeEach(() => {
            const dataTableSource = [
                {uid: 'b1', name: 'BDC', lastUpdated: 'Tomorrow'},
                {uid: 'f1', name: 'BFG', lastUpdated: 'Last year'},
                {uid: 'c1', name: 'BFG', lastUpdated: 'Today'},
            ];

            dataTableComponent = TestUtils.renderIntoDocument(
                <DataTable rows={dataTableSource}/>
            );
        });

        it('should show the context menu when clicked', () => {
            const dataRow = TestUtils.scryRenderedDOMComponentsWithClass(dataTableComponent, 'data-table__rows__row')[0];

            TestUtils.Simulate.contextMenu(dataRow.getDOMNode());

            expect(() => TestUtils.findRenderedDOMComponentWithClass(dataTableComponent, 'data-table__context-menu')).not.to.throw();
        });

        it('should hide the context menu when clicked again', () => {
            const dataRow = TestUtils.scryRenderedDOMComponentsWithClass(dataTableComponent, 'data-table__rows__row')[0];

            TestUtils.Simulate.contextMenu(dataRow.getDOMNode());
            TestUtils.Simulate.contextMenu(dataRow.getDOMNode());

            expect(() => TestUtils.findRenderedDOMComponentWithClass(dataTableComponent, 'data-table__context-menu')).to.throw();
        });

        it('should initially not show the contextmenu', () => {
            expect(() => TestUtils.findRenderedDOMComponentWithClass(dataTableComponent, 'data-table__context-menu')).to.throw();
        });

        it('should hide the contextmenu when clicking elsewhere on the window', () => {
            const dataRow = TestUtils.scryRenderedDOMComponentsWithClass(dataTableComponent, 'data-table__rows__row')[0];
            TestUtils.Simulate.contextMenu(dataRow.getDOMNode());

            TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(dataTableComponent, 'data-table').getDOMNode());

            expect(() => TestUtils.findRenderedDOMComponentWithClass(dataTableComponent, 'data-table__context-menu')).to.throw();
        });

        it('should hide contextmenu when the mouse is leaving the data table', () => {
            const dataRow = TestUtils.scryRenderedDOMComponentsWithClass(dataTableComponent, 'data-table__rows__row')[0];
            TestUtils.Simulate.contextMenu(dataRow.getDOMNode());

            // Using mouseout for mouseleave event https://github.com/facebook/react/issues/1297
            TestUtils.SimulateNative.mouseOut(TestUtils.findRenderedDOMComponentWithClass(dataTableComponent, 'data-table').getDOMNode());

            expect(() => TestUtils.findRenderedDOMComponentWithClass(dataTableComponent, 'data-table__context-menu')).to.throw();
        });
    });
});

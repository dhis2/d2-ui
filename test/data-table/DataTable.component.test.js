import React from 'react/addons';
import getRenderFunctionForComponent from '../../config/getRenderFunctionForComponent';
import {describeWithDOM, shallow} from 'enzyme';

import DataTable from '../../src/data-table/DataTable.component';
import DataTableHeader from '../../src/data-table/DataTableHeader.component';
import DataTableContextMenu from '../../src/data-table/DataTableContextMenu.component';

describeWithDOM('DataTable component', () => {
    let dataTableComponent;

    function renderComponent(props = {}) {
        return shallow(<DataTable {...Object.assign({contextMenuActions: {}}, props)} />);
    }

    beforeEach(() => {
        dataTableComponent = renderComponent();
    });

    describe('initial state', () => {
        it('should have set the default columns', () => {
            expect(dataTableComponent.state('columns')).to.deep.equal(['name', 'lastUpdated']);
        });

        it('should have a data-table row', () => {
            expect(dataTableComponent.hasClass('data-table')).to.be.true;
        });
    });

    describe('with headers', () => {
        it('should have set the passed columns', () => {
            const columns = ['name', 'code', 'lastUpdated'];

            dataTableComponent = renderComponent({columns});

            expect(dataTableComponent.state('columns')).to.deep.equal(['name', 'code', 'lastUpdated']);
        });

        it('should not set the columns if the column value is not an array of strings', () => {
            const columns = ['name', 'code', 'lastUpdated', {}];

            dataTableComponent = renderComponent({columns});

            expect(dataTableComponent.state('columns')).to.deep.equal(['name', 'lastUpdated']);
        });

        it('should generate the headers wrap', () => {
            expect(dataTableComponent.find('.data-table__headers')).to.have.length(1);
        });

        it('should generate the correct number of headers', () => {
            const headers = dataTableComponent
                .find('.data-table__headers__headers')
                .children();

            expect(dataTableComponent.find(DataTableHeader)).to.have.length(2);
        });
    });

    it('should have a property for rows that is empty', () => {
        expect(dataTableComponent.state().dataRows).to.be.an('array');
    });

    describe('with source', () => {
        beforeEach(() => {
            const dataTableSource = [
                {uid: 'b1', name: 'BDC', lastUpdated: 'Tomorrow'},
                {uid: 'f1', name: 'BFG', lastUpdated: 'Last year'},
                {uid: 'c1', name: 'BFG', lastUpdated: 'Today'},
            ];

            dataTableComponent = renderComponent({rows: dataTableSource});
        });

        it('should have set the dataRows onto the state', () => {
            expect(dataTableComponent.state('dataRows')).to.have.length(3);
        });

        it('should not set the dataRows when the received value is not iterable', () => {
            dataTableComponent = renderComponent({rows: {}});

            expect(dataTableComponent.state('dataRows')).to.have.length(0)
        });

        it('should generate a row wrap', () => {
            expect(dataTableComponent.find('.data-table__rows')).to.have.length(1);
        });

        it('should update the source when the rows property changes', () => {
            dataTableComponent.setProps({rows: [{uid: 'b1', name: 'BDC', lastUpdated: 'Tomorrow'}]});

            expect(dataTableComponent.state('dataRows').length).to.equal(1);
        });

        it('should correctly render a map', () => {
            dataTableComponent.setProps({
                rows: new Map([
                    ['b1', {uid: 'b1', name: 'BDC', lastUpdated: 'Tomorrow'}],
                    ['f1', {uid: 'f1', name: 'BFG', lastUpdated: 'Last year'}],
                    ['c1', {uid: 'c1', name: 'BFG', lastUpdated: 'Today'}],
                ]),
            });

            expect(dataTableComponent.state('dataRows')).to.have.length(3);
        });
    });

    describe('interaction', () => {
        beforeEach(() => {
            const dataTableSource = [
                {uid: 'b1', name: 'BDC', lastUpdated: 'Tomorrow'},
                {uid: 'f1', name: 'BFG', lastUpdated: 'Last year'},
                {uid: 'c1', name: 'BFG', lastUpdated: 'Today'},
            ];

            dataTableComponent = renderComponent({source: dataTableSource});
        });

        it('should show the context menu when the activeRow state is set', () => {
            const fakeRowSource = {name: 'My item'};

            expect(dataTableComponent.find(DataTableContextMenu)).to.have.length(0);

            dataTableComponent.instance().handleRowClick(
                {clientY: 100, clientX: 100},
                fakeRowSource
            );
            dataTableComponent.update();

            const contextMenuComponent = dataTableComponent.find(DataTableContextMenu);

            expect(contextMenuComponent).to.have.length(1);
            expect(contextMenuComponent.props().coords).to.deep.equal({Y: 75, X: 75});
        });

        it('shoukd hide the context menu when handleRowClick is called twice with the same source', () => {
            const fakeRowSource = {name: 'My item'};

            dataTableComponent.instance().handleRowClick({clientY: 100, clientX: 100}, fakeRowSource);
            dataTableComponent.update();
            dataTableComponent.instance().handleRowClick({clientY: 100, clientX: 100}, fakeRowSource);
            dataTableComponent.update();

            const contextMenuComponent = dataTableComponent.find(DataTableContextMenu);

            expect(contextMenuComponent).to.have.length(0);
        });

        it('should not render the context menu when the activeRow is undefined', () => {
            const fakeRowSource = {name: 'My item'};
            dataTableComponent.setState({contextMenuCoords: {Y: 75, X: 75}, activeRow: fakeRowSource});

            dataTableComponent.instance().hideContextMenu();
            dataTableComponent.update();

            const contextMenuComponent = dataTableComponent.find(DataTableContextMenu);

            expect(contextMenuComponent).to.have.length(0);
            expect(dataTableComponent.state('activeRow')).to.be.undefined;
        });

        it('should initially not show the contextmenu', () => {
            expect(dataTableComponent.find(DataTableContextMenu)).to.have.length(0);
        });

        it('should hide the contextmenu when left clicking elsewhere on the table', () => {
            const fakeRowSource = {name: 'My item'};
            dataTableComponent.setState({contextMenuCoords: {Y: 75, X: 75}, activeRow: fakeRowSource});
            expect(dataTableComponent.find(DataTableContextMenu)).to.have.length(1);

            dataTableComponent.find('.data-table').simulate('click');

            expect(dataTableComponent.find(DataTableContextMenu)).to.have.length(0);
        });

        it('should hide contextmenu when the mouse is leaving the data table', () => {
            const fakeRowSource = {name: 'My item'};
            dataTableComponent.setState({contextMenuCoords: {Y: 75, X: 75}, activeRow: fakeRowSource});
            expect(dataTableComponent.find(DataTableContextMenu)).to.have.length(1);

            dataTableComponent.find('.data-table').simulate('mouseLeave');

            expect(dataTableComponent.find(DataTableContextMenu)).to.have.length(0);
        });
    });

    describe('context menu action filtering', () => {
        let isContextActionAllowed;
        let contextMenuActions;
        let fakeRowSource;

        beforeEach(() => {
            fakeRowSource = {name: 'My item'};

            isContextActionAllowed = sinon.stub().returns(true);
            contextMenuActions  = {
                edit: () => {},
                delete: () => {},
                translate: () => {},
            };

            dataTableComponent = renderComponent({isContextActionAllowed, contextMenuActions});
        });

        it('should pass through when the actions are allowed', () => {
            // Show context menu initially
            dataTableComponent.setState({contextMenuCoords: {Y: 75, X: 75}, activeRow: fakeRowSource});
            const passedContextMenuActions = dataTableComponent.find(DataTableContextMenu).props().actions;

            expect(Object.keys(passedContextMenuActions)).to.deep.equal(['edit', 'delete', 'translate']);
        });

        it('should not pass actions that are not allowed', () => {
            isContextActionAllowed.withArgs(fakeRowSource, 'delete').returns(false);

            dataTableComponent = renderComponent({isContextActionAllowed, contextMenuActions});

            // Show context menu initially
            dataTableComponent.setState({contextMenuCoords: {Y: 75, X: 75}, activeRow: fakeRowSource});
            const passedContextMenuActions = dataTableComponent.find(DataTableContextMenu).props().actions;

            expect(Object.keys(passedContextMenuActions)).to.deep.equal(['edit', 'translate']);
        });
    });
});

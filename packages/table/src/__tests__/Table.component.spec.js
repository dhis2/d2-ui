import React from 'react';
import { describeWithDOM, shallow } from 'enzyme';
import Table from '../Table.component';
import TableHeader from '../TableHeader.component';
import TableContextMenu from '../TableContextMenu.component';

import Popover from 'material-ui/Popover/Popover';

describe('Table component', () => {
    let TableComponent;
    const cma = {
        edit(...args) {
            console.log('Edit', ...args);
        },
        remove(...args) {
            console.log('Remove', ...args);
        },
    };

    function renderComponent(props = {}) {
        return shallow(<Table {...Object.assign({ contextMenuActions: cma }, props)} />);
    }

    beforeEach(() => {
        TableComponent = renderComponent();
    });

    describe('initial state', () => {
        it('should have set the default columns', () => {
            expect(TableComponent.state('columns')).toEqual(['name', 'lastUpdated']);
        });

        it('should have a d2-ui-table row', () => {
            expect(TableComponent.hasClass('d2-ui-table')).toBe(true);
        });
    });

    describe('with headers', () => {
        it('should have set the passed columns', () => {
            const columns = ['name', 'code', 'lastUpdated'];

            TableComponent = renderComponent({ columns });

            expect(TableComponent.state('columns')).toEqual(['name', 'code', 'lastUpdated']);
        });

        it('should not set the columns if the column value is not an array of strings', () => {
            const columns = ['name', 'code', 'lastUpdated', {}];

            TableComponent = renderComponent({ columns });

            expect(TableComponent.state('columns')).toEqual(['name', 'lastUpdated']);
        });

        it('should generate the headers wrap', () => {
            expect(TableComponent.find('.d2-ui-table__headers')).toHaveLength(1);
        });

        it('should generate the correct number of headers', () => {
            expect(TableComponent.find(TableHeader)).toHaveLength(3);
        });
    });

    it('should have a property for rows that is empty', () => {
        expect(Array.isArray(TableComponent.state().dataRows)).toBe(true);
    });

    describe('with source', () => {
        beforeEach(() => {
            const TableSource = [
                { uid: 'b1', name: 'BDC', lastUpdated: 'Tomorrow' },
                { uid: 'f1', name: 'BFG', lastUpdated: 'Last year' },
                { uid: 'c1', name: 'BFG', lastUpdated: 'Today' },
            ];

            TableComponent = renderComponent({ rows: TableSource });
        });

        it('should have set the dataRows onto the state', () => {
            expect(TableComponent.state('dataRows')).toHaveLength(3);
        });

        it('should not set the dataRows when the received value is not iterable', () => {
            TableComponent = renderComponent({ rows: {} });

            expect(TableComponent.state('dataRows')).toHaveLength(0);
        });

        it('should generate a row wrap', () => {
            expect(TableComponent.find('.d2-ui-table__rows')).toHaveLength(1);
        });

        it('should update the source when the rows property changes', () => {
            TableComponent.setProps({ rows: [{ uid: 'b1', name: 'BDC', lastUpdated: 'Tomorrow' }] });

            expect(TableComponent.state('dataRows').length).toBe(1);
        });

        it('should correctly render a map', () => {
            TableComponent.setProps({
                rows: new Map([
                    ['b1', { uid: 'b1', name: 'BDC', lastUpdated: 'Tomorrow' }],
                    ['f1', { uid: 'f1', name: 'BFG', lastUpdated: 'Last year' }],
                    ['c1', { uid: 'c1', name: 'BFG', lastUpdated: 'Today' }],
                ]),
            });

            expect(TableComponent.state('dataRows')).toHaveLength(3);
        });
    });

    describe('interaction', () => {
        beforeEach(() => {
            const TableSource = [
                { uid: 'b1', name: 'BDC', lastUpdated: 'Tomorrow' },
                { uid: 'f1', name: 'BFG', lastUpdated: 'Last year' },
                { uid: 'c1', name: 'BFG', lastUpdated: 'Today' },
            ];

            TableComponent = renderComponent({ source: TableSource });
        });

        it('should show the context menu when the activeRow state is set', () => {
            const fakeRowSource = { name: 'My item' };

            expect(TableComponent.find('.d2-ui-table__context-menu')).toHaveLength(0);

            TableComponent.instance()
                .handleRowClick(
                    { currentTarget: TableComponent },
                    fakeRowSource,
                );
            TableComponent.update();

            const contextMenuComponent = TableComponent.find(TableContextMenu);

            expect(contextMenuComponent).toHaveLength(1);
            expect(contextMenuComponent.props().target).toEqual(TableComponent);
        });

        it('should hide the context menu when handleRowClick is called twice with the same source', () => {
            const fakeRowSource = { name: 'My item' };

            TableComponent.instance().handleRowClick({ clientY: 100, clientX: 100 }, fakeRowSource);
            TableComponent.update();
            TableComponent.instance().handleRowClick({ clientY: 100, clientX: 100 }, fakeRowSource);
            TableComponent.update();

            const contextMenuComponent = TableComponent.find('.d2-ui-table__context-menu');

            expect(contextMenuComponent).toHaveLength(0);
        });

        it('should not render the context menu when the activeRow is undefined', () => {
            const fakeRowSource = { name: 'My item' };
            TableComponent.setState({ contextMenuTarget: {}, activeRow: fakeRowSource });

            TableComponent.instance().hideContextMenu();
            TableComponent.update();

            const contextMenuComponent = TableComponent.find('.d2-ui-table__context-menu');

            expect(contextMenuComponent).toHaveLength(0);
            expect(TableComponent.state('activeRow')).toBe(undefined);
        });

        it('should initially not show the contextmenu', () => {
            expect(TableComponent.find('.d2-ui-table__context-menu')).toHaveLength(0);
        });

        // TODO: The Popover requires a dom element as a targetEl prop. Figure out how to test this without a DOM.
        xit('should hide the contextmenu when left clicking outside the contextmenu', () => {
            const fakeRowSource = { name: 'My item' };

            TableComponent.instance()
                .handleRowClick(
                    { currentTarget: TableComponent },
                    fakeRowSource,
                );
            TableComponent.update();

            expect(TableComponent.find('.d2-ui-table__context-menu')).toHaveLength(1);

            // onRequestClose is called when clicking outside the menu
            TableComponent.find(Popover).props().onRequestClose();
            TableComponent.update();

            expect(TableComponent.find('.d2-ui-table__context-menu')).toHaveLength(0);
        });
    });

    describe('context menu action filtering', () => {
        let isContextActionAllowed;
        let contextMenuActions;
        let fakeRowSource;

        beforeEach(() => {
            fakeRowSource = { name: 'My item' };

            isContextActionAllowed = jest.fn().mockReturnValue(true);
            contextMenuActions = {
                edit: () => {},
                delete: () => {},
                translate: () => {},
            };

            TableComponent = renderComponent({ isContextActionAllowed, contextMenuActions });
        });

        it('should pass through when the actions are allowed', () => {
            // Show context menu initially
            TableComponent.setState({ contextMenuTarget: {}, activeRow: fakeRowSource });
            const passedContextMenuActions = TableComponent.find(TableContextMenu).props().actions;

            expect(Object.keys(passedContextMenuActions)).toEqual(['edit', 'delete', 'translate']);
        });

        it('should not pass actions that are not allowed', () => {
            const falseForDeleteActionType = (source, action) => action !== 'delete';

            isContextActionAllowed
                .mockReset()
                .mockImplementation(falseForDeleteActionType);

            TableComponent = renderComponent({ isContextActionAllowed, contextMenuActions });

            // Show context menu initially
            TableComponent.setState({ contextMenuTarget: {}, activeRow: fakeRowSource });
            const passedContextMenuActions = TableComponent.find(TableContextMenu).props().actions;

            expect(Object.keys(passedContextMenuActions)).toEqual(['edit', 'translate']);
        });
    });
});

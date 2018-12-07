import React from 'react';
import { shallow } from 'enzyme';
import Table from '../Table.component';
import TableHeader from '../TableHeader.component';
import TableContextMenu from '../TableContextMenu.component';

describe('Table component', () => {
    let tableComponent;
    const contextMenuActions = {
        edit: Function.prototype,
        remove: Function.prototype,
    };

    function renderComponent(props = {}) {
        return shallow(<Table {...Object.assign({ contextMenuActions }, props)} />);
    }

    beforeEach(() => {
        tableComponent = renderComponent();
    });

    describe('initial state', () => {
        it('should have set the default columns', () => {
            expect(tableComponent.state('columns')).toEqual(['name', 'lastUpdated']);
        });

        it('should have a d2-ui-table row', () => {
            expect(tableComponent.hasClass('d2-ui-table')).toBe(true);
        });
    });

    describe('with headers', () => {
        it('should have set the passed columns', () => {
            const columns = ['name', 'code', 'lastUpdated'];

            tableComponent = renderComponent({ columns });

            expect(tableComponent.state('columns')).toEqual(['name', 'code', 'lastUpdated']);
        });

        it('should not set the columns if the column value is not an array of strings', () => {
            const columns = ['name', 'code', 'lastUpdated', {}];

            tableComponent = renderComponent({ columns });

            expect(tableComponent.state('columns')).toEqual(['name', 'lastUpdated']);
        });

        it('should generate the headers wrap', () => {
            expect(tableComponent.find('.d2-ui-table__headers')).toHaveLength(1);
        });

        it('should generate the correct number of headers', () => {
            expect(tableComponent.find(TableHeader)).toHaveLength(3);
        });
    });

    it('should have a property for rows that is empty', () => {
        expect(Array.isArray(tableComponent.state().dataRows)).toBe(true);
    });

    describe('with source', () => {
        beforeEach(() => {
            const tableSource = [
                { uid: 'b1', name: 'BDC', lastUpdated: 'Tomorrow' },
                { uid: 'f1', name: 'BFG', lastUpdated: 'Last year' },
                { uid: 'c1', name: 'BFG', lastUpdated: 'Today' },
            ];

            tableComponent = renderComponent({ rows: tableSource });
        });

        it('should have set the dataRows onto the state', () => {
            expect(tableComponent.state('dataRows')).toHaveLength(3);
        });

        it('should not set the dataRows when the received value is not iterable', () => {
            tableComponent = renderComponent({ rows: {} });

            expect(tableComponent.state('dataRows')).toHaveLength(0);
        });

        it('should generate a row wrap', () => {
            expect(tableComponent.find('.d2-ui-table__rows')).toHaveLength(1);
        });

        it('should update the source when the rows property changes', () => {
            tableComponent.setProps({ rows: [{ uid: 'b1', name: 'BDC', lastUpdated: 'Tomorrow' }] });

            expect(tableComponent.state('dataRows').length).toBe(1);
        });

        it('should correctly render a map', () => {
            tableComponent.setProps({
                rows: new Map([
                    ['b1', { uid: 'b1', name: 'BDC', lastUpdated: 'Tomorrow' }],
                    ['f1', { uid: 'f1', name: 'BFG', lastUpdated: 'Last year' }],
                    ['c1', { uid: 'c1', name: 'BFG', lastUpdated: 'Today' }],
                ]),
            });

            expect(tableComponent.state('dataRows')).toHaveLength(3);
        });
    });

    describe('interaction', () => {
        beforeEach(() => {
            tableComponent = renderComponent();
        });

        it('should show the context menu when the activeRow state is set', () => {
            const fakeRowSource = { name: 'My item' };

            expect(tableComponent.find(TableContextMenu).props().activeItem)
                .toBeUndefined();

            tableComponent.instance()
                .handleRowClick(
                    { currentTarget: tableComponent },
                    fakeRowSource,
                );
            tableComponent.update();

            const contextMenuProps = tableComponent.find(TableContextMenu).props();

            expect(contextMenuProps.target).toEqual(tableComponent);
            expect(contextMenuProps.activeItem).toEqual(fakeRowSource);
        });

        it('should hide the context menu when handleRowClick is called twice with the same source', () => {
            const fakeRowSource = { name: 'My item' };

            expect(tableComponent.find(TableContextMenu).props().activeItem)
            .toBeUndefined();

            tableComponent.instance().handleRowClick({ clientY: 100, clientX: 100 }, fakeRowSource);
            tableComponent.update();

            expect(tableComponent.find(TableContextMenu).props().activeItem).toEqual(fakeRowSource);

            tableComponent.instance().handleRowClick({ clientY: 100, clientX: 100 }, fakeRowSource);
            tableComponent.update();

            expect(tableComponent.find(TableContextMenu).props().activeItem)
                .toBeUndefined();
        });

        it('should not render the context menu when the activeRow is undefined', () => {
            const fakeRowSource = { name: 'My item' };
            tableComponent.setState({ contextMenuTarget: {}, activeRow: fakeRowSource });

            expect(tableComponent.find(TableContextMenu).props().activeItem).toEqual(fakeRowSource);

            tableComponent.instance().hideContextMenu();
            tableComponent.update();

            expect(tableComponent.state('activeRow')).toBe(undefined);
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

            tableComponent = renderComponent({ isContextActionAllowed, contextMenuActions });
        });

        it('should pass through when the actions are allowed', () => {
            // Show context menu initially
            tableComponent.setState({ contextMenuTarget: {}, activeRow: fakeRowSource });
            const passedContextMenuActions = tableComponent.find(TableContextMenu).props().actions;

            expect(Object.keys(passedContextMenuActions)).toEqual(['edit', 'delete', 'translate']);
        });

        it('should not pass actions that are not allowed', () => {
            const falseForDeleteActionType = (source, action) => action !== 'delete';

            isContextActionAllowed
                .mockReset()
                .mockImplementation(falseForDeleteActionType);

            tableComponent = renderComponent({ isContextActionAllowed, contextMenuActions });

            // Show context menu initially
            tableComponent.setState({ contextMenuTarget: {}, activeRow: fakeRowSource });
            const passedContextMenuActions = tableComponent.find(TableContextMenu).props().actions;

            expect(Object.keys(passedContextMenuActions)).toEqual(['edit', 'translate']);
        });
    });
});

import React from 'react';
import { shallow } from 'enzyme';
import TableRow from '../TableRow.component';

describe('TableRow component', () => {
    let tableRowComponent;
    let dataElement;
    const cma = {
        edit(...args) {
            console.log('Edit', ...args);
        },
        remove(...args) {
            console.log('Remove', ...args);
        },
    };

    function renderComponent(props = {}) {
        const nops = {
            itemClicked: () => {},
            primaryClick: () => {},
        };
        return shallow(
            <TableRow {...Object.assign({ contextMenuActions: cma }, nops, props)} />,
            {
                context: {
                    d2: {
                        i18n: {
                            getTranslation(key) {
                                return `${key}_translated`;
                            },
                        },
                    },
                },
            },
        );
    }

    beforeEach(() => {
        dataElement = {
            lastUpdated: '2015-04-30T15:49:21.918+0000',
            code: 'p.ci.ipsl.xxxx',
            created: '2015-04-30T15:47:26.421+0000',
            name: 'Centre de Diagnostic et de Traitement de Bongouanou',
            id: 'uaNRsuzpsTW',
            href: 'http://localhost:8080/dhis/api/organisationUnits/uaNRsuzpsTW',
            objectValue1: {
                displayName: 'ANC',
                name: 'ANC-1',
            },
            objectValue2: {
                name: 'ANC-1',
            },

            // Fake d2 model structure
            modelDefinition: {
                modelValidations: {
                    name: {
                        type: 'TEXT',
                    },
                },
            },
        };

        tableRowComponent = renderComponent({ dataSource: dataElement, columns: ['name', 'code', 'objectValue1', 'objectValue2'] });
    });

    it('should render one row', () => {
        expect(tableRowComponent.hasClass('d2-ui-table__rows__row')).toBe(true);
    });

    it('should render the correct amount of columns', () => {
        expect(tableRowComponent.find('.d2-ui-table__rows__row__column')).toHaveLength(5);
    });

    it('should render the name into the first column', () => {
        const firstColumn = tableRowComponent.find('.d2-ui-table__rows__row__column').first();

        expect(firstColumn.find('TextValue').first().prop('columnName')).toBe('name');
        expect(firstColumn.find('TextValue').first().prop('value')).toBe('Centre de Diagnostic et de Traitement de Bongouanou');
    });

    it('should render the code into the second column', () => {
        const secondColumn = tableRowComponent.find('.d2-ui-table__rows__row__column').at(1);

        expect(secondColumn.find('TextValue').first().prop('columnName')).toBe('code');
        expect(secondColumn.find('TextValue').first().prop('value')).toBe('p.ci.ipsl.xxxx');
    });

    it('should render the ObjectWithDisplayName field type when the value has a displayName', () => {
        const thirdColumn = tableRowComponent.find('.d2-ui-table__rows__row__column').at(2);

        expect(thirdColumn.find('ObjectWithDisplayName')).toHaveLength(1);
        expect(thirdColumn.find('ObjectWithDisplayName').prop('value')).toEqual(dataElement.objectValue1);
    });

    it('should fire the primaryClick callback when a row is clicked', () => {
        const primaryClickCallback = jest.fn();
        tableRowComponent = renderComponent({
            dataSource: dataElement,
            columns: ['name', 'code', 'objectValue1', 'objectValue2'],
            primaryClick: primaryClickCallback,
        });

        tableRowComponent.find('.d2-ui-table__rows__row__column').first().simulate('click');

        expect(primaryClickCallback).toHaveBeenCalled();
        expect(primaryClickCallback.mock.calls[0][0]).toBe(dataElement);
    });

    it('should fire the itemClicked callback when a row is clicked', () => {
        const contextClickCallback = jest.fn();
        tableRowComponent = renderComponent({
            dataSource: dataElement,
            columns: ['name', 'code', 'objectValue1', 'objectValue2'],
            itemClicked: contextClickCallback,
        });

        tableRowComponent.find('.d2-ui-table__rows__row__column').first().simulate('contextMenu');

        expect(contextClickCallback).toHaveBeenCalled();
        expect(contextClickCallback.mock.calls[0][1]).toBe(dataElement);
    });

    it('should fire the itemClicked callback when the icon is clicked', () => {
        const contextClickCallback = jest.fn();
        tableRowComponent = renderComponent({
            dataSource: dataElement,
            columns: ['name', 'code', 'objectValue1', 'objectValue2'],
            itemClicked: contextClickCallback,
        });

        tableRowComponent.find('IconButton').first().simulate('click');

        expect(contextClickCallback).toHaveBeenCalled();
        expect(contextClickCallback.mock.calls[0][1]).toBe(dataElement);
    });
});

import React from 'react';
import {shallow} from 'enzyme';

import DataTableRow from '../../src/data-table/DataTableRow.component';
import Color from '../../src/data-table/data-value/Color.component';
import Translate from '../../src/i18n/Translate.component';

describe('DataTableRow component', () => {
    let dataTableRow;
    let dataElement;

    function renderComponent(props = {}) {
        return shallow(
            <DataTableRow {...Object.assign({contextMenuActions: {}}, props)} />,
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
            }
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

        dataTableRow = renderComponent({dataSource: dataElement, columns: ['name', 'code', 'objectValue1', 'objectValue2']});
    });

    it('should render one row', () => {
        expect(dataTableRow.hasClass('data-table__rows__row')).to.be.true;
    });

    it('should render the correct amount of columns', () => {
        expect(dataTableRow.find('.data-table__rows__row__column')).to.have.length(5);
    });

    it('should render the name into the first column', () => {
        const firstColumn = dataTableRow.find('.data-table__rows__row__column').first();

        expect(firstColumn.find('TextValue').first().prop('columnName')).to.equal('name');
        expect(firstColumn.find('TextValue').first().prop('value')).to.equal('Centre de Diagnostic et de Traitement de Bongouanou');
    });

    it('should render the code into the second column', () => {
        const secondColumn = dataTableRow.find('.data-table__rows__row__column').at(1);

        expect(secondColumn.find('TextValue').first().prop('columnName')).to.equal('code');
        expect(secondColumn.find('TextValue').first().prop('value')).to.equal('p.ci.ipsl.xxxx');
    });

    it('should render the ObjectWithDisplayName field type when the value has a displayName', () => {
        const thirdColumn = dataTableRow.find('.data-table__rows__row__column').at(2);

        expect(thirdColumn.find('ObjectWithDisplayName')).to.have.length(1);
        expect(thirdColumn.find('ObjectWithDisplayName').prop('value')).to.deep.equal(dataElement.objectValue1);
    });

    it('should fire the primaryClick callback when a row is clicked', () => {
        const primaryClickCallback = spy();
        dataTableRow = renderComponent({
            dataSource: dataElement,
            columns: ['name', 'code', 'objectValue1', 'objectValue2'],
            primaryClick: primaryClickCallback,
        });

        dataTableRow.find('.data-table__rows__row__column').first().simulate('click');

        expect(primaryClickCallback).to.be.calledWith(dataElement);
    });

    it('should fire the itemClicked callback when a row is clicked', () => {
        const contextClickCallback = spy();
        dataTableRow = renderComponent({
            dataSource: dataElement,
            columns: ['name', 'code', 'objectValue1', 'objectValue2'],
            itemClicked: contextClickCallback,
        });

        dataTableRow.find('.data-table__rows__row__column').first().simulate('contextMenu');

        expect(contextClickCallback).to.be.called;
        expect(contextClickCallback.getCall(0).args[1]).to.equal(dataElement);
    });

    it('should fre the itemClicked callback when the icon is clicked', () => {
        const contextClickCallback = spy();
        dataTableRow = renderComponent({
            dataSource: dataElement,
            columns: ['name', 'code', 'objectValue1', 'objectValue2'],
            itemClicked: contextClickCallback,
        });

        dataTableRow.find('IconButton').first().simulate('click');

        expect(contextClickCallback).to.be.called;
        expect(contextClickCallback.getCall(0).args[1]).to.equal(dataElement);
    });
});

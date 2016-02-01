import React from 'react/addons';
import getRenderFunctionForComponent from '../../config/getRenderFunctionForComponent';
import {shallow} from 'enzyme';

import DataTableRow from '../../src/data-table/DataTableRow.component';

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
        };

        dataTableRow = renderComponent({dataSource: dataElement, columns: ['name', 'code', 'objectValue1', 'objectValue2']});
    });

    it('should render one row', () => {
        expect(dataTableRow.hasClass('data-table__rows__row')).to.be.true;
    });

    it('should render the correct amount of columns', () => {
        expect(dataTableRow.find('.data-table__rows__row__column')).to.have.length(4);
    });

    it('should render the name into the first column', () => {
        const firstColumn = dataTableRow.find('.data-table__rows__row__column').first();

        expect(firstColumn.text()).to.equal('Centre de Diagnostic et de Traitement de Bongouanou');
    });

    it('should render the name into the second column', () => {
        const secondColumn = dataTableRow.find('.data-table__rows__row__column').at(1);

        expect(secondColumn.text()).to.equal('p.ci.ipsl.xxxx');
    });

    it('should render the displayName when the value is an object', () => {
        const thirdColumn = dataTableRow.find('.data-table__rows__row__column').at(2);

        expect(thirdColumn.text()).to.equal('ANC');
    });

    it('should fire the primaryClick callback when a row is clicked', () => {
        const primaryClickCallback = spy();
        dataTableRow = renderComponent({
            dataSource: dataElement,
            columns: ['name', 'code', 'objectValue1', 'objectValue2'],
            primaryClick: primaryClickCallback,
        });

        dataTableRow.simulate('click');

        expect(primaryClickCallback).to.be.calledWith(dataElement);
    });

    it('should fire the itemClicked callback when a row is clicked', () => {
        const contextClickCallback = spy();
        dataTableRow = renderComponent({
            dataSource: dataElement,
            columns: ['name', 'code', 'objectValue1', 'objectValue2'],
            itemClicked: contextClickCallback,
        });

        dataTableRow.simulate('contextMenu');

        expect(contextClickCallback).to.be.called;
        expect(contextClickCallback.getCall(0).args[1]).to.equal(dataElement);
    });
});

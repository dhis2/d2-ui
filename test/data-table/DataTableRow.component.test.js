import React from 'react/addons';
import DataTableRow from '../../src/data-table/DataTableRow.component';

const TestUtils = React.addons.TestUtils;

describe('DataTableRow component', () => {
    let dataTableRow;
    let dataElement;

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

        dataTableRow = TestUtils.renderIntoDocument(
            <DataTableRow dataSource={dataElement} columns={['name', 'code', 'objectValue1', 'objectValue2']} />
        );
    });

    it('should render one row', () => {
        expect(() => TestUtils.findRenderedDOMComponentWithClass(dataTableRow, 'data-table__rows__row')).not.to.throw();
    });

    it('should render two columns', () => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(dataTableRow, 'data-table__rows__row__column').length).to.equal(4);
    });

    it('should render the name into the first column', () => {
        const firstColumn = TestUtils.scryRenderedDOMComponentsWithClass(dataTableRow, 'data-table__rows__row__column')[0];

        expect(firstColumn.getDOMNode().textContent).to.equal('Centre de Diagnostic et de Traitement de Bongouanou');
    });

    it('should render the name into the second column', () => {
        const secondColumn = TestUtils.scryRenderedDOMComponentsWithClass(dataTableRow, 'data-table__rows__row__column')[1];

        expect(secondColumn.getDOMNode().textContent).to.equal('p.ci.ipsl.xxxx');
    });

    it('should render the displayName when the value is an object', () => {
        const thirdColumn = TestUtils.scryRenderedDOMComponentsWithClass(dataTableRow, 'data-table__rows__row__column')[2];

        expect(thirdColumn.getDOMNode().textContent).to.equal('ANC');
    });
});

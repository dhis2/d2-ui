import React from 'react';
import {shallow} from 'enzyme';

import DataTableRow from '../../src/data-table/DataTableRow.component';
import Color from '../../src/data-table/data-value/Color.component';

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
        expect(dataTableRow.find('.data-table__rows__row__column')).to.have.length(5);
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

        dataTableRow.find('.data-table__rows__row__column').first().simulate('click');
        expect(primaryClickCallback).to.be.calledWith(undefined,dataElement);
    });

    it('should fire the itemClicked callback when a row is clicked', () => {
        const fakeEvent = {preventDefault:sinon.stub().returns(true)};
        const contextClickCallback = spy();
        dataTableRow = renderComponent({
            dataSource: dataElement,
            columns: ['name', 'code', 'objectValue1', 'objectValue2'],
            itemClicked: contextClickCallback,
        });
        
        dataTableRow.find('.data-table__rows__row__column').first().simulate('contextMenu',fakeEvent);
       
        expect(contextClickCallback).to.be.called;
        expect(contextClickCallback.getCall(0).args[1]).to.equal(dataElement);
    });

    describe('transformation of', () => {
        let dataTableRowProps;

        describe('publicAccess values', () => {
            beforeEach(() => {
                dataTableRowProps = {
                    dataSource: dataElement,
                    columns: ['publicAccess'],
                };
            });

            it('should transformation the r------- publicAccess pattern to their textual values', () => {
                dataElement.publicAccess = 'r-------';

                dataTableRow = renderComponent(dataTableRowProps).find('.data-table__rows__row__column').first();

                expect(dataTableRow.text()).to.equal('public_can_view_translated');
            });

            it('should transformation the rw------ publicAccess pattern to their textual values', () => {
                dataElement.publicAccess = 'rw------';

                dataTableRow = renderComponent(dataTableRowProps).find('.data-table__rows__row__column').first();

                expect(dataTableRow.text()).to.equal('public_can_edit_translated');
            });

            it('should transformation the -------- publicAccess pattern to their textual values', () => {
                dataElement.publicAccess = '--------';

                dataTableRow = renderComponent(dataTableRowProps).find('.data-table__rows__row__column').first();

                expect(dataTableRow.text()).to.equal('public_none_translated');
            });

            it('should not transformation an unknown publicAccess pattern', () => {
                dataElement.publicAccess = 'rwx-----';

                dataTableRow = renderComponent(dataTableRowProps).find('.data-table__rows__row__column').first();

                expect(dataTableRow.text()).to.equal('rwx-----');
            });

            it('should not transformation an empty value', () => {
                dataTableRow = renderComponent(dataTableRowProps).find('.data-table__rows__row__column').first();

                expect(dataTableRow.text()).to.equal('');
            });
        });

        describe('guessing of the value type', () => {
            beforeEach(() => {
                dataTableRowProps = {
                    dataSource: dataElement,
                    columns: ['lastUpdated'],
                };
            });

            it('should return a human readable string for a year ago', () => {
                const dateAYearAgo = (new Date(Date.now() - 31540000000)).toISOString();

                dataTableRowProps.dataSource.lastUpdated = dateAYearAgo;
                dataTableRowProps.dataSource.modelDefinition = {
                    modelValidations: {
                        lastUpdated: {
                            type: 'DATE',
                        },
                    },
                };

                dataTableRow = renderComponent(dataTableRowProps).find('.data-table__rows__row__column').first();

                expect(dataTableRow.text()).to.equal('a year ago');
            });

            it('should just return the plain value if the value can not be guessed', () => {
                dataTableRowProps.columns = ['unknownProperty'];
                dataTableRowProps.dataSource.unknownProperty = 'unknown value';
                dataTableRowProps.dataSource.modelDefinition = {
                    modelValidations: {
                        unknownProperty: {
                            type: 'UNKNOWN_TYPE',
                        },
                    },
                };

                dataTableRow = renderComponent(dataTableRowProps).find('.data-table__rows__row__column').first();

                expect(dataTableRow.text()).to.equal('unknown value');
            });

            it('should render a Color component when the value is a hex color', () => {
                dataTableRowProps = {
                    dataSource: dataElement,
                    columns: ['color'],
                };

                dataTableRowProps.dataSource.color = '#FF35CC';
                dataTableRowProps.dataSource.modelDefinition = {
                    modelValidations: {
                        color: {
                            type: 'TEXT',
                        },
                    },
                };

                dataTableRow = renderComponent(dataTableRowProps).find('.data-table__rows__row__column').first();

                expect(dataTableRow.find(Color)).to.have.length(1);
                expect(dataTableRow.find(Color).props().value).to.equal('#FF35CC');

            });
        });

        describe('complex values with names', () => {
            it('should render the displayName property of the value if it has one', () => {
                dataTableRowProps.columns = ['user'];
                dataTableRowProps.dataSource.user = {
                    displayName: 'Mark',
                };

                dataTableRow = renderComponent(dataTableRowProps).find('.data-table__rows__row__column').first();

                expect(dataTableRow.text()).to.equal('Mark');
            });

            it('should render the name propery of the value if the displayName property is not there', () => {
                dataTableRowProps.columns = ['user'];
                dataTableRowProps.dataSource.user = {
                    name: 'Mark',
                };

                dataTableRow = renderComponent(dataTableRowProps).find('.data-table__rows__row__column').first();

                expect(dataTableRow.text()).to.equal('Mark');
            });

            it('should render the object if there is no name or displayName property', () => {
                dataTableRowProps.columns = ['user'];
                dataTableRowProps.dataSource.user = {
                    access: 'all',
                    id: 'id',
                };

                dataTableRow = renderComponent(dataTableRowProps).find('.data-table__rows__row__column').first();

                expect(dataTableRow.text()).to.equal('[object Object]');
            });

            it('should use the objects toString method if it has one', () => {
                dataTableRowProps.columns = ['user'];
                dataTableRowProps.dataSource.user = {
                    access: 'all',
                    id: 'id',
                    toString() {
                        return 'access: all, id: id';
                    },
                };

                dataTableRow = renderComponent(dataTableRowProps).find('.data-table__rows__row__column').first();

                expect(dataTableRow.text()).to.equal('access: all, id: id');
            });
        });
    });
});

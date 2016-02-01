import React from 'react/addons';
import getRenderFunctionForComponent from '../../config/getRenderFunctionForComponent';
import {shallow} from 'enzyme';

import DataTableHeader from '../../src/data-table/DataTableHeader.component';

describe('DataTableHeader component', () => {
    let dataTableComponent;

    function renderComponent(props = {}) {
        return shallow(
            <DataTableHeader {...Object.assign({contextMenuActions: {}}, props)} />,
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
        dataTableComponent = renderComponent({name: 'lastUpdated'});
    });

    it('should load two columns', () => {
        expect(dataTableComponent).to.have.length(1);
    });

    it('should transform display as underscores and translate', () => {
        expect(dataTableComponent.text()).to.equal('last_updated_translated');
    });

    it('should add the data-table__headers__header--even class', () => {
        expect(dataTableComponent.hasClass('data-table__headers__header--even')).to.be.true;
    });

    it('should add the data-table__headers__header--odd class', () => {
        dataTableComponent = renderComponent({name: 'lastUpdated', isOdd: true});

        expect(dataTableComponent.hasClass('data-table__headers__header--odd')).to.be.true;
    });
});

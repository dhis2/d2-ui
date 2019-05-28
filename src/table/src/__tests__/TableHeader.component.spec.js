import React from 'react';
import { shallow } from 'enzyme';
import TableHeader from '../TableHeader.component';

describe('TableHeader component', () => {
    let tableHeaderComponent;
    const cma = {
        edit(...args) {
            console.log('Edit', ...args);
        },
        remove(...args) {
            console.log('Remove', ...args);
        },
    };

    function renderComponent(props = {}) {
        return shallow(
            <TableHeader {...Object.assign({ contextMenuActions: cma }, props)} />,
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
        tableHeaderComponent = renderComponent({ name: 'lastUpdated' });
    });

    it('should load two columns', () => {
        expect(tableHeaderComponent).toHaveLength(1);
    });

    it('should transform display as underscores and translate', () => {
        expect(tableHeaderComponent.text()).toBe('last_updated_translated');
    });

    it('should add the d2-ui-table__headers__header--even class', () => {
        expect(tableHeaderComponent.hasClass('d2-ui-table__headers__header--even')).toBe(true);
    });

    it('should add the d2-ui-table__headers__header--odd class', () => {
        tableHeaderComponent = renderComponent({ name: 'lastUpdated', isOdd: true });

        expect(tableHeaderComponent.hasClass('d2-ui-table__headers__header--odd')).toBe(true);
    });
});

import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../Pagination.component';

describe('Pagination component', () => {
    let dataTablePagerComponent;
    let mockPager;
    let renderComponent;

    beforeEach(() => {
        mockPager = {
            hasNextPage: jest.fn().mockReturnValue(false),
            hasPreviousPage: jest.fn().mockReturnValue(false),
            onNextPageClick: jest.fn(),
            onPreviousPageClick: jest.fn(),
            total: 725,
        };

        renderComponent = (props = mockPager) => {
            dataTablePagerComponent = shallow(<Pagination {...props} />);
        };
    });

    it('should have the component name as a class', () => {
        renderComponent();

        expect(dataTablePagerComponent.hasClass('data-table-pager')).toBe(true);
    });

    it('should have rendered the next button', () => {
        mockPager.hasNextPage.mockReturnValue(true);

        renderComponent();

        expect(dataTablePagerComponent.find('.data-table-pager--next-page')).toHaveLength(1);
    });

    it('should have rendered the previous button', () => {
        mockPager.hasPreviousPage.mockReturnValue(true);

        renderComponent();

        expect(dataTablePagerComponent.find('.data-table-pager--previous-page')).toHaveLength(1);
    });

    it('should render the previous button as disabled', () => {
        renderComponent();

        const previousIElement = dataTablePagerComponent.find('.data-table-pager--previous-page').find('i');

        expect(previousIElement.hasClass('data-table-pager--previous-page__disabled')).toBe(true);
    });

    it('should render the next button as disabled', () => {
        renderComponent();

        const previousIElement = dataTablePagerComponent.find('.data-table-pager--next-page').find('i');

        expect(previousIElement.hasClass('data-table-pager--next-page__disabled')).toBe(true);
    });

    it('should have rendered a ul wrapper with the data-table-pager--buttons class', () => {
        renderComponent();

        expect(dataTablePagerComponent.find('ul')).toHaveLength(1);
        expect(dataTablePagerComponent.find('ul').hasClass('data-table-pager--buttons')).toBe(true);
    });

    it('should render the next and previous buttons as li items', () => {
        mockPager.hasNextPage.mockReturnValue(true);
        mockPager.hasPreviousPage.mockReturnValue(true);

        renderComponent();

        const nextPageElement = dataTablePagerComponent.find('.data-table-pager--next-page');
        const previousPageElement = dataTablePagerComponent.find('.data-table-pager--previous-page');

        expect(nextPageElement.getElement().type).toBe('li');
        expect(previousPageElement.getElement().type).toBe('li');
    });

    it('should add the data-table-pager--buttons--button class to the next and previous buttons', () => {
        mockPager.hasNextPage.mockReturnValue(true);
        mockPager.hasPreviousPage.mockReturnValue(true);

        renderComponent();

        const nextPageElement = dataTablePagerComponent.find('.data-table-pager--next-page');
        const previousPageElement = dataTablePagerComponent.find('.data-table-pager--previous-page');

        expect(nextPageElement.getElement().type).toBe('li');
        expect(previousPageElement.getElement().type).toBe('li');
    });

    it('should call the onNextPageClick handler when the nextPage button is clicked', () => {
        mockPager.hasNextPage.mockReturnValue(true);
        mockPager.hasPreviousPage.mockReturnValue(true);
        renderComponent();

        const nextPageElement = dataTablePagerComponent.find('.data-table-pager--next-page');

        nextPageElement.find('i').first().simulate('click');

        expect(mockPager.onNextPageClick).toHaveBeenCalled();
    });

    it('should call the onPreviousPageClick handler when the previous button is clicked', () => {
        mockPager.hasNextPage.mockReturnValue(true);
        mockPager.hasPreviousPage.mockReturnValue(true);
        renderComponent();

        const previousPageElement = dataTablePagerComponent.find('.data-table-pager--previous-page');

        previousPageElement.find('i').simulate('click');

        expect(mockPager.onPreviousPageClick).toHaveBeenCalled();
    });

    it('should display the page statistics in the middle of the pager', () => {
        mockPager.hasNextPage.mockReturnValue(true);
        mockPager.hasPreviousPage.mockReturnValue(true);
        renderComponent();

        expect(dataTablePagerComponent.find('.data-table-pager--page-info')).toHaveLength(1);
    });

    it('should not display the page statistics in if there is no total count', () => {
        mockPager.hasNextPage.mockReturnValue(true);
        mockPager.hasPreviousPage.mockReturnValue(true);
        delete mockPager.total;

        renderComponent();

        expect(dataTablePagerComponent.find('.data-table-pager--page-info')).toHaveLength(0);
    });

    it('should not throw when no clickHandler was provded', () => {
        mockPager.hasNextPage.mockReturnValue(true);
        mockPager.hasPreviousPage.mockReturnValue(true);
        renderComponent();
        dataTablePagerComponent.setProps({
            onNextPageClick: undefined,
        });

        const nextPageElement = dataTablePagerComponent.find('.data-table-pager--next-page');

        expect(() => nextPageElement.find('i').first().simulate('click')).not.toThrow();
    });
});

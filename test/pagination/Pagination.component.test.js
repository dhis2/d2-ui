import React from 'react/addons';
import {element} from 'd2-testutils';
import injectTheme from '../config/inject-theme';
import PaginationWithoutContext from '../../src/pagination/Pagination.component';

const {
    findRenderedComponentWithType,
    renderIntoDocument,
    Simulate,
} = React.addons.TestUtils;

describe('Pagination component', () => {
    let dataTablePagerComponent;
    let mockPager;
    let renderComponent;

    beforeEach(() => {
        mockPager = {
            hasNextPage: stub().returns(false),
            hasPreviousPage: stub().returns(false),
            onNextPageClick: spy(),
            onPreviousPageClick: spy(),
            total: 725,
        };

        const Pagination = injectTheme(PaginationWithoutContext);
        renderComponent = () => {
            const renderedComponents = renderIntoDocument(<Pagination {...mockPager} />);

            dataTablePagerComponent = findRenderedComponentWithType(renderedComponents, PaginationWithoutContext);

            return dataTablePagerComponent;
        };
    });

    it('should have the component name as a class', () => {
        renderComponent();

        expect(element(dataTablePagerComponent).hasClass('data-table-pager')).to.be.true;
    });

    it('should have rendered the next button', () => {
        mockPager.hasNextPage.returns(true);

        renderComponent();

        expect(() => element(dataTablePagerComponent, '.data-table-pager--next-page')).not.to.throw();
    });

    it('should have rendered the previous button', () => {
        mockPager.hasPreviousPage.returns(true);

        renderComponent();

        expect(() => element(dataTablePagerComponent, '.data-table-pager--previous-page')).not.to.throw();
    });

    it('should render the previous button as disabled', () => {
        renderComponent();

        const previousElement = element(dataTablePagerComponent, '.data-table-pager--previous-page');

        expect(element(previousElement.element.querySelector('i')).hasClass('data-table-pager--previous-page__disabled')).to.be.true;
    });

    it('should render the next button as disabled', () => {
        renderComponent();

        const nextElement = element(dataTablePagerComponent, '.data-table-pager--next-page');

        expect(element(nextElement.element.querySelector('i')).hasClass('data-table-pager--next-page__disabled')).to.be.true;
    });

    it('should have rendered a ul wrapper with the data-table-pager--buttons class', () => {
        renderComponent();

        expect(() => element(dataTablePagerComponent, 'ul')).not.to.throw();
        expect(element(dataTablePagerComponent, 'ul').hasClass('data-table-pager--buttons')).to.be.true;
    });

    it('should render the next and previous buttons as li items', () => {
        mockPager.hasNextPage.returns(true);
        mockPager.hasPreviousPage.returns(true);

        renderComponent();

        const nextPageElement = element(dataTablePagerComponent, '.data-table-pager--next-page');
        const previousPageElement = element(dataTablePagerComponent, '.data-table-pager--previous-page');

        expect(nextPageElement.isTag('li')).to.be.true;
        expect(previousPageElement.isTag('li')).to.be.true;
    });

    it('should add the data-table-pager--buttons--button class to the next and previous buttons', () => {
        mockPager.hasNextPage.returns(true);
        mockPager.hasPreviousPage.returns(true);

        renderComponent();

        const nextPageElement = element(dataTablePagerComponent, '.data-table-pager--next-page');
        const previousPageElement = element(dataTablePagerComponent, '.data-table-pager--previous-page');

        expect(nextPageElement.isTag('li')).to.be.true;
        expect(previousPageElement.isTag('li')).to.be.true;
    });

    it('should call the onNextPageClick handler when the nextPage button is clicked', () => {
        mockPager.hasNextPage.returns(true);
        mockPager.hasPreviousPage.returns(true);
        renderComponent();

        const nextPageElement = element(dataTablePagerComponent, '.data-table-pager--next-page');

        Simulate.click(nextPageElement.element.querySelector('i'));

        expect(mockPager.onNextPageClick).to.be.called;
    });

    it('should call the onPreviousPageClick handler when the previous button is clicked', () => {
        mockPager.hasNextPage.returns(true);
        mockPager.hasPreviousPage.returns(true);
        renderComponent();

        const previousPageElement = element(dataTablePagerComponent, '.data-table-pager--previous-page');

        Simulate.click(previousPageElement.element.querySelector('i'));

        expect(mockPager.onPreviousPageClick).to.be.called;
    });

    it('should display the page statistics in the middle of the pager', () => {
        mockPager.hasNextPage.returns(true);
        mockPager.hasPreviousPage.returns(true);
        renderComponent();

        expect(() => element(dataTablePagerComponent, '.data-table-pager--page-info')).not.to.throw();
    });

    it('should not display the page statistics in if there is no total count', () => {
        mockPager.hasNextPage.returns(true);
        mockPager.hasPreviousPage.returns(true);
        delete mockPager.total;

        renderComponent();

        expect(() => element(dataTablePagerComponent, '.data-table-pager--page-info')).to.throw();
    });
});

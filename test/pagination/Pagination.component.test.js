import React from 'react/addons';
import {getStubContext} from '../../config/inject-theme';
import Pagination from '../../src/pagination/Pagination.component';

import {shallow} from 'enzyme';

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

        renderComponent = (props = mockPager) => {
            dataTablePagerComponent = shallow(<Pagination {...props} />, {context: getStubContext()});
        };
    });

    it('should have the component name as a class', () => {
        renderComponent();

        expect(dataTablePagerComponent.hasClass('data-table-pager')).to.be.true;
    });

    it('should have rendered the next button', () => {
        mockPager.hasNextPage.returns(true);

        renderComponent();

        expect(dataTablePagerComponent.find('.data-table-pager--next-page')).to.have.length(1);
    });

    it('should have rendered the previous button', () => {
        mockPager.hasPreviousPage.returns(true);

        renderComponent();

        expect(dataTablePagerComponent.find('.data-table-pager--previous-page')).to.have.length(1);
    });

    it('should render the previous button as disabled', () => {
        renderComponent();

        const previousIElement = dataTablePagerComponent.find('.data-table-pager--previous-page').find('i');

        expect(previousIElement.hasClass('data-table-pager--previous-page__disabled')).to.be.true;
    });

    it('should render the next button as disabled', () => {
        renderComponent();

        const previousIElement = dataTablePagerComponent.find('.data-table-pager--next-page').find('i');

        expect(previousIElement.hasClass('data-table-pager--next-page__disabled')).to.be.true;
    });

    it('should have rendered a ul wrapper with the data-table-pager--buttons class', () => {
        renderComponent();

        expect(dataTablePagerComponent.find('ul')).to.have.length(1);
        expect(dataTablePagerComponent.find('ul').hasClass('data-table-pager--buttons')).to.be.true;
    });

    it('should render the next and previous buttons as li items', () => {
        mockPager.hasNextPage.returns(true);
        mockPager.hasPreviousPage.returns(true);

        renderComponent();

        const nextPageElement = dataTablePagerComponent.find('.data-table-pager--next-page');
        const previousPageElement = dataTablePagerComponent.find('.data-table-pager--previous-page');

        expect(nextPageElement.node.type).to.equal('li');
        expect(previousPageElement.node.type).to.equal('li');
    });

    it('should add the data-table-pager--buttons--button class to the next and previous buttons', () => {
        mockPager.hasNextPage.returns(true);
        mockPager.hasPreviousPage.returns(true);

        renderComponent();

        const nextPageElement = dataTablePagerComponent.find('.data-table-pager--next-page');
        const previousPageElement = dataTablePagerComponent.find('.data-table-pager--previous-page');

        expect(nextPageElement.node.type).to.equal('li');
        expect(previousPageElement.node.type).to.equal('li');
    });

    it('should call the onNextPageClick handler when the nextPage button is clicked', () => {
        mockPager.hasNextPage.returns(true);
        mockPager.hasPreviousPage.returns(true);
        renderComponent();

        const nextPageElement = dataTablePagerComponent.find('.data-table-pager--next-page');

        nextPageElement.find('i').first().simulate('click');

        expect(mockPager.onNextPageClick).to.be.called;
    });

    it('should call the onPreviousPageClick handler when the previous button is clicked', () => {
        mockPager.hasNextPage.returns(true);
        mockPager.hasPreviousPage.returns(true);
        renderComponent();

        const previousPageElement = dataTablePagerComponent.find('.data-table-pager--previous-page');

        previousPageElement.find('i').simulate('click');

        expect(mockPager.onPreviousPageClick).to.be.called;
    });

    it('should display the page statistics in the middle of the pager', () => {
        mockPager.hasNextPage.returns(true);
        mockPager.hasPreviousPage.returns(true);
        renderComponent();

        expect(dataTablePagerComponent.find('.data-table-pager--page-info')).to.have.length(1);
    });

    it('should not display the page statistics in if there is no total count', () => {
        mockPager.hasNextPage.returns(true);
        mockPager.hasPreviousPage.returns(true);
        delete mockPager.total;

        renderComponent();

        expect(dataTablePagerComponent.find('.data-table-pager--page-info')).to.have.length(0);
    });

    it('should not throw when no clickHandler was provded', () => {
        mockPager.hasNextPage.returns(true);
        mockPager.hasPreviousPage.returns(true);
        renderComponent();
        dataTablePagerComponent.setProps({
            onNextPageClick: undefined,
        });

        const nextPageElement = dataTablePagerComponent.find('.data-table-pager--next-page');

        expect(() => nextPageElement.find('i').first().simulate('click')).not.to.throw();
    });
});

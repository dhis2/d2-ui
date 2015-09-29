import React from 'react';
import classes from 'classnames';

const noop = () => {
};

const Pagination = React.createClass({
    propTypes: {
        hasPreviousPage: React.PropTypes.func,
        hasNextPage: React.PropTypes.func,
        onPreviousPageClick: React.PropTypes.func,
        onNextPageClick: React.PropTypes.func,
        total: React.PropTypes.number,
        currentlyShown: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ]),
    },

    getDefaultProps() {
        return {
            hasPreviousPage: noop,
            hasNextPage: noop,
            onPreviousPageClick: noop,
            onNextPageClick: noop,
            total: 0,
            currentlyShown: 0,
        };
    },

    render() {
        const {hasPreviousPage, hasNextPage, onPreviousPageClick, onNextPageClick, currentlyShown, total} = this.props;
        const pagerButtonClasses = ['material-icons', 'waves-effect'];

        const previousPageClasses = classes(pagerButtonClasses, {'data-table-pager--previous-page__disabled': !hasPreviousPage()});
        const nextPageClasses = classes(pagerButtonClasses, {'data-table-pager--next-page__disabled': !hasNextPage()});

        return (
            <div className="data-table-pager">
                <ul className="data-table-pager--buttons">
                    {total ?
                        <li className="data-table-pager--page-info"><span>{currentlyShown} of {total}</span></li> : ''}
                    <li className="data-table-pager--previous-page">
                        <i className={previousPageClasses}
                           onClick={hasPreviousPage() ? onPreviousPageClick : noop}>navigate_before</i>
                    </li>
                    <li className="data-table-pager--next-page">
                        <i className={nextPageClasses}
                           onClick={hasNextPage() ? onNextPageClick : noop}>navigate_next</i>
                    </li>
                </ul>
            </div>
        );
    },
});

export default Pagination;

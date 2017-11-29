import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from 'classnames';
import { config } from 'd2/lib/d2';

const noop = () => {};

config.i18n.strings.add('of_page');

class Pagination extends Component {
    constructor(props, context) {
        super(props, context);

        this.getTranslation = this.context.d2.i18n.getTranslation.bind(this);
    }

    render() {
        const { hasPreviousPage, hasNextPage, onPreviousPageClick, onNextPageClick, currentlyShown, total } = this.props;
        const pagerButtonClasses = ['material-icons', 'waves-effect'];

        const previousPageClasses = classes(pagerButtonClasses, { 'data-table-pager--previous-page__disabled': !hasPreviousPage() });
        const nextPageClasses = classes(pagerButtonClasses, { 'data-table-pager--next-page__disabled': !hasNextPage() });

        return (
            <div className="data-table-pager">
                <ul className="data-table-pager--buttons">
                    {total ?
                        <li className="data-table-pager--page-info"><span>{currentlyShown} {`${this.getTranslation('of_page')}`} {total}</span></li> : ''}
                    <li className="data-table-pager--previous-page">
                        <i
                            className={previousPageClasses}
                            onClick={hasPreviousPage() ? onPreviousPageClick : noop}
                        >navigate_before</i>
                    </li>
                    <li className="data-table-pager--next-page">
                        <i
                            className={nextPageClasses}
                            onClick={hasNextPage() ? onNextPageClick : noop}
                        >navigate_next</i>
                    </li>
                </ul>
            </div>
        );
    }
}

Pagination.propTypes = {
    hasPreviousPage: PropTypes.func,
    hasNextPage: PropTypes.func,
    onPreviousPageClick: PropTypes.func,
    onNextPageClick: PropTypes.func,
    total: PropTypes.number,
    currentlyShown: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};

Pagination.defaultProps = {
    hasPreviousPage: noop,
    hasNextPage: noop,
    onPreviousPageClick: noop,
    onNextPageClick: noop,
    total: 0,
    currentlyShown: 0,
};

Pagination.contextTypes = {
    d2: PropTypes.object,
};

export default Pagination;

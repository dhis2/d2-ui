import {camelCaseToUnderscores} from 'd2-utils';

import React from 'react';
import classes from 'classnames';

const DataTableHeader = React.createClass({
    propTypes: {
        isOdd: React.PropTypes.bool,
        isEven: React.PropTypes.bool,
        name: React.PropTypes.string.isRequired,
    },

    render() {
        const classList = classes(
            'data-table__headers__header',
            {
                'data-table__headers__header--even': !this.props.isOdd,
                'data-table__headers__header--odd': this.props.isOdd,
            });

        return (<div className={classList}>{camelCaseToUnderscores(this.props.name)}</div>);
    },
});

export default DataTableHeader;

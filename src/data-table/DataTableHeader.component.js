import camelCaseToUnderscores from 'd2-utilizr/lib/camelCaseToUnderscores';
import React from 'react';
import classes from 'classnames';
import Translate from '../i18n/Translate.mixin';

const DataTableHeader = React.createClass({
    propTypes: {
        isOdd: React.PropTypes.bool,
        name: React.PropTypes.string,
    },

    mixins: [Translate],

    render() {
        const classList = classes(
            'data-table__headers__header',
            {
                'data-table__headers__header--even': !this.props.isOdd,
                'data-table__headers__header--odd': this.props.isOdd,
            },
        );

        return (
            <div className={classList}>
                {this.props.name ? this.getTranslation(camelCaseToUnderscores(this.props.name)) : null}
            </div>
        );
    },
});

export default DataTableHeader;

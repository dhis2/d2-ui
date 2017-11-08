import camelCaseToUnderscores from 'd2-utilizr/lib/camelCaseToUnderscores';
import React from 'react';
import classes from 'classnames';
import Translate from '../i18n/Translate.mixin';

const DataTableHeader = React.createClass({
    propTypes: {
        isOdd: React.PropTypes.bool,
        name: React.PropTypes.string,
        headerClick: React.PropTypes.func,
    },

    mixins: [Translate],

    handleClick() {
        if (this.props.headerClick) {
            this.props.headerClick(this.props.name);
        }
    },

    render() {
        const classList = classes(
            'data-table__headers__header',
            {
                'data-table__headers__header--even': !this.props.isOdd,
                'data-table__headers__header--odd': this.props.isOdd,
                'data-table__headers__header--click': this.props.headerClick
            },
        );

        return (
            <div className={classList} onClick={this.handleClick}>
                {this.props.name ? this.getTranslation(camelCaseToUnderscores(this.props.name)) : null}
            </div>
        );
    },
});

export default DataTableHeader;

import React from 'react';
import Checkbox from 'material-ui/lib/checkbox';

import MuiThemeMixin from './mui-theme.mixin';


// TODO: Rewrite as ES6 class
/* eslint-disable react/prefer-es6-class */
export default React.createClass({
    propTypes: {
        onChange: React.PropTypes.func.isRequired,
    },

    mixins: [MuiThemeMixin],

    render() {
        return (
            <div style={{ marginTop: 12, marginBottom: 12 }}>
                <Checkbox onCheck={this.props.onChange} {...this.props} />
            </div>
        );
    },
});

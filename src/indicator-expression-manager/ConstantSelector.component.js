import React from 'react';

import ListSelectWithLocalSearch from '../list-select/ListSelectWithLocalSearch.component';

export default React.createClass({
    render() {
        return (
            <ListSelectWithLocalSearch {...this.props} />
        );
    },
});

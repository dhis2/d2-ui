import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField/TextField';

import ListSelect from '../list-select/ListSelect.component';

const styles = {
    list: {
        width: '100%',
        outline: 'none',
        border: 'none',
        padding: '0rem 1rem',
        overflowX: 'auto',
    },
    textField: {
        marginLeft: '1rem',
        marginBottom: '11px',
    },
};

class ListSelectWithLocalSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textSearch: '',
        };
    }

    filterList = (event) => {
        this.setState({
            textSearch: event.target.value,
        });
    }

    render() {
        return (
            <div>
                <TextField
                    style={styles.textField}
                    hintText={this.props.hintLabel}
                    onChange={this.filterList}
                    value={this.state.textSearch}
                />
                <ListSelect
                    {...this.props}
                    listStyle={styles.list}
                    source={this.props.source.filter(option => option.label.toLowerCase().indexOf(this.state.textSearch.toLowerCase()) !== -1)}
                    size={12}
                />
            </div>
        );
    }
}
ListSelectWithLocalSearch.propTypes = {
    source: PropTypes.array.isRequired,
    hintLabel: PropTypes.string,
};

ListSelectWithLocalSearch.defaultProps = {
    source: [],
    hintLabel: '',
};

export default ListSelectWithLocalSearch;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField/TextField';

import ListSelect from '../list-select/ListSelect.component';
import addD2Context from '../component-helpers/addD2Context';

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
    constructor(props, context) {
        super(props, context);

        this.state = {
            textSearch: '',
        };

        this.i18n = context.d2.i18n;
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
                    hintText={this.i18n.getTranslation('search_by_name')}
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
};
ListSelectWithLocalSearch.defaultProps = {
    source: [],
};

export default addD2Context(ListSelectWithLocalSearch);

import React from 'react';

import TextField from 'material-ui/lib/text-field';
import Translate from '../i18n/Translate.mixin';

import ListSelect from '../list-select/ListSelect.component';

export default React.createClass({
    propTypes: {
        source: React.PropTypes.array.isRequired,
    },

    mixins: [Translate],

    getInitialState() {
        return {
            source: this.props.source || [],
            textSearch: '',
        };
    },

    componentWillReceiveProps(newProps) {
        this.setState({
            source: newProps.source,
        });
    },

    render() {
        const listStyle = { width: '100%', outline: 'none', border: 'none', padding: '0rem 1rem' };

        return (
            <div>
                <TextField style={{ marginLeft: '1rem' }}
                           hintText={this.getTranslation('search_by_name')}
                           onChange={this._filterList}
                           value={this.state.textSearch}
                />
                <ListSelect {...this.props}
                    listStyle={listStyle}
                    source={this.state.source.filter(option => option.label.toLowerCase().indexOf(this.state.textSearch.toLowerCase()) !== -1)}
                    size="10"
                />
            </div>
        );
    },

    _filterList(event) {
        this.setState({
            textSearch: event.target.value,
        });
    },
});

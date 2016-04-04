import React from 'react';

export default React.createClass({
    propTypes: {
        source: React.PropTypes.arrayOf(React.PropTypes.shape({
            label: React.PropTypes.string,
            value: React.PropTypes.string,
        })).isRequired,
        onItemDoubleClick: React.PropTypes.func.isRequired,
        listStyle: React.PropTypes.object,
        size: React.PropTypes.number,
    },

    render() {
        return (
            <div className="list-select">
                <select size={this.props.size || 15} style={Object.assign({overflowX: 'auto'}, this.props.listStyle)}>
                    {this.props.source.map(item => {
                        return (
                            <option style={{ padding: '.25rem' }} onDoubleClick={this.listItemDoubleClicked} value={item.value}>{item.label}</option>
                        );
                    })}
                </select>
            </div>
        );
    },

    listItemDoubleClicked(event) {
        const clickedItemValue = event.target.value;

        if (this.props.onItemDoubleClick) {
            this.props.onItemDoubleClick(clickedItemValue);
        }
    },
});

import React from 'react';

const ListSelect = React.createClass({
    propTypes: {
        source: React.PropTypes.arrayOf(React.PropTypes.shape({
            label: React.PropTypes.string,
            value: React.PropTypes.string,
        })).isRequired,
        onItemDoubleClick: React.PropTypes.func.isRequired,
        listStyle: React.PropTypes.object,
    },

    render() {
        return (
            <div className="list-select">
                <select size="10" style={this.props.listStyle}>
                    {this.props.source.map(item => {
                        return (
                            <option onDoubleClick={this.listItemDoubleClicked} value={item.value}>{item.label}</option>
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

export default ListSelect;

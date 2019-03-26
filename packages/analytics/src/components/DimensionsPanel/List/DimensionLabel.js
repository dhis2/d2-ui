import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { styles } from './styles/DimensionLabel.style';

export class DimensionLabel extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        isDeactivated: PropTypes.bool.isRequired,
        isSelected: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
        children: PropTypes.arrayOf(PropTypes.element).isRequired,
    };

    onLabelClick = () => {
        if (!this.props.isDeactivated) {
            this.props.onClick(this.props.id);
        }
    };

    onKeyPress = event => {
        if (event.key === 'Enter' && event.ctrlKey === false) {
            this.onLabelClick();
        }
    };

    render() {
        return (
            <div
                data-test={`dimension-id-${this.props.id}`}
                className="label"
                onClick={this.onLabelClick}
                onKeyPress={this.onKeyPress}
                tabIndex={0}
                style={styles.label}
            >
                {this.props.children}
            </div>
        );
    }
}

export default DimensionLabel;

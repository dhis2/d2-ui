import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import Filter from '../Filter/Filter';
import DimensionList from './List/DimensionList';
import { styles } from './styles/DimensionsPanel.style';

export class DimensionsPanel extends Component {
    state = { filterText: '' };

    onClearFilter = () => {
        this.setState({ filterText: '' });
    };

    onFilterTextChange = filterText => {
        this.setState({ filterText });
    };

    render() {
        const {
            dimensions,
            selectedIds,
            disabledDimension,
            recommendedDimension,
            onDimensionClick,
            onDimensionOptionsClick,
            onDimensionDragStart,
        } = this.props;

        return (
            <div style={styles.divContainer}>
                <Filter
                    style={styles.textField}
                    placeholder={i18n.t('Search dimensions')}
                    text={this.state.filterText}
                    onChange={this.onFilterTextChange}
                    onClear={this.onClearFilter}
                />
                <DimensionList
                    dimensions={dimensions}
                    selectedIds={selectedIds}
                    filterText={this.state.filterText}
                    disabledDimension={disabledDimension}
                    recommendedDimension={recommendedDimension}
                    onDimensionOptionsClick={onDimensionOptionsClick}
                    onDimensionClick={onDimensionClick}
                    onDimensionDragStart={onDimensionDragStart}
                />
            </div>
        );
    }
}

DimensionsPanel.propTypes = {
    dimensions: PropTypes.object.isRequired,
    selectedIds: PropTypes.array,
    disabledDimension: PropTypes.func,
    recommendedDimension: PropTypes.func,
    onDimensionClick: PropTypes.func,
    onDimensionOptionsClick: PropTypes.func,
    onDimensionDragStart: PropTypes.func,
};

DimensionsPanel.defaultProps = {
    selectedIds: [],
    onDimensionClick: Function.prototype,
};

export default DimensionsPanel;

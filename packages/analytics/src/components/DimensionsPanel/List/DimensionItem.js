import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import DimensionLabel from './DimensionLabel';
import RecommendedIcon from './RecommendedIcon';
import OptionsButton from './OptionsButton';
import DynamicDimensionIcon from '../../../assets/DynamicDimensionIcon';
import { FIXED_DIMENSIONS } from '../../../modules/fixedDimensions';
import { styles } from './styles/DimensionItem.style';

export class DimensionItem extends Component {
    state = { mouseOver: false };

    onOptionsClick = id => event => this.props.onOptionsClick(event, id);

    onMouseOver = () => {
        this.setState({ mouseOver: true });
    };

    onMouseExit = () => {
        this.setState({ mouseOver: false });
    };

    getDimensionIcon = () => {
        const fixedDimension = FIXED_DIMENSIONS[this.props.id];

        if (fixedDimension) {
            const Icon = fixedDimension.icon;
            return <Icon style={styles.fixedDimensionIcon} />;
        }

        return <DynamicDimensionIcon style={styles.dynamicDimensionIcon} />;
    };

    getDimensionType = () => {
        const { id, name, isDeactivated, onDragStart } = this.props;

        return (
            <span
                data-dimensionid={id}
                style={{
                    ...styles.text,
                    ...(isDeactivated ? styles.textDeactivated : {}),
                }}
                draggable={!isDeactivated}
                onDragStart={onDragStart}
            >
                {/* is it needed here or displayName should be used instead?! */}
                {i18n.t(name)}
            </span>
        );
    };

    render() {
        const {
            id,
            isDeactivated,
            isSelected,
            isRecommended,
            onOptionsClick,
        } = this.props;
        const Icon = this.getDimensionIcon();
        const Label = this.getDimensionType();
        const listItemStyle =
            isSelected && !isDeactivated
                ? { ...styles.listItem, ...styles.selectedListItem }
                : styles.listItem;

        return (
            <li
                style={listItemStyle}
                onMouseOver={this.onMouseOver}
                onMouseLeave={this.onMouseExit}
            >
                <DimensionLabel {...this.props}>
                    <div style={styles.iconWrapper}>{Icon}</div>
                    {Label}
                    <RecommendedIcon
                        id={id}
                        isSelected={isSelected}
                        isRecommended={isRecommended}
                    />
                </DimensionLabel>
                {onOptionsClick ? (
                    <div style={styles.optionsWrapper}>
                        {this.state.mouseOver && !isDeactivated ? (
                            <OptionsButton
                                style={styles.optionsButton}
                                onClick={this.onOptionsClick(id)}
                            />
                        ) : null}
                    </div>
                ) : null}
            </li>
        );
    }
}

DimensionItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isDeactivated: PropTypes.bool,
    isSelected: PropTypes.bool.isRequired, // XXX
    isRecommended: PropTypes.bool,
    onOptionsClick: PropTypes.func,
    onClick: PropTypes.func,
    onDragStart: PropTypes.func,
};

DimensionItem.defaultProps = {
    isDeactivated: false,
    isRecommended: false,
    isSelected: false,
};

export default DimensionItem;

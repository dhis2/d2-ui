import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import Button from '@dhis2/ui/core/Button';
import throttle from 'lodash/fp/throttle';

import Item from './widgets/UnselectedItem';
import { ArrowButton as AssignButton } from './widgets/ArrowButton';
import { toggler } from './modules/toggler';
import styles from './styles/UnselectedItems.style';

// const Button = () => <div />;

export class UnselectedItems extends Component {
    constructor(props) {
        super(props);
        this.scrolElRef = React.createRef();
    }

    state = { highlighted: [], lastClickedIndex: 0 };

    onSelectClick = () => {
        this.props.onSelect(this.state.highlighted);
        this.setState({ highlighted: [] });
    };

    onSelectAllClick = () => {
        this.props.onSelect(this.props.items.map(i => i.id));
        this.setState({ highlighted: [] });
    };

    onDoubleClickItem = id => {
        const highlighted = this.state.highlighted.filter(
            dataDimId => dataDimId !== id
        );

        this.setState({ highlighted });
        this.props.onSelect([id]);
    };

    filterTextContains = displayName =>
        displayName.toLowerCase().includes(this.props.filterText.toLowerCase());

    filterItems = (item, index) =>
        this.filterTextContains(item.name)
            ? this.renderListItem(item, index)
            : null;

    toggleHighlight = (isCtrlPressed, isShiftPressed, index, id) => {
        const newState = toggler(
            id,
            isCtrlPressed,
            isShiftPressed,
            index,
            this.state.lastClickedIndex,
            this.state.highlighted,
            this.props.items.map(item => item.id)
        );

        this.setState({
            highlighted: newState.ids,
            lastClickedIndex: newState.lastClickedIndex,
        });
    };

    renderListItem = (dataDim, index) => (
        <li
            className="unselected-list-item"
            key={dataDim.id}
            onDoubleClick={() => this.onDoubleClickItem(dataDim.id)}
        >
            <Item
                id={dataDim.id}
                index={index}
                name={dataDim.name}
                highlighted={!!this.state.highlighted.includes(dataDim.id)}
                onClick={this.toggleHighlight}
            />
            <style jsx>{styles}</style>
        </li>
    );

    requestMoreItems = throttle(1000, () => {
        const node = this.scrolElRef.current;

        if (node) {
            const bottom =
                node.scrollHeight - node.scrollTop === node.clientHeight;
            if (bottom) {
                this.props.requestMoreItems();
            }
        }
    });

    render = () => {
        const listItems = this.props.items.map((item, index) =>
            this.props.filterText.length
                ? this.filterItems(item, index)
                : this.renderListItem(item, index)
        );

        return (
            <Fragment>
                <div
                    ref={this.scrolElRef}
                    onScroll={this.requestMoreItems}
                    className="unselected-list-container"
                >
                    <ul className="unselected-list">{listItems}</ul>
                </div>
                <div className="select-all-button">
                    <Button
                        kind="secondary"
                        size="small"
                        onClick={this.onSelectAllClick}
                        label={i18n.t('Select All')}
                    />
                </div>
                <div className="select-highlighted-button">
                    <AssignButton
                        onClick={this.onSelectClick}
                        iconType={'arrowForward'}
                    />
                </div>
                <style jsx>{styles}</style>
            </Fragment>
        );
    };
}

UnselectedItems.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    onSelect: PropTypes.func.isRequired,
    filterText: PropTypes.string,
    requestMoreItems: PropTypes.func,
};

UnselectedItems.defaultProps = {
    requestMoreItems: () => null,
    filterText: '',
};

export default UnselectedItems;

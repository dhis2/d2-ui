import React from 'react';
import PropTypes from 'prop-types';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import NavArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import NavClose from 'material-ui/svg-icons/navigation/close';
import NavArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import NavArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import NavChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import NavMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import NavCancel from 'material-ui/svg-icons/navigation/cancel';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import ActionRoom from 'material-ui/svg-icons/action/room';
import ActionViewList from 'material-ui/svg-icons/action/view-list';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import ContentCreate from 'material-ui/svg-icons/content/create';
import EdDragHandle from 'material-ui/svg-icons/editor/drag-handle';
import SentimentDissatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import MUISvgIcon from 'material-ui/SvgIcon';
import { getRestProps } from '../component-helpers/utils';


const icons = {
    'toggle/star': ToggleStar,
    'nav/arrow-drop-right': NavArrowDropRight,
    'nav/close': NavClose,
    'nav/arrow-upward': NavArrowUpward,
    'nav/arrow-downward': NavArrowDownward,
    'nav/chevron-left': NavChevronLeft,
    'nav/chevron-right': NavChevronRight,
    'nav/more-vert': NavMoreVert,
    'nav/cancel': NavCancel,
    'action/info-outline': ActionInfoOutline,
    'action/room': ActionRoom,
    'action/view-list': ActionViewList,
    'action/delete': ActionDelete,
    'action/visibility': ActionVisibility,
    'action/visibility-off': ActionVisibilityOff,
    'content/create': ContentCreate,
    'edit/drag-handle': EdDragHandle,
};

export default class SvgIcon extends React.Component {
    state = { Icon: null };

    componentWillMount() {
        const { icon, children } = this.props;

        if (children && !icons[icon]) {
            this.setState({ Icon: MUISvgIcon });
        } else {
            const component = icons[icon] || SentimentDissatisfied;
            this.setState({ Icon: component });
        }
    }

    render() {
        const { Icon } = this.state;
        const omitProps = [
            'icon',  // icon used internally only
        ];

        const rest = getRestProps(this.props, omitProps);
        const { children } = this.props;

        return (
            <Icon {...rest}>
                {children}
            </Icon>
        );
    }
}

SvgIcon.propTypes = {
    icon: PropTypes.string,
    children: PropTypes.node,
};

SvgIcon.defaultProps = {
    icon: '',
    children: null,
};

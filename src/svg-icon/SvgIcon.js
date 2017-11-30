import React from 'react';
import PropTypes from 'prop-types';
import Star from 'material-ui/svg-icons/toggle/star';
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
    star: Star,
    arrowDropRight: NavArrowDropRight,
    close: NavClose,
    arrowUpward: NavArrowUpward,
    arrowDownward: NavArrowDownward,
    chevronLeft: NavChevronLeft,
    chevronRight: NavChevronRight,
    moreVert: NavMoreVert,
    cancel: NavCancel,
    infoOutline: ActionInfoOutline,
    room: ActionRoom,
    viewList: ActionViewList,
    delete: ActionDelete,
    visibility: ActionVisibility,
    visibilityOff: ActionVisibilityOff,
    create: ContentCreate,
    dragHandle: EdDragHandle,
};

const SvgIcon = ({ icon, children, ...rest }) => {
    let Icon = null;
    if (children && !icons[icon]) {
        Icon = MUISvgIcon;
    } else {
        const component = icons[icon] || SentimentDissatisfied;
        Icon = component;
    }

    const propsWhiteList = ['className', 'classes', 'titleAccess'];
    const other = getRestProps(rest, propsWhiteList);

    return <Icon {...other}>{children}</Icon>;
};

SvgIcon.propTypes = {
    icon: PropTypes.string,
    children: PropTypes.node,
};

SvgIcon.defaultProps = {
    icon: '',
    children: null,
};

export default SvgIcon;

import React from 'react';
import PropTypes from 'prop-types';
import Star from 'material-ui/svg-icons/toggle/star';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Close from 'material-ui/svg-icons/navigation/close';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import Room from 'material-ui/svg-icons/action/room';
import ViewList from 'material-ui/svg-icons/action/view-list';
import Delete from 'material-ui/svg-icons/action/delete';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import Create from 'material-ui/svg-icons/content/create';
import DragHandle from 'material-ui/svg-icons/editor/drag-handle';
import SentimentDissatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import MUISvgIcon from 'material-ui/SvgIcon';

const icons = {
    Star,
    ArrowDropRight,
    Close,
    ArrowUpward,
    ArrowDownward,
    ChevronLeft,
    ChevronRight,
    MoreVert,
    Cancel,
    InfoOutline,
    Room,
    ViewList,
    Delete,
    Visibility,
    VisibilityOff,
    Create,
    DragHandle,
};

const SvgIcon = ({ icon, children, className }) => {
    let Icon = null;
    if (children && !icons[icon]) {
        Icon = MUISvgIcon;
    } else {
        Icon = icons[icon] || SentimentDissatisfied;
    }

    return <Icon className={className}>{children}</Icon>;
};

SvgIcon.propTypes = {
    /**
     * Name of the material icon to render
     */
    icon: PropTypes.string,

    /**
     * A node representing a custom svg
     */
    children: PropTypes.node,

    /**
     * The class name to apply to the component
     */
    className: PropTypes.string,
};

SvgIcon.defaultProps = {
    icon: '',
    children: null,
    className: '',
};

export default SvgIcon;

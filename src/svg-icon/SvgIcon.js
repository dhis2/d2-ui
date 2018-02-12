import React from 'react';
import PropTypes from 'prop-types';
import Add from 'material-ui/svg-icons/content/add';
import Apps from 'material-ui/svg-icons/navigation/apps';
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import Business from 'material-ui/svg-icons/communication/business';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import Clear from 'material-ui/svg-icons/content/clear';
import Close from 'material-ui/svg-icons/navigation/close';
import Create from 'material-ui/svg-icons/content/create';
import CropFree from 'material-ui/svg-icons/image/crop-free';
import Delete from 'material-ui/svg-icons/action/delete';
import Description from 'material-ui/svg-icons/action/description';
import Done from 'material-ui/svg-icons/action/done';
import DragHandle from 'material-ui/svg-icons/editor/drag-handle';
import Email from 'material-ui/svg-icons/communication/email';
import Extension from 'material-ui/svg-icons/action/extension';
import FontDownload from 'material-ui/svg-icons/content/font-download';
import Group from 'material-ui/svg-icons/social/group';
import GridOn from 'material-ui/svg-icons/image/grid-on';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import InsertChart from 'material-ui/svg-icons/editor/insert-chart';
import List from 'material-ui/svg-icons/action/list';
import Launch from 'material-ui/svg-icons/action/launch';
import Message from 'material-ui/svg-icons/communication/message';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert';
import NotInterested from 'material-ui/svg-icons/av/not-interested';
import Person from 'material-ui/svg-icons/social/person';
import Public from 'material-ui/svg-icons/social/public';
import Reply from 'material-ui/svg-icons/content/reply';
import Room from 'material-ui/svg-icons/action/room';
import Search from 'material-ui/svg-icons/action/search';
import ShowChart from 'material-ui/svg-icons/editor/show-chart';
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ViewList from 'material-ui/svg-icons/action/view-list';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import SentimentDissatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import MUISvgIcon from 'material-ui/SvgIcon';
import { grey600, grey200 } from 'material-ui/styles/colors';

const icons = {
    Add,
    Apps,
    ArrowDownward,
    ArrowDropRight,
    ArrowUpward,
    Business,
    Cancel,
    ChevronLeft,
    ChevronRight,
    Clear,
    Close,
    Create,
    CropFree,
    Delete,
    Description,
    Done,
    DragHandle,
    Email,
    Extension,
    FontDownload,
    GridOn,
    Group,
    InfoOutline,
    InsertChart,
    List,
    Launch,
    Message,
    MoreVert,
    NotInterested,
    Person,
    Public,
    Reply,
    Room,
    Search,
    ShowChart,
    Star,
    StarBorder,
    ThumbUp,
    ViewList,
    Visibility,
    VisibilityOff,
};

const SvgIcon = ({ icon, children, className, disabled, style }) => {
    let Icon = null;
    if (children && !icons[icon]) {
        Icon = MUISvgIcon;
    } else {
        Icon = icons[icon] || SentimentDissatisfied;
    }

    return (
        <Icon
            className={className}
            style={{
                ...style,
                fill: style.fill || (disabled ? grey200 : grey600),
            }}
        >
            {children}
        </Icon>
    );
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

    /**
     * Whether icon should have a disabled look
     */
    disabled: PropTypes.bool,

    /**
     * Pass inline styles to the root element
     */
    style: PropTypes.object,
};

SvgIcon.defaultProps = {
    icon: '',
    children: null,
    className: '',
    disabled: false,
    style: {},
};

export default SvgIcon;

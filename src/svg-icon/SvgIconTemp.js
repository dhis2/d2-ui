import React from 'react';
import PropTypes from 'prop-types';
import { grey600, grey200 } from 'material-ui/styles/colors';
import SvgIcon from 'material-ui-next/SvgIcon';
import { Add, Alarm, ArrowDownward, ArrowUpward, Business, Cancel, ChevronLeft, ChevronRight, Close, Create, CropFree,
    Delete, Description, Done, DragHandle, Email, Extension, Face, Fingerprint, FontDownload, GridOn, Group, InfoOutline, InsertChart,
    Launch, Message, MoreVert, NotInterested, Person, Public, Reply, Room, Search, ShowChart, Star, StarBorder,
    SentimentDissatisfied, ThumbUp, ViewList, Visibility, VisibilityOff, List } from 'material-ui-icons';

const iconAlternatives = {
    Add,
    Alarm,
    ArrowDownward,
    ArrowUpward,
    Business,
    Cancel,
    ChevronLeft,
    ChevronRight,
    Close,
    Create,
    CropFree,
    Delete,
    Description,
    Done,
    DragHandle,
    Email,
    Extension,
    Face,
    Fingerprint,
    FontDownload,
    GridOn,
    Group,
    InfoOutline,
    InsertChart,
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
    List,
};

const SvgIconTemp = (props) => {
    const { disabled, icon, ...passThroughProps } = props;
    let Icon = null;

    if (props.children && !iconAlternatives[icon]) {
        Icon = SvgIcon;
    } else {
        Icon = iconAlternatives[icon] || SentimentDissatisfied;
    }


    return (
        <Icon
            className={props.className}
            style={{
                ...props.style,
                fill: props.style || (disabled ? grey200 : grey600) }}
        >
            {props.children}
        </Icon>
    );
};

export default SvgIconTemp;

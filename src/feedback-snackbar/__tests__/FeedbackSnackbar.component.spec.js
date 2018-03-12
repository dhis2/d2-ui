import React from 'react';
import { shallow } from 'enzyme';
import { Snackbar } from 'material-ui';

import FeedbackSnackbar from '../FeedbackSnackbar.component';
import { ACTION_MESSAGE, ERROR, LOADING, SUCCESS, WARNING } from '../FeedbackSnackbarTypes';

import FeedbackSnackbarBody from '../feedback-snackbar-body/FeedbackSnackbarBody.component';

const loadingProps = {
    show: true,
    conf: {
        type: LOADING,
        message: 'Loading...',
    },
};

const successProps = {
    show: true,
    conf: {
        type: SUCCESS,
        message: 'Success...',
    },
};

const warningProps = {
    show: true,
    conf: {
        type: WARNING,
        message: 'Warning...',
    },
};

const errorProps = {
    show: true,
    conf: {
        type: ERROR,
        message: 'Error...',
    },
};

const actionProps = {
    show: true,
    conf: {
        type: ACTION_MESSAGE,
        message: 'Action...',
    },
};

const ownShallow = (props) => {
    return shallow(
        <FeedbackSnackbar show={props.show} conf={props.conf} />,
    );
};

it('FeedbackSnackbar renders LOADING correctly.', () => {
    const wrapper = ownShallow(loadingProps);
    expect(wrapper.find(Snackbar)).toHaveLength(1);
    expect(wrapper.find(Snackbar).prop('message'))
        .toMatchObject(<FeedbackSnackbarBody message={loadingProps.conf.message} type={loadingProps.conf.type} />);
    expect(wrapper.state().show).toBeTruthy();
});

it('FeedbackSnackbar renders SUCCESS correctly.', () => {
    const wrapper = ownShallow(successProps);
    expect(wrapper.find(Snackbar)).toHaveLength(1);
    expect(wrapper.find(Snackbar).prop('message'))
        .toMatchObject(<FeedbackSnackbarBody message={successProps.conf.message} type={successProps.conf.type} />);
    expect(wrapper.state().show).toBeTruthy();
});

it('FeedbackSnackbar renders ERROR correctly.', () => {
    const wrapper = ownShallow(errorProps);
    expect(wrapper.find(Snackbar)).toHaveLength(1);
    expect(wrapper.find(Snackbar).prop('message'))
        .toMatchObject(<FeedbackSnackbarBody message={errorProps.conf.message} type={errorProps.conf.type} />);
    expect(wrapper.state().show).toBeTruthy();
});

it('FeedbackSnackbar renders WARNING correctly.', () => {
    const wrapper = ownShallow(warningProps);
    expect(wrapper.find(Snackbar)).toHaveLength(1);
    expect(wrapper.find(Snackbar).prop('message'))
        .toMatchObject(<FeedbackSnackbarBody message={warningProps.conf.message} type={warningProps.conf.type} />);
    expect(wrapper.state().show).toBeTruthy();
});

it('FeedbackSnackbar renders ACTION correctly.', () => {
    const wrapper = ownShallow(actionProps);
    expect(wrapper.find(Snackbar)).toHaveLength(1);
    expect(wrapper.find(Snackbar).prop('message')).toBe(actionProps.conf.message);
    expect(wrapper.state().show).toBeTruthy();
});

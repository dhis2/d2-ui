import React from 'react';
import { shallow } from 'enzyme';
import FeedbackSnackbarBody from '../FeedbackSnackbarBody';
import { ERROR, LOADING, SUCCESS, WARNING } from '../feedbackSnackbarTypes';
import { CircularProgress, FontIcon } from 'material-ui';

const loadingProps = {
    type: LOADING,
    message: 'Loading...',
};

const successProps = {
    type: SUCCESS,
    message: 'Success...',
};

const warningProps = {
    type: WARNING,
    message: 'Warning...',
};

const errorProps = {
    type: ERROR,
    message: 'Error...',
};

const ownShallow = (props) => {
    return shallow(
        <FeedbackSnackbarBody type={props.type} message={props.message}/>,
    );
};

it('FeedbackSnackbarBody renders LOADING correctly.', () => {
    ownShallow(loadingProps);
});

it('FeedbackSnackbarBody renders LOADING message correctly.', () => {
    const wrapper = ownShallow(loadingProps);
    expect(wrapper.find('div').at(0).childAt(0).text()).toBe(loadingProps.message);
});

it('FeedbackSnackbarBody renders LOADING icon correctly.', () => {
    const wrapper = ownShallow(loadingProps);
    expect(wrapper.find('div').at(0).find(CircularProgress)).toHaveLength(1);
    expect(wrapper.find('div').at(0).find(CircularProgress).prop('color')).toBe('#ffffff');
});

it('FeedbackSnackbarBody renders SUCCESS correctly.', () => {
    ownShallow(successProps);
});

it('FeedbackSnackbarBody renders SUCCESS message correctly.', () => {
    const wrapper = ownShallow(successProps);
    expect(wrapper.find('div').at(0).childAt(0).text()).toBe(successProps.message);
});

it('FeedbackSnackbarBody renders SUCCESS icon correctly.', () => {
    const wrapper = ownShallow(successProps);
    const fontChildren = wrapper.find(FontIcon).prop('children');
    expect(wrapper.find(FontIcon)).toHaveLength(1);
    expect(shallow(<div>{fontChildren}</div>).text()).toBe('done');
});

it('FeedbackSnackbarBody renders ERROR correctly.', () => {
    ownShallow(errorProps);
});

it('FeedbackSnackbarBody renders ERROR message correctly.', () => {
    const wrapper = ownShallow(errorProps);
    expect(wrapper.find('div').at(0).childAt(0).text()).toBe(errorProps.message);
});

it('FeedbackSnackbarBody renders ERROR icon correctly.', () => {
    const wrapper = ownShallow(errorProps);
    const fontChildren = wrapper.find(FontIcon).prop('children');
    expect(wrapper.find(FontIcon)).toHaveLength(1);
    expect(shallow(<div>{fontChildren}</div>).text()).toBe('error');
});

it('FeedbackSnackbarBody renders WARNING correctly.', () => {
    ownShallow(warningProps);
});

it('FeedbackSnackbarBody renders WARNING message correctly.', () => {
    const wrapper = ownShallow(warningProps);
    expect(wrapper.find('div').at(0).childAt(0).text()).toBe(warningProps.message);
});

it('FeedbackSnackbarBody renders WARNING icon correctly.', () => {
    const wrapper = ownShallow(warningProps);
    const fontChildren = wrapper.find(FontIcon).prop('children');
    expect(wrapper.find(FontIcon)).toHaveLength(1);
    expect(shallow(<div>{fontChildren}</div>).text()).toBe('warning');
});


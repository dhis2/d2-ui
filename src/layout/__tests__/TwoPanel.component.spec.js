import React from 'react';
import { shallow } from 'enzyme';
import log from 'loglevel';
import TwoPanel from '../TwoPanel.component';

describe('<TwoPanel />', () => {
    let component;

    beforeEach(() => {
        component = shallow(<TwoPanel />);
    });

    it('should render a <main /> component', () => {
        expect(component.type()).toBe('main');
    });

    it('should pass the passed props to the <main /> component', () => {
        component = shallow(<TwoPanel name="John" />);

        expect(component.props().name).toBe('John');
    });

    it('should pass a style prop to the <main /> component', () => {
        const expectedStyle = {
            flex: 1,
            display: 'flex',
            flexOrientation: 'row',
            marginTop: '8rem',
        };

        expect(component.props().style).toEqual(expectedStyle);
    });

    describe('children rendering', () => {
        let childComponents;

        beforeEach(() => {
            childComponents = [
                <div name="leftBar" />,
                <div name="content" />,
            ];

            component = shallow(<TwoPanel>{childComponents}</TwoPanel>);
        });

        it('should render the correct number of children', () => {
            expect(component.props().children).toHaveLength(2);
        });

        it('should wrap the children components in a <div />', () => {
            expect(component.props().children[0].props.children).toBe(childComponents[0]);
            expect(component.props().children[1].props.children).toBe(childComponents[1]);
        });

        it('should pass additional style to the wrapped children', () => {
            expect(component.props().children[0].props.style).toEqual({
                flex: '0 0 320px',
                paddingRight: undefined,
            });

            expect(component.props().children[1].props.style).toEqual({
                flex: 1,
                paddingRight: '2rem',
            });
        });

        it('should pass merge childWrapStyle with the flex styles', () => {
            const childWrapStyle = {
                color: 'red',
            };
            component = shallow(<TwoPanel childWrapStyle={childWrapStyle}>{childComponents}</TwoPanel>);

            expect(component.props().children[0].props.style).toEqual({
                color: 'red',
                flex: '0 0 320px',
                paddingRight: undefined,
            });

            expect(component.props().children[1].props.style).toEqual({
                color: 'red',
                flex: 1,
                paddingRight: '2rem',
            });
        });

        it('should only render two children even when more are passed', () => {
            component = shallow(
                <TwoPanel>
                    <div />
                    <div />
                    <div />
                </TwoPanel>,
            );

            expect(component.props().children).toHaveLength(2);
        });
    });

    describe('a warning', () => {
        beforeEach(() => {
            jest.spyOn(log, 'warn');
        });

        afterEach(() => {
            log.warn.mockRestore();
        });

        it('should be logged when less than two children have been passed', () => {
            component = shallow(
                <TwoPanel>
                    <div />
                </TwoPanel>,
            );

            expect(log.warn).toHaveBeenCalledWith('You passed just one child to the <TwoPanel /> component, it requires exactly two');
        });

        it('should be logged when more than two children have been passed', () => {
            component = shallow(
                <TwoPanel>
                    <div />
                    <div />
                    <div />
                </TwoPanel>,
            );

            expect(log.warn).toHaveBeenCalledWith('You passed more than two children to the <TwoPanel /> component, it requires exactly two');
        });

        it('should not be logged when exactly two children are passed', () => {
            component = shallow(
                <TwoPanel>
                    <div />
                    <div />
                </TwoPanel>,
            );

            expect(log.warn).not.toHaveBeenCalled();
        });
    });
});

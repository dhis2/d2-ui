import React from 'react';
import { shallow } from 'enzyme';
import Color from '../data-value/Color.component';
import { findValueRenderer, addValueRenderer } from '../data-value/valueRenderers';

describe('dataTableValueRenderers', () => {
    describe('DATE valueType', () => {
        const renderOptions = {
            context: {
                d2: {
                    currentUser: {
                        userSettings: {
                            get: jest.fn().mockReturnValue(Promise.resolve({})),
                        },
                    },
                },
            },
        };

        it('should find the correct renderer', () => {
            const DateValueRenderer = findValueRenderer({ value: '2016-02-18T11:21:32.992', columnName: 'lastUpdated', valueType: 'DATE' });
            const renderedComponent = shallow(<DateValueRenderer value="2016-02-18T11:21:32.992" />, renderOptions);

            expect(renderedComponent.find('TextValue')).toHaveLength(1);
        });

        it('should render the the date using Intl', () => {
            const DateValueRenderer = findValueRenderer({ value: '2016-02-18T11:21:32.992', columnName: 'lastUpdated', valueType: 'DATE' });
            const renderedComponent = shallow(<DateValueRenderer value="2016-02-18T11:21:32.992" />, renderOptions);

            expect(renderedComponent.find('TextValue').prop('value')).toBe('February 18, 2016');
        });

        it('should render the the date using string replacement when Intl is not defined', () => {
            const intl = global.Intl;
            global.Intl = undefined;

            const DateValueRenderer = findValueRenderer({ value: '2016-02-18T11:21:32.992', columnName: 'lastUpdated', valueType: 'DATE' });
            const renderedComponent = shallow(<DateValueRenderer value="2016-02-18T11:21:32.992" />, renderOptions);

            expect(renderedComponent.find('TextValue').prop('value')).toBe('2016-02-18 11:21:32');
            global.Intl = intl;
        });

        it('should render nothing when there is no date', () => {
            const DateValueRenderer = findValueRenderer({ value: undefined, columnName: 'lastUpdated', valueType: 'DATE' });
            const renderedComponent = shallow(<DateValueRenderer />, renderOptions);

            expect(renderedComponent.find('TextValue').prop('value')).toBe('');
        });
    });

    describe('objects with displayName', () => {
        it('should find the correct renderer', () => {
            const ObjectWithDisplayNameRenderer = findValueRenderer({ value: { displayName: 'ANC' }, columnName: 'indicator' });
            const renderedComponent = shallow(<ObjectWithDisplayNameRenderer value={{ displayName: 'ANC' }} />);

            expect(renderedComponent.find('TextValue')).toHaveLength(1);
        });

        it('should render the text from displayName as the text value', () => {
            const ObjectWithDisplayNameRenderer = findValueRenderer({ value: { displayName: 'ANC' }, columnName: 'indicator' });
            const renderedComponent = shallow(<ObjectWithDisplayNameRenderer value={{ displayName: 'ANC' }} />);

            expect(renderedComponent.find('TextValue').prop('value')).toBe('ANC');
        });

        it('should fall back to the name property when the displayName does not exist', () => {
            const ObjectWithDisplayNameRenderer = findValueRenderer({ value: { name: 'ANC' }, columnName: 'indicator' });
            const renderedComponent = shallow(<ObjectWithDisplayNameRenderer value={{ name: 'ANC' }} />);

            expect(renderedComponent.find('TextValue').prop('value')).toBe('ANC');
        });

        it('should not throw when the value is undefined and render an empty span', () => {
            const ObjectWithDisplayNameRenderer = findValueRenderer({ value: undefined, columnName: 'indicator' });
            const renderedComponent = shallow(<ObjectWithDisplayNameRenderer value={undefined} />);

            expect(renderedComponent.is('span')).toBe(true);
            expect(renderedComponent.text()).toBe('');
        });
    });

    describe('color values', () => {
        it('should find the correct renderer', () => {
            const ColorRenderer = findValueRenderer({ value: '#FFFDDD', columnName: 'color' });

            expect(ColorRenderer).toBe(Color);
        });

        it('should render the value as the text of the Color component', () => {
            const ColorRenderer = findValueRenderer({ value: '#FFFDDD', columnName: 'color' });
            const renderedComponent = shallow(<ColorRenderer value="#FFFDDD" />);

            expect(renderedComponent.text()).toBe('#FFFDDD');
        });

        it('should render a dark text color for a light color', () => {
            const ColorRenderer = findValueRenderer({ value: '#FFFDDD', columnName: 'color' });
            const renderedComponent = shallow(<ColorRenderer value="#FFFDDD" />);

            expect(renderedComponent.prop('style').color).toBe('#000');
        });

        it('should render a light text color for a light color', () => {
            const ColorRenderer = findValueRenderer({ value: '#222222', columnName: 'color' });
            const renderedComponent = shallow(<ColorRenderer value="#222222" />);

            expect(renderedComponent.prop('style').color).toBe('#FFF');
        });
    });

    describe('addValueRenderer to add custom renderers', () => {
        const MyComponent = () => (<div />);
        let checker;
        let removeRenderer;

        beforeEach(() => {
            checker = jest.fn().mockReturnValue(true);
            removeRenderer = addValueRenderer(checker, MyComponent);
        });

        afterEach(() => {
            removeRenderer();
        });

        it('should register a new renderer', () => {
            const Renderer = findValueRenderer({});

            expect(Renderer).toBe(MyComponent);
        });

        it('should call the checker to find the renderer', () => {
            findValueRenderer({});

            expect(checker).toHaveBeenCalled();
        });

        it('should unregister the renderer when remove is called', () => {
            removeRenderer();

            const Renderer = findValueRenderer({});

            expect(Renderer).not.toBe(MyComponent);
        });
    });
});

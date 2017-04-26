import React from 'react';
import { shallow } from 'enzyme';
import DataTableRow from '../../src/data-table/DataTableRow.component';
import Color from '../../src/data-table/data-value/Color.component';
import Translate from '../../src/i18n/Translate.component';
import { findValueRenderer, addValueRenderer } from '../../src/data-table/data-value/valueRenderers';

describe('dataTableValueRenderers', () => {
    describe('publicAccess', () => {
        it('should find the correct renderer', () => {
            const PublicAccessRenderer = findValueRenderer({ value: 'r-------', columnName: 'publicAccess' });
            const renderedComponent = shallow(<PublicAccessRenderer value="r-------" />);

            expect(renderedComponent.find(Translate)).to.have.length(1);
        });

        it('should render the r------- publicAccess pattern to its correct text value', () => {
            const PublicAccessRenderer = findValueRenderer({ value: 'r-------', columnName: 'publicAccess' });
            const renderedComponent = shallow(<PublicAccessRenderer value="r-------" />);

            expect(renderedComponent.find(Translate).prop('children')).to.equal('public_can_view');
        });

        it('should render the rw------ publicAccess pattern to its correct text value', () => {
            const PublicAccessRenderer = findValueRenderer({ value: 'rw------', columnName: 'publicAccess' });
            const renderedComponent = shallow(<PublicAccessRenderer value="rw------" />);

            expect(renderedComponent.find(Translate).prop('children')).to.equal('public_can_edit');
        });

        it('should render the -------- publicAccess pattern to its correct text value', () => {
            const PublicAccessRenderer = findValueRenderer({ value: '--------', columnName: 'publicAccess' });
            const renderedComponent = shallow(<PublicAccessRenderer value="--------" />);

            expect(renderedComponent.find(Translate).prop('children')).to.equal('public_none');
        });

        it('should not transform an unknown publicAccess pattern', () => {
            const PublicAccessRenderer = findValueRenderer({ value: 'rwx-----', columnName: 'publicAccess' });
            const renderedComponent = shallow(<PublicAccessRenderer value="rwx-----" />);

            expect(renderedComponent.find('TextValue').prop('value')).to.equal('rwx-----');
        });

        it('should not transform an empty value', () => {
            const PublicAccessRenderer = findValueRenderer({ value: '', columnName: 'publicAccess' });
            const renderedComponent = shallow(<PublicAccessRenderer value="" />);

            expect(renderedComponent.find('TextValue').prop('value')).to.equal('');
        });
    });

    describe('DATE valueType', () => {
        const renderOptions = {
            context: {
                d2: {
                    currentUser: {
                        uiLocale: 'en',
                    },
                },
            },
        };

        it('should find the correct renderer', () => {
            const DateValueRenderer = findValueRenderer({ value: '2016-02-18T11:21:32.992', columnName: 'lastUpdated', valueType: 'DATE' });
            const renderedComponent = shallow(<DateValueRenderer value="2016-02-18T11:21:32.992" />, renderOptions);

            expect(renderedComponent.find('TextValue')).to.have.length(1);
        });

        it('should render the the date using Intl', () => {
            const DateValueRenderer = findValueRenderer({ value: '2016-02-18T11:21:32.992', columnName: 'lastUpdated', valueType: 'DATE' });
            const renderedComponent = shallow(<DateValueRenderer value="2016-02-18T11:21:32.992" />, renderOptions);

            expect(renderedComponent.find('TextValue').prop('value')).to.equal('February 18, 2016');
        });

        it('should render the the date using string replacement when Intl is not defined', () => {
            const intl = global.Intl;
            global.Intl = undefined;

            const DateValueRenderer = findValueRenderer({ value: '2016-02-18T11:21:32.992', columnName: 'lastUpdated', valueType: 'DATE' });
            const renderedComponent = shallow(<DateValueRenderer value="2016-02-18T11:21:32.992" />, renderOptions);

            expect(renderedComponent.find('TextValue').prop('value')).to.equal('2016-02-18 11:21:32');
            global.Intl = intl;
        });

        it('should render nothing when there is no date', () => {
            const DateValueRenderer = findValueRenderer({ value: undefined, columnName: 'lastUpdated', valueType: 'DATE' });
            const renderedComponent = shallow(<DateValueRenderer />, renderOptions);

            expect(renderedComponent.find('TextValue').prop('value')).to.equal('');
        });
    });

    describe('objects with displayName', () => {
        it('should find the correct renderer', () => {
            const ObjectWithDisplayNameRenderer = findValueRenderer({ value: { displayName: 'ANC' }, columnName: 'indicator' });
            const renderedComponent = shallow(<ObjectWithDisplayNameRenderer value={{ displayName: 'ANC' }} />);

            expect(renderedComponent.find('TextValue')).to.have.length(1);
        });

        it('should render the text from displayName as the text value', () => {
            const ObjectWithDisplayNameRenderer = findValueRenderer({ value: { displayName: 'ANC' }, columnName: 'indicator' });
            const renderedComponent = shallow(<ObjectWithDisplayNameRenderer value={{ displayName: 'ANC' }} />);

            expect(renderedComponent.find('TextValue').prop('value')).to.equal('ANC');
        });

        it('should fall back to the name property when the displayName does not exist', () => {
            const ObjectWithDisplayNameRenderer = findValueRenderer({ value: { name: 'ANC' }, columnName: 'indicator' });
            const renderedComponent = shallow(<ObjectWithDisplayNameRenderer value={{ name: 'ANC' }} />);

            expect(renderedComponent.find('TextValue').prop('value')).to.equal('ANC');
        });

        it('should not throw when the value is undefined and render an empty span', () => {
            const ObjectWithDisplayNameRenderer = findValueRenderer({ value: undefined, columnName: 'indicator' });
            const renderedComponent = shallow(<ObjectWithDisplayNameRenderer value={undefined} />);

            expect(renderedComponent.is('span')).to.be.true;
            expect(renderedComponent.text()).to.equal('');
        });
    });

    describe('color values', () => {
        it('should find the correct renderer', () => {
            const ColorRenderer = findValueRenderer({ value: '#FFFDDD', columnName: 'color' });

            expect(ColorRenderer).to.equal(Color)
        });

        it('should render the value as the text of the Color component', () => {
            const ColorRenderer = findValueRenderer({ value: '#FFFDDD', columnName: 'color' });
            const renderedComponent = shallow(<ColorRenderer value="#FFFDDD" />);

            expect(renderedComponent.text()).to.equal('#FFFDDD');
        });

        it('should render a dark text color for a light color', () => {
            const ColorRenderer = findValueRenderer({ value: '#FFFDDD', columnName: 'color' });
            const renderedComponent = shallow(<ColorRenderer value="#FFFDDD" />);

            expect(renderedComponent.prop('style').color).to.equal('#000');
        });

        it('should render a light text color for a light color', () => {
            const ColorRenderer = findValueRenderer({ value: '#222222', columnName: 'color' });
            const renderedComponent = shallow(<ColorRenderer value="#222222" />);

            expect(renderedComponent.prop('style').color).to.equal('#FFF');
        });
    });

    describe('addValueRenderer to add custom renderers', () => {
        const MyComponent = () => (<div />);
        let checker;
        let removeRenderer;

        beforeEach(() => {
            checker = sinon.stub().returns(true);
            removeRenderer = addValueRenderer(checker, MyComponent);
        });

        afterEach(() => {
            removeRenderer();
        });

        it('should register a new renderer', () => {
            const Renderer = findValueRenderer({});

            expect(Renderer).to.equal(MyComponent);
        });

        it('should call the checker to find the renderer', () => {
            const Renderer = findValueRenderer({});

            expect(checker).to.have.been.called;
        });

        it('should unregister the renderer when remove is called', () => {
            removeRenderer();

            const Renderer = findValueRenderer({});

            expect(Renderer).not.to.equal(MyComponent);
        });
    });
});

import React from 'react/addons';
import ListSelectAsync from '../../src/list-select/ListSelectAsync.component';
import ListSelect from '../../src/list-select/ListSelect.component';
import {ReplaySubject} from 'rx/dist/rx.all';

const TestUtils = React.addons.TestUtils;
const {
    findRenderedComponentWithType,
} = TestUtils;

describe('ListSelectAsync component', () => {
    let listSelectAsyncComponent;
    let onItemDoubleClickSpy;

    beforeEach(() => {
        onItemDoubleClickSpy = spy();

        listSelectAsyncComponent = TestUtils.renderIntoDocument(
            <ListSelectAsync onItemDoubleClick={onItemDoubleClickSpy} />
        );
    });

    it('should render a ListSelect', () => {
        expect(() => findRenderedComponentWithType(listSelectAsyncComponent, ListSelect)).not.to.throw();
    });

    it('should pass through the onItemDoubleClick handler to the ListSelect', () => {
        const listSelectComponent = findRenderedComponentWithType(listSelectAsyncComponent, ListSelect);

        expect(listSelectComponent.props.onItemDoubleClick).to.equal(onItemDoubleClickSpy);
    });

    describe('async source', () => {
        let fakeAsyncSource;

        beforeEach(() => {
            fakeAsyncSource = new ReplaySubject(1);
            fakeAsyncSource.onNext([
                {value: 'PvuaP6YALSA', label: 'Community'},
                {value: 'cNzfcPWEGSH', label: 'Country'},
                {value: 'POHZmzofoVx', label: 'Facility'},
                {value: 'NUPoPEBGCq9', label: 'OUs and Countries'},
            ]);

            listSelectAsyncComponent = TestUtils.renderIntoDocument(
                <ListSelectAsync onItemDoubleClick={onItemDoubleClickSpy} source={fakeAsyncSource} />
            );
        });

        it('should render an option for each of the items', () => {
            const optionElements = React.findDOMNode(listSelectAsyncComponent).querySelectorAll('select option');

            expect(optionElements.length).to.equal(4);
        });

        it('should render the name for the options', () => {
            const optionElements = React.findDOMNode(listSelectAsyncComponent).querySelectorAll('select option');

            expect(optionElements[0].textContent).to.equal('Community');
            expect(optionElements[1].textContent).to.equal('Country');
            expect(optionElements[2].textContent).to.equal('Facility');
            expect(optionElements[3].textContent).to.equal('OUs and Countries');
        });

        it('should render the values for the options', () => {
            const optionElements = React.findDOMNode(listSelectAsyncComponent).querySelectorAll('select option');

            expect(optionElements[0].value).to.equal('PvuaP6YALSA');
            expect(optionElements[1].value).to.equal('cNzfcPWEGSH');
            expect(optionElements[2].value).to.equal('POHZmzofoVx');
            expect(optionElements[3].value).to.equal('NUPoPEBGCq9');
        });

        it('should only keep the new options if the source changed', () => {
            fakeAsyncSource.onNext([
                {value: 'dNzfcPWEGSH', label: 'Universe'},
                {value: 'MUPoPEBGCq9', label: 'Planet'},
            ]);

            const optionElements = React.findDOMNode(listSelectAsyncComponent).querySelectorAll('select option');

            expect(optionElements.length).to.equal(2);
            expect(optionElements[0].textContent).to.equal('Universe');
            expect(optionElements[1].textContent).to.equal('Planet');
            expect(optionElements[0].value).to.equal('dNzfcPWEGSH');
            expect(optionElements[1].value).to.equal('MUPoPEBGCq9');
        });
    });
});

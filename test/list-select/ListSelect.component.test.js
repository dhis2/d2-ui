import React from 'react/addons';
import {element} from 'd2-testutils';
import ListSelect from '../../src/list-select/ListSelect.component';

const TestUtils = React.addons.TestUtils;
const Simulate = TestUtils.Simulate;

describe('ListSelect component', () => {
    let listSelectComponent;
    let listSource;
    let onItemDoubleClickSpy;

    beforeEach(() => {
        onItemDoubleClickSpy = spy();

        listSource = [
            {value: 'PvuaP6YALSA', label: 'Community'},
            {value: 'cNzfcPWEGSH', label: 'Country'},
            {value: 'POHZmzofoVx', label: 'Facility'},
            {value: 'NUPoPEBGCq9', label: 'OUs and Countries'},
        ];

        listSelectComponent = TestUtils.renderIntoDocument(
            <ListSelect source={listSource} onItemDoubleClick={onItemDoubleClickSpy} />
        );
    });

    it('should have the component name as a class', () => {
        expect(element(listSelectComponent.getDOMNode()).hasClass('list-select')).to.be.true;
    });

    it('should a selectbox for each of the options', () => {
        const selectElement = React.findDOMNode(listSelectComponent).querySelector('select');

        expect(selectElement).not.to.equal(null);
    });

    it('should render an option for each of the items', () => {
        const optionElements = React.findDOMNode(listSelectComponent).querySelectorAll('select option');

        expect(optionElements.length).to.equal(4);
    });

    it('should render the name for the options', () => {
        const optionElements = React.findDOMNode(listSelectComponent).querySelectorAll('select option');

        expect(optionElements[0].textContent).to.equal('Community');
        expect(optionElements[1].textContent).to.equal('Country');
        expect(optionElements[2].textContent).to.equal('Facility');
        expect(optionElements[3].textContent).to.equal('OUs and Countries');
    });

    it('should render the values for the options', () => {
        const optionElements = React.findDOMNode(listSelectComponent).querySelectorAll('select option');

        expect(optionElements[0].value).to.equal('PvuaP6YALSA');
        expect(optionElements[1].value).to.equal('cNzfcPWEGSH');
        expect(optionElements[2].value).to.equal('POHZmzofoVx');
        expect(optionElements[3].value).to.equal('NUPoPEBGCq9');
    });

    it('should call the onItemDoubleClick callback when item is double clicked', () => {
        const optionElements = React.findDOMNode(listSelectComponent).querySelectorAll('select option');

        Simulate.doubleClick(optionElements[0]);

        expect(onItemDoubleClickSpy).to.be.calledWith('PvuaP6YALSA');
    });
});

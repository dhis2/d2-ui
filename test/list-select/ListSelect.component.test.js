import React from 'react';
import ListSelect from '../../src/list-select/ListSelect.component';

import {shallow} from 'enzyme';

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

        listSelectComponent = shallow(<ListSelect source={listSource} onItemDoubleClick={onItemDoubleClickSpy} />);
    });

    it('should have the component name as a class', () => {
        expect(listSelectComponent.hasClass('list-select')).to.be.true;
    });

    it('should a <select /> tag to contain the options', () => {
        const selectElement = listSelectComponent.find('select');

        expect(selectElement).not.to.equal(null);
    });

    it('should set the size of the select box to the passed size', () => {
        listSelectComponent.setProps({size: 10});

        const selectElement = listSelectComponent.find('select');

        expect(selectElement.props().size).to.equal(10);
    });

    it('should use the default value for the size if no value has been provided', () => {
        const selectElement = listSelectComponent.find('select');

        expect(selectElement.props().size).to.equal(15);
    });

    it('should render an <option /> tag for each of the items', () => {
        const optionElements = listSelectComponent
            .find('select')
            .find('option');

        expect(optionElements).to.have.length(4);
    });

    it('should render the name for the options', () => {
        const optionElements = listSelectComponent
            .find('select')
            .find('option');

        expect(optionElements.at(0).text()).to.equal('Community');
        expect(optionElements.at(1).text()).to.equal('Country');
        expect(optionElements.at(2).text()).to.equal('Facility');
        expect(optionElements.at(3).text()).to.equal('OUs and Countries');
    });

    it('should render the values for the options', () => {
        const optionElements = listSelectComponent
            .find('select')
            .find('option');

        expect(optionElements.at(0).props().value).to.equal('PvuaP6YALSA');
        expect(optionElements.at(1).props().value).to.equal('cNzfcPWEGSH');
        expect(optionElements.at(2).props().value).to.equal('POHZmzofoVx');
        expect(optionElements.at(3).props().value).to.equal('NUPoPEBGCq9');
    });

    it('should call the onItemDoubleClick callback when item is double clicked', () => {
        const optionElements = listSelectComponent
            .find('select')
            .find('option');

        optionElements.first().simulate('doubleClick', {target: {value: 'PvuaP6YALSA'}});

        expect(onItemDoubleClickSpy).to.be.calledWith('PvuaP6YALSA');
    });

    it('should not call attempt to call the callback when none has been given', () => {
        listSelectComponent.setProps({onItemDoubleClick: undefined});

        const optionElements = listSelectComponent
            .find('select')
            .find('option');

        expect(
            () => optionElements.first().simulate('doubleClick', {target: {value: 'PvuaP6YALSA'}})
        ).not.to.throw();

    });
});

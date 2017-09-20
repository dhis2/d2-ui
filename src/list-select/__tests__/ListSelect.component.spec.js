import React from 'react';
import ListSelect from '../ListSelect.component';

import {shallow} from 'enzyme';

describe('ListSelect component', () => {
    let listSelectComponent;
    let listSource;
    let onItemDoubleClickSpy;

    beforeEach(() => {
        onItemDoubleClickSpy = jest.fn();

        listSource = [
            {value: 'PvuaP6YALSA', label: 'Community'},
            {value: 'cNzfcPWEGSH', label: 'Country'},
            {value: 'POHZmzofoVx', label: 'Facility'},
            {value: 'NUPoPEBGCq9', label: 'OUs and Countries'},
        ];

        listSelectComponent = shallow(<ListSelect source={listSource} onItemDoubleClick={onItemDoubleClickSpy} />);
    });

    it('should have the component name as a class', () => {
        expect(listSelectComponent.hasClass('list-select')).toBe(true);
    });

    it('should a <select /> tag to contain the options', () => {
        const selectElement = listSelectComponent.find('select');

        expect(selectElement).not.toBe(null);
    });

    it('should set the size of the select box to the passed size', () => {
        listSelectComponent.setProps({size: 10});

        const selectElement = listSelectComponent.find('select');

        expect(selectElement.props().size).toBe(10);
    });

    it('should use the default value for the size if no value has been provided', () => {
        const selectElement = listSelectComponent.find('select');

        expect(selectElement.props().size).toBe(15);
    });

    it('should render an <option /> tag for each of the items', () => {
        const optionElements = listSelectComponent
            .find('select')
            .find('option');

        expect(optionElements).toHaveLength(4);
    });

    it('should render the name for the options', () => {
        const optionElements = listSelectComponent
            .find('select')
            .find('option');

        expect(optionElements.at(0).text()).toBe('Community');
        expect(optionElements.at(1).text()).toBe('Country');
        expect(optionElements.at(2).text()).toBe('Facility');
        expect(optionElements.at(3).text()).toBe('OUs and Countries');
    });

    it('should render the values for the options', () => {
        const optionElements = listSelectComponent
            .find('select')
            .find('option');

        expect(optionElements.at(0).props().value).toBe('PvuaP6YALSA');
        expect(optionElements.at(1).props().value).toBe('cNzfcPWEGSH');
        expect(optionElements.at(2).props().value).toBe('POHZmzofoVx');
        expect(optionElements.at(3).props().value).toBe('NUPoPEBGCq9');
    });

    it('should call the onItemDoubleClick callback when item is double clicked', () => {
        const optionElements = listSelectComponent
            .find('select')
            .find('option');

        optionElements.first().simulate('doubleClick', {target: {value: 'PvuaP6YALSA'}});

        expect(onItemDoubleClickSpy).toHaveBeenCalledWith('PvuaP6YALSA');
    });

    it('should not call attempt to call the callback when none has been given', () => {
        listSelectComponent.setProps({onItemDoubleClick: undefined});

        const optionElements = listSelectComponent
            .find('select')
            .find('option');

        expect(
            () => optionElements.first().simulate('doubleClick', {target: {value: 'PvuaP6YALSA'}})
        ).not.toThrow();

    });
});

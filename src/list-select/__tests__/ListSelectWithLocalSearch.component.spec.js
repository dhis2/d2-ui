import React from 'react';
import { shallow } from 'enzyme';
import TextField from 'material-ui/TextField/TextField';
import ListSelectWithLocalSearch from '../ListSelectWithLocalSearch.component';
import ListSelect from '../ListSelect.component';

describe('ListComponentWithLocalSearch', () => {
    let listComponentWithLocalSearch;

    beforeEach(() => {
        listComponentWithLocalSearch = shallow(
            <ListSelectWithLocalSearch />,
            {
                context: {
                    d2: {
                        i18n: {
                            getTranslation(key) {
                                return `${key}_translated`;
                            },
                        },
                    },
                },
            },
        );
    });

    it('should render a TextField', () => {
        expect(listComponentWithLocalSearch.find(TextField)).toHaveLength(1);
    });

    it('should render a ListSelect', () => {
        expect(listComponentWithLocalSearch.find(ListSelect)).toHaveLength(1);
    });

    it('should render the TextField and ListSelect as children of the component', () => {
        const textField = listComponentWithLocalSearch.find(TextField);
        const listSelect = listComponentWithLocalSearch.find(ListSelect);

        expect(listComponentWithLocalSearch.find('div').children().at(0)).toEqual(textField);
        expect(listComponentWithLocalSearch.find('div').children().at(1)).toEqual(listSelect);
    });

    it('should set the source to an empty array', () => {
        expect(listComponentWithLocalSearch.find(ListSelect).props().source).toEqual([]);
    });

    it('should pass the source items to the ListSelect', () => {
        const sourceList = [
            { label: 'Alpha' },
            { label: 'Beta' },
            { label: 'Charlie' },
            { label: 'Delta' },
        ];

        listComponentWithLocalSearch.setProps({
            source: sourceList,
        });

        expect(listComponentWithLocalSearch.find(ListSelect).props().source).toEqual(sourceList);
    });

    it('should pass only the items that are being filtered on', () => {
        const textField = listComponentWithLocalSearch.find(TextField);

        textField.simulate('change', { target: {
            value: 'Al',
        } });

        const sourceList = [
            { label: 'Alpha' },
        ];

        listComponentWithLocalSearch.setProps({
            source: sourceList,
        });

        expect(listComponentWithLocalSearch.find(ListSelect).props().source).toEqual(sourceList);
    });

    it('should do the searching case insensitively', () => {
        const textField = listComponentWithLocalSearch.find(TextField);

        textField.simulate('change', { target: {
            value: 'Ha',
        } });

        const sourceList = [
            { label: 'Alpha' },
            { label: 'Charlie' },
        ];

        listComponentWithLocalSearch.setProps({
            source: sourceList,
        });

        expect(listComponentWithLocalSearch.find(ListSelect).props().source).toEqual(sourceList);
    });
});

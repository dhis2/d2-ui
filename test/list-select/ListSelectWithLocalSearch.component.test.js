import React from 'react';
import ListSelectWithLocalSearch from '../../src/list-select/ListSelectWithLocalSearch.component';
import {shallow} from 'enzyme';

import TextField from 'material-ui/lib/text-field';
import ListSelect from '../../src/list-select/ListSelect.component';

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
            }
        );
    });

    it('should render a TextField', () => {
        expect(listComponentWithLocalSearch.find(TextField)).to.have.length(1);
    });

    it('should render a ListSelect', () => {
        expect(listComponentWithLocalSearch.find(ListSelect)).to.have.length(1);
    });

    it('should render the TextField and ListSelect as children of the component', () => {
        const textField = listComponentWithLocalSearch.find(TextField);
        const listSelect = listComponentWithLocalSearch.find(ListSelect);

        expect(listComponentWithLocalSearch.find('div').children().at(0)).to.deep.equal(textField);
        expect(listComponentWithLocalSearch.find('div').children().at(1)).to.deep.equal(listSelect);
    });

    it('should set the source to an empty array', () => {
        expect(listComponentWithLocalSearch.state('source')).to.deep.equal([]);
    });

    it('should pass the source items to the ListSelect', () => {
        const sourceList = [
            {label: 'Alpha'},
            {label: 'Beta'},
            {label: 'Charlie'},
            {label: 'Delta'},
        ];

        listComponentWithLocalSearch.setProps({
            source: sourceList,
        });

        expect(listComponentWithLocalSearch.find(ListSelect).props().source).to.deep.equal(sourceList);
    });

    it('should pass only the items that are being filtered on', () => {
        const textField = listComponentWithLocalSearch.find(TextField);

        textField.simulate('change', {target: {
            value: 'Al',
        }});

        const sourceList = [
            {label: 'Alpha'},
        ];

        listComponentWithLocalSearch.setProps({
            source: sourceList,
        });

        expect(listComponentWithLocalSearch.find(ListSelect).props().source).to.deep.equal(sourceList);
    });

    it('should do the searching case insensitively', () => {
        const textField = listComponentWithLocalSearch.find(TextField);

        textField.simulate('change', {target: {
            value: 'Ha',
        }});

        const sourceList = [
            {label: 'Alpha'},
            {label: 'Charlie'},
        ];

        listComponentWithLocalSearch.setProps({
            source: sourceList,
        });

        expect(listComponentWithLocalSearch.find(ListSelect).props().source).to.deep.equal(sourceList);
    });
});

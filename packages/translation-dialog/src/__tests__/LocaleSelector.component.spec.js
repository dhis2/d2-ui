import React from 'react';
import { shallow } from 'enzyme';
import Select from 'react-select';
import {LocaleSelector} from '../LocaleSelector.component';
import { getStubContext } from '../../../../config/inject-theme';

describe('LocaleSelector component', () => {
    let onChangeLocaleSpy;
    let SelectComponent;
    const locales = [{ locale: 'elf', name: 'Elfish' }, { locale: 'noren', name: 'Norglish' }];

    beforeEach(() => {
        onChangeLocaleSpy = jest.fn();
        const Component = shallow(<LocaleSelector classes={{}} locales={locales} onChange={onChangeLocaleSpy} />, {
            context: getStubContext(),
        });
        SelectComponent = Component.find(Select);
    });

    it('should render a Select', () => {
        expect(SelectComponent.type()).toBe(Select);
    });

    it('passes the list of locales to the Select', () => {
        const options = SelectComponent.prop('options');
        expect(options.length).toEqual(2);
        expect(options[0].value).toBe('elf');
    });

    it('should call onChange function when field content is changed', () => {
        SelectComponent.simulate('change', { value: 'noren', label: 'Norglish' });

        expect(onChangeLocaleSpy).toHaveBeenCalled();
        expect(onChangeLocaleSpy.mock.calls[0][0]).toBe('noren');
    });
});

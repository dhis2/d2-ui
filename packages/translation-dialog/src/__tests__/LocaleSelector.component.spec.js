import React from 'react';
import { shallow } from 'enzyme';
import MuiFormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import LocaleSelector from '../LocaleSelector.component';
import { getStubContext } from '../../../../config/inject-theme';

describe('LocaleSelector component', () => {
    let Component;
    let onChangeLocaleSpy;
    let SelectComponent;
    const locales = [{ locale: 'elf', name: 'Elfish' }, { locale: 'noren', name: 'Norglish' }];

    beforeEach(() => {
        onChangeLocaleSpy = jest.fn();
        Component = shallow(<LocaleSelector locales={locales} onChange={onChangeLocaleSpy} />, {
            context: getStubContext(),
        });
        SelectComponent = Component.find(Select).first();
    });

    it('should render a MuiFormControl component', () => {
        expect(Component.type()).toBe(MuiFormControl);
    });

    it('should render items array as menu items', () => {
        const firstItem = SelectComponent.find(MenuItem).children().first();
        expect(firstItem.text()).toBe('Elfish');
    });

    it('should render list of items with length 1 greater than the passed in list', () => {
        expect(SelectComponent.children()).toHaveLength(locales.length + 1);
    });

    it('should call onChange function when field content is changed', () => {
        SelectComponent.simulate('change', { target: { value: 'noren' } });

        expect(onChangeLocaleSpy).toHaveBeenCalled();
        expect(onChangeLocaleSpy.mock.calls[0][0]).toBe('noren');
    });
});

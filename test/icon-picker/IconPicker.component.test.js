import React from 'react';
import {shallow} from 'enzyme';
import IconPicker from '../../src/icon-picker/IconPicker.component';
import IconOption from '../../src/icon-picker/IconOption.component';
import CurrentIcon from '../../src/icon-picker/CurrentIcon.component';
import FlatButton from 'material-ui/FlatButton/FlatButton';

import Popover from 'material-ui/Popover/Popover';

describe('IconPicker', () => {
    let iconPicker;
    let options;

    beforeEach(() => {
        options = [
            '01.png',
            '02.png',
            '03.png',
            '10.png',
            '11.svg',
        ];

        iconPicker = shallow(<IconPicker options={options} value="03.png" />);
    });

    it('should have rendered a result', () => {
        expect(iconPicker).toHaveLength(1);
    });

    it('should render a Popover component', () => {
        expect(iconPicker.find(Popover)).toHaveLength(1);
    });

    it('should render the Popover as closed', () => {
        expect(iconPicker.find(Popover).props().open).toBe(false);
    });

    describe('current option', () => {
        it('should render the currently selected option', () => {
            expect(iconPicker.find(CurrentIcon)).toHaveLength(1);
        });

        it('should pass the current value to the CurrentIcon as the imgSrc', () => {
            expect(iconPicker.find(CurrentIcon).props().imgSrc).toBe('03.png');
        });

        it('should pass the imgPath prop to the CurrentIcon prop', () => {
            iconPicker = shallow(<IconPicker options={options} imgPath="/images/orgunitgroup/" value="03.png" />);

            expect(iconPicker.find(CurrentIcon).props().imgSrc).toBe('/images/orgunitgroup/03.png');
        });

        it('should render the Popover as open when clicked', () => {
            iconPicker.find(CurrentIcon).props().onIconClicked({currentTarget: {}});
            iconPicker.update();

            expect(iconPicker.find(Popover).props().open).toBe(true);
        });

        it('should close the Popover when it is requested to close', () => {
            iconPicker.find(CurrentIcon).props().onIconClicked({currentTarget: {}});
            iconPicker.update();

            expect(iconPicker.find(Popover).props().open).toBe(true);

            iconPicker.find(Popover).props().onRequestClose();
            iconPicker.update();

            expect(iconPicker.find(Popover).props().open).toBe(false);
        });
    });

    describe('rendering of IconOption(s)', () => {
        it('should render an IconOption for each of the passed options', () => {
            expect(iconPicker.find(IconOption)).toHaveLength(5);
        });

        it('should pass the file name as a prop with name value', () => {
            expect(iconPicker.find(IconOption).first().props().value).toBe('01.png');
        });

        it('should pass the index as the key', () => {
            expect(iconPicker.find(IconOption).first().node.key).toBe('0');
        });
    });

    describe('rendering of IconOptions(s) when an imgPath prop is set', () => {
        beforeEach(() => {
            iconPicker = shallow(<IconPicker options={options} imgPath="/images/orgunitgroup/" />);
        });

        it('should pass the full path to imgSrc', () => {
            expect(iconPicker.find(IconOption).first().props().imgSrc).toBe('/images/orgunitgroup/01.png');
        });

        it('should still pass only the file name as a prop when a path was given to IconPicker', () => {
            expect(iconPicker.find(IconOption).first().props().value).toBe('01.png');
        });
    });

    describe('when selecting an icon', () => {
        let onChangeSpy;

        beforeEach(() => {
            onChangeSpy = jest.fn();

            iconPicker = shallow(<IconPicker
                options={options}
                value="03.png"
                onChange={onChangeSpy}
            />);
        });

        it('should call onChange function when a new icon is clicked', () => {
            iconPicker.find(IconOption).at(2).props().onIconClicked({}, '02.png');

            expect(onChangeSpy).toHaveBeenCalledWith('02.png');
        });
    });

    describe('label', () => {
        beforeEach(() => {
            iconPicker = shallow(<IconPicker labelText="Symbol" />);
        });

        it('should render the label element', () => {
            expect(iconPicker.find('.icon-picker__label-text')).toHaveLength(1);
        });

        it('should render the labelText property as the label', () => {
            expect(iconPicker.find('.icon-picker__label-text').text()).toBe('Symbol');
        });
    });
});

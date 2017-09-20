import React from 'react';
import { shallow } from 'enzyme';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import IconOption from '../IconOption.component';

describe('IconOption', () => {
    let iconOption;
    let clickSpy;

    beforeEach(() => {
        clickSpy = jest.fn();

        iconOption = shallow(<IconOption imgSrc="/images/01.png" value="01.png" onIconClicked={clickSpy} />);
    });

    it('should have rendered a result', () => {
        expect(iconOption).toHaveLength(1);
    });

    it('should render an IconOption for each of the passed options', () => {
        expect(iconOption.find('img')).toHaveLength(1);
    });

    it('should pass the imgSrc to the img tag as the src', () => {
        expect(iconOption.find('img').props().src).toBe('/images/01.png');
    });

    it('should call the onClick action when clicking the FlatButton', () => {
        iconOption.find(FlatButton).simulate('click');

        expect(clickSpy).toHaveBeenCalledWith(undefined, '01.png');
    });
});

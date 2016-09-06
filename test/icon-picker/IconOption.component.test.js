import React from 'react';
import {shallow} from 'enzyme';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import IconOption from '../../src/icon-picker/IconOption.component';

describe('IconOption', () => {
    let iconOption;
    let clickSpy;

    beforeEach(() => {
        clickSpy = sinon.spy();

        iconOption = shallow(<IconOption imgSrc="/images/01.png" value="01.png" onIconClicked={clickSpy} />);
    });

    it('should have rendered a result', () => {
        expect(iconOption).to.have.length(1);
    });

    it('should render an IconOption for each of the passed options', () => {
        expect(iconOption.find('img')).to.have.length(1);
    });

    it('should pass the imgSrc to the img tag as the src', () => {
        expect(iconOption.find('img').props().src).to.equal('/images/01.png');
    });

    it('should call the onClick action when clicking the FlatButton', () => {
        iconOption.find(FlatButton).simulate('click');

        expect(clickSpy).to.be.calledWith(undefined, '01.png');
    });
});

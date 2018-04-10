import React from 'react';
import { shallow } from 'enzyme';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import CurrentIcon from '../CurrentIcon.component';
import IconOption from '../IconOption.component';


describe('CurrentIcon component', () => {
    let props;
    let shallowComponent;
    const currentIcon = () => {
        if (!shallowComponent) {
            shallowComponent = shallow(<CurrentIcon {...props} />);
        }
        return shallowComponent;
    };

    beforeEach(() => {
        props = {
            controlsStyle: undefined,
            dashboards: undefined,
        };
        shallowComponent = undefined;
    });

    describe('when no Img source is provided', () => {
        it('renders a FlatButton', () => {
            expect(currentIcon().find(FlatButton)).toHaveLength(1);
        });

        it('triggers onIconClicked when button is clicked', () => {
            props.onIconClicked = jest.fn();
            const component = currentIcon();
            component.simulate('click');
            expect(props.onIconClicked).toBeCalled();
        })
    });

    it('renders an IconOption when Img source is provided', () => {
        props.imgSrc = 'abc123';
        expect(currentIcon().find(IconOption)).toHaveLength(1);
        expect(currentIcon().find(FlatButton)).toHaveLength(0);
    });
});

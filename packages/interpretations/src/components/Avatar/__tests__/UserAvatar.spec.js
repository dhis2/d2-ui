import React from 'react';
import { shallow } from 'enzyme';
import { UserAvatar } from '../UserAvatar';
import Avatar from '@material-ui/core/Avatar';

let shallowUserAvatar;

const userAvatar = ({displayName = 'John Traore', classes = {} }) => {
    if (!shallowUserAvatar) {
        shallowUserAvatar = shallow(<UserAvatar displayName={displayName} classes={classes} />);
    }
    return shallowUserAvatar;
};

describe('components: UserAvatar component ', () => {
    beforeEach(() => {
        shallowUserAvatar = undefined;
    });

    it('should render an Avatar', () => {
        const avatar = userAvatar({}).find(Avatar);
        expect(avatar).toExist();
    });

    it('should display the displayName initials in the Avatar', () => {
        const avatar = userAvatar({}).find(Avatar)
        expect(avatar.render().text()).toEqual('JT')
    });

    it('should display the displayName initials in the Avatar', () => {
        const avatar = userAvatar({ displayName: 'Tom Wakiki'}).find(Avatar)
        expect(avatar.render().text()).toEqual('TW')
    });

    it('should display U as initials when no displayName is passed', () => {
        const avatar = userAvatar({ displayName: '' }).find(Avatar)
        expect(avatar.render().text()).toEqual('U')
    });
});

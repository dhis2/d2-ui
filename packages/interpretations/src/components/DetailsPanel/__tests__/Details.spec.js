import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';
import SubscriberIconEnabled from '@material-ui/icons/Notifications';
import SubscriberIconDisabled from '@material-ui/icons/AddAlert';

import * as helpers from '../../../api/helpers';
import Details from '../../DetailsPanel/Details';
import { getStubContext } from '../../../../config/test-context';

const favorite = {
    lastUpdated: '2018-05-21T12:57:25.365',
    id: 'zDP78aJU8nX',
    modelName: 'map',
    href: 'http://localhost:8029/api/maps/zDP78aJU8nX',
    created: '2018-05-17T11:53:17.999',
    name: 'ANC: 1st visit coverage (%) by district last year',
    displayName: 'ANC: 1st visit coverage (%) by district last year',
    publicAccess: 'r-------',
    description: 'Some Description',
    externalAccess: false,
    displayDescription: 'Some translated Description',
    favorite: false,
    access: {
        read: true,
        update: true,
        externalize: true,
        delete: true,
        write: true,
        manage: true,
    },
    lastUpdatedBy: {
        id: 'xE7jOejl9FI',
    },
    user: {
        id: 'xE7jOejl9FI',
        displayName: 'John Traore',
    },
    favorites: [],
    translations: [],
    mapViews: [],
    interpretations: [
        {
            id: 'LOECMJN3DRF',
        },
        {
            id: 'LqumKmXxc1k',
        },
    ],
    userGroupAccesses: [
        {
            access: 'rw------',
            userGroupUid: 'wl5cDMuUhmF',
            displayName: 'Administrators',
            id: 'wl5cDMuUhmF',
        },
    ],
    attributeValues: [],
    userAccesses: [],
    modelDefinition: { name: 'map' },
    favoriteViews: 5,
};

const context = getStubContext();

const childContextTypes = { d2: PropTypes.object, locale: () => null,  appName: () => null };

const baseProps = {
    model: favorite,
    onChange: jest.fn(),
    type: 'chart',
};

const renderComponent = (partialProps = {}) => {
    const props = { ...baseProps, ...partialProps };
    return mount(<Details {...props} />, { context, childContextTypes });
};

describe('Interpretations: Details -> Details component', () => {
    let detailsCard;

    beforeEach(() => {
        detailsCard = renderComponent();
    });

    it('should render the Details card', () => {
        expect(detailsCard).toMatchSnapshot()
    })

    describe('subscription icon', () => {
        describe('on non subscribed favorite', () => {
            beforeEach(() => {
                favorite.subscribed = false;
                detailsCard = renderComponent();
            });

            it('should render a disabled subscription icon button', () => {
                expect(detailsCard.find('IconButton').find(SubscriberIconDisabled)).toExist();
            });

            describe('when icon clicked', () => {
                beforeEach(() => {
                    helpers.setSubscription = jest.fn(() => Promise.resolve({}));
                    detailsCard
                        .find('button')
                        .find({ title: 'Subscribe to this map and start receiving notifications' })
                        .simulate('click');
                    detailsCard.update();
                });

                it('should call the toggle function to be subscribed', () => {
                    expect(helpers.setSubscription).toBeCalledWith(context.d2, favorite, true);
                });

                it('should call prop onChange', () => {
                    expect(detailsCard.instance().props.onChange).toBeCalled();
                });
            });
        });

        describe('on subscribed favorite', () => {
            beforeEach(() => {
                favorite.subscribed = true;
                detailsCard = renderComponent();
            });

            it('should render an enabled subscription icon button', () => {
                expect(detailsCard.find('IconButton').find(SubscriberIconEnabled)).toExist();
            });

            describe('when icon clicked', () => {
                beforeEach(() => {
                    helpers.setSubscription = jest.fn(() => Promise.resolve({}));
                    detailsCard
                        .find('button')
                        .find({
                            title: 'Unsubscribe from this map and stop receiving notifications',
                        })
                        .simulate('click');

                    detailsCard.update();
                });

                it('should call the toggle function to be unsubscribed', () => {
                    expect(helpers.setSubscription).toBeCalledWith(context.d2, favorite, false);
                });

                it('should call prop onChange', () => {
                    expect(detailsCard.instance().props.onChange).toBeCalled();
                });
            });
        });
    });
});

import React from 'react';
import { shallow, mount } from 'enzyme';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { IntlProvider } from 'react-intl';

import * as helpers from '../../../models/helpers';
import DetailsCard from '../DetailsCard';
import { getStubContext } from '../../../../../../config/inject-theme';

const favorite = {
    lastUpdated: "2018-05-21T12:57:25.365",
    id: "zDP78aJU8nX",
    href: "http://localhost:8029/api/maps/zDP78aJU8nX",
    created: "2018-05-17T11:53:17.999",
    name: "ANC: 1st visit coverage (%) by district last year",
    displayName: "ANC: 1st visit coverage (%) by district last year",
    publicAccess: "r-------",
    description: "Some Description",
    externalAccess: false,
    displayDescription: "Description3",
    favorite: false,
    access: {
        read: true,
        update: true,
        externalize: true,
        delete: true,
        write: true,
        manage: true
    },
    lastUpdatedBy: {
        id: "xE7jOejl9FI"
    },
    user: {
        id: "xE7jOejl9FI",
        displayName: "John Traore"
    },
    favorites: [],
    translations: [],
    mapViews: [],
    interpretations: [{
        id: "LOECMJN3DRF"
    }, {
        id: "LqumKmXxc1k"
    }],
    userGroupAccesses: [
        {
            access: "rw------",
            userGroupUid: "wl5cDMuUhmF",
            displayName: "Administrators",
            id: "wl5cDMuUhmF"
        }
    ],
    attributeValues: [],
    userAccesses: [],
    modelDefinition: {name: "map"},
    favoriteViews: 5,
};

const context = getStubContext();

const childContextTypes = {muiTheme: PropTypes.object, d2: PropTypes.object};

const baseProps = {
    model: favorite,
    onChange: jest.fn(),
};

const renderComponent = (partialProps = {}) => {
    const { intl } = new IntlProvider({ locale: 'en' }, {}).getChildContext();
    const props = { ...baseProps, ...partialProps, intl };
    return shallow(<DetailsCard.WrappedComponent {...props} />, { context, childContextTypes });
};

const getListItem = (detailsCard, label) => {
    return detailsCard.find("ListItem").findWhere(item => item.props().label === `${label}_translated`);
};

describe('Interpretations: Details -> DetailsCard component', () => {
    let detailsCard;

    beforeEach(() => {
        detailsCard = renderComponent();
    });

    it('should render description as first item', () => {
        expect(detailsCard.find("ListItem").get(0).props.text).toEqual(favorite.description);
    });

    it('should render owner', () => {
        expect(getListItem(detailsCard, "owner").props().text).toEqual("John Traore");
    });

    it('should render created', () => {
        expect(getListItem(detailsCard, "created").props().text).toEqual("5/17/2018");
    });

    it('should render last updated', () => {
        expect(getListItem(detailsCard, "last_updated").props().text).toEqual("5/21/2018");
    });

    it('should render favorite views', () => {
        expect(getListItem(detailsCard, "views").props().text).toEqual(5);
    });

    it('should render sharing info', () => {
        expect(getListItem(detailsCard, "sharing").props().text)
            .toEqual("public_translated: access_read_translated + Administrators");
    });

    it('should render a closed DetailsDialog', () => {
        expect(detailsCard.find("DetailsDialog").props().open).toBe(false);
    });

    describe('when user clicks on the edit details button', () => {
        beforeEach(() => {
            detailsCard.find("ListItem").at(0).dive().find("EditButton").simulate("click");
            detailsCard.update();
        });

        it('should open the details dialog', () => {
            expect(detailsCard.find("DetailsDialog").props().open).toBe(true);
        });

        describe('when user clicks on the save button', () => {
            beforeEach(() => {
                helpers.patch = jest.fn(() => Promise.resolve({}));
                return detailsCard.find("DetailsDialog").props().onSave(favorite);
            });

            it('should close the details dialog', () => {
                detailsCard.update();
                expect(detailsCard.find("DetailsDialog").props().open).toBe(false);
            });

            it('should patch the favorite with attributes name and description', () => {
                expect(helpers.patch).toBeCalledWith(favorite, ["name", "description"]);
            });
        });

        describe('when user clicks on the close button', () => {
            beforeEach(() => {
                detailsCard.find("DetailsDialog").props().onClose();
                detailsCard.update();
            });

            it('should close the details dialog', () => {
                expect(detailsCard.find("DetailsDialog").props().open).toBe(false);
            });
        });
    });

    describe('when user clicks on the sharing button', () => {
        beforeEach(() => {
            getListItem(detailsCard, "sharing").dive().find("EditButton").simulate("click");
            detailsCard.update();
        });

        it('should open the details dialog', () => {
            expect(detailsCard.find("SharingDialog").props().open).toBe(true);
        });
    });
});

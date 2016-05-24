import React, { Component } from 'react';
import { render } from 'react-dom';
import { init, getInstance, config } from 'd2/lib/d2';
import addD2Context from '../component-helpers/addD2Context';
import Paper from 'material-ui/lib/paper';
import Avatar from 'material-ui/lib/avatar';
import { Observable } from 'rx';
import curry from 'lodash/fp/curry';
import compose from 'lodash/fp/compose';
import map from 'lodash/fp/map';
import log from 'loglevel';
import pick_ld from 'lodash/fp/pick';
import pluck_ld from 'lodash/fp/get';
import withStateFrom from '../component-helpers/withStateFrom';
import TextField from 'material-ui/lib/text-field';

const pick = curry(pick_ld);
const pluck = curry(pluck_ld);

global.jQuery.ajaxSetup({
    headers: {
        Authorization: DHIS_CONFIG.authorization,
    },
});

config.i18n.strings.add('settings');
config.i18n.strings.add('profile');
config.i18n.strings.add('account');
config.i18n.strings.add('help');
config.i18n.strings.add('log_out');
config.i18n.strings.add('about_dhis2');

const profileSource$ = Observable.just([
    {
        name: 'settings',
        namespace: '/dhis-web-commons-about',
        defaultAction: '/dhis-web-commons-about/userSettings.action',
        icon: '/icons/usersettings.png',
        description: '',
    },
    {
        name: 'profile',
        namespace: '/dhis-web-commons-about',
        defaultAction: '/dhis-web-commons-about/showUpdateUserProfileForm.action',
        icon: '/icons/function-profile.png',
        description: '',
    },
    {
        name: 'account',
        namespace: '/dhis-web-commons-about',
        defaultAction: '/dhis-web-commons-about/showUpdateUserAccountForm.action',
        icon: '/icons/function-account.png',
        description: '',
    },
    {
        name: 'help',
        namespace: '/dhis-web-commons-about',
        defaultAction: '', //helpPageLink.defaultAction || '', //FIXME: This sets the help url to an empty string when the ajax call failed. We should find an alternative.
        icon: '/icons/function-account.png',
        description: '',
    },
    {
        name: 'log_out',
        namespace: '/dhis-web-commons-about',
        defaultAction: '/dhis-web-commons-security/logout.action',
        icon: '/icons/function-log-out.png',
        description: '',
    },
    {
        name: 'about_dhis2',
        namespace: '/dhis-web-commons-about',
        defaultAction: '/dhis-web-commons-about/about.action',
        icon: '/icons/function-about-dhis2.png',
        description: '',
    },
]);

function loadMenuItems() {
    return getInstance()
        .then(d2 => {
            const api = d2.Api.getApi();

            return api.get(DHIS_CONFIG.baseUrl + '/dhis-web-commons/menu/getModules.action');
        })
        .then(({modules}) => modules)
        .catch((error) => log.error(error));
}

const appsMenuSource$ = Observable.fromPromise(loadMenuItems());

const translate = curry(function translate(d2, key) {
    return d2.i18n.getTranslation(key);
});

const d2$ = Observable.fromPromise(getInstance());
const currentUser$ = d2$.map(pluck('currentUser'));
const translate$ = Observable
    .combineLatest(d2$, Observable.just(translate), (d2, translateFn) => translateFn(d2));

function translateMenuItemNames(translate, items) {
    return items.map((item) => Object.assign({}, item, { name: translate(item.name) }));
}

const removePrefix = (word) => word.replace(/^\.\./, '');

const adjustIconUrl = curry((baseUrl, item) => Object.assign({}, item, { icon: baseUrl + removePrefix(item.icon) }));
const adjustDefaultActionUrl = curry((baseUrl, item) => Object.assign({}, item, { action: baseUrl + removePrefix(item.defaultAction) }));
const adjustMenuItemsUrls = compose(adjustIconUrl(DHIS_CONFIG.baseUrl), adjustDefaultActionUrl(DHIS_CONFIG.baseUrl));
const extractMenuProps = pick(['action', 'icon', 'description', 'displayName', 'name']);
const prepareMenuItem = compose(extractMenuProps, adjustMenuItemsUrls);
const prepareMenuItems = map(prepareMenuItem);

const profileMenuItems$ = Observable
    .combineLatest(translate$, profileSource$, translateMenuItemNames)
    .map(prepareMenuItems);

const appsMenuItems$ = Observable
    .combineLatest(translate$, appsMenuSource$, translateMenuItemNames)
    .map(prepareMenuItems);

const headerBarStore$ = Observable
    .combineLatest(
        appsMenuItems$,
        profileMenuItems$,
        currentUser$,
        (appItems, profileItems, currentUser) => ({appItems, profileItems, currentUser})
    );

const styles = {
    headerBar: {
        boxSizing: 'border-box',
        background: 'orange',
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '1rem',
    },

    headerTitle: {
        flex: 1,
    },

    headerMenu: {
        flex: '0 0 auto',
        padding: '0 1rem',
    },

    menusWrap: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    dropDownWrap: {
        position: 'absolute',
        display: 'none',
        padding: '1rem',
        right: 0,
    },
};

function HeaderMenus(props) {
    return (
        <div style={styles.menusWrap}>{props.children}</div>
    );
}

function HeaderBar(props) {
    const { appItems, profileItems, currentUser } = props;

    if (!appItems && !profileItems) {
        return <div />;
    }

    return (
        <div style={styles.headerBar}>
            <InnerHeader />
            <TextField />
            <HeaderMenus>
                <AppMenu items={appItems} />
                <ProfileMenu items={profileItems} currentUser={currentUser} />
            </HeaderMenus>
        </div>
    );
}

function InnerHeader(props) {
    return (
        <div style={styles.headerTitle}>Inner header</div>
    );
}

function HeaderMenuItem(props) {
    return (
        <div>
            <img src={props.icon} style={{display: 'block'}} />
            <div>{props.displayName || props.name}</div>
        </div>
    );
}

class HeaderMenu extends Component {
    constructor(...args) {
        super(...args);

        this.state = {};

        this._mouseEnter = this._mouseEnter.bind(this);
        this._mouseLeave = this._mouseLeave.bind(this);
    }

    render() {
        const { name, children } = this.props;
        const menuStyle = Object.assign({}, styles.dropDownWrap, { display: this.state.open ? 'block' : 'none'});

        return (
            <div
                style={styles.headerMenu}
                onMouseEnter={this._mouseEnter}
                onMouseLeave={this._mouseLeave}
            >
                {name}
                <Paper style={menuStyle}>
                    {children}
                </Paper>
            </div>
        );
    }

    _mouseEnter(event) {
        this.setState({
            anchor: event.target,
            open: true,
        });
    }

    _mouseLeave() {
        this.setState({
            open: false,
        });
    }
}

const AppMenu = addD2Context(function AppMenu(props, { d2 }) {
    return (
        <HeaderMenu name={d2.i18n.getTranslation('apps')}>
            {props.items.map(item => <HeaderMenuItem {...item} />)}
        </HeaderMenu>
    );
});

function ProfileMenu(props, { d2 }) {
    const { currentUser, items } = props;

    return (
        <HeaderMenu name={<Avatar>{currentUser.name.charAt(0)}</Avatar>}>
            {items.map(item => <HeaderMenuItem {...item} />)}
        </HeaderMenu>
    );
}

export function initHeaderBar(domElement) {
    init({ baseUrl: DHIS_CONFIG.baseUrl + '/api' })
        .then((d2) => {
            const HeaderBarWithState = withStateFrom(headerBarStore$, HeaderBar);

            const HeaderBarWithContext = React.createClass({
                childContextTypes: {
                    d2: React.PropTypes.object,
                },

                getChildContext() {
                    return {
                        d2: d2,
                    };
                },

                render() {
                    return (
                        <HeaderBarWithState />
                    );
                },
            });

            render(<HeaderBarWithContext />, domElement);
        });
}

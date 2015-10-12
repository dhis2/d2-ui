/**
 * @component HeaderBar
 *
 * @description
 * The `HeaderBar` component can be used to display the systems header bar at the top of your app. The headerbar
 * includes the `Apps` and `Profile` menus that are displayed in all the core
 *
 * @example
 *
 * ```html
 * <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
 * ```
 *
 * ```js
 * import React from 'react';
 * import HeaderBar from 'd2-ui/lib/header-bar/HeaderBar.component';
 *
 * const App = React.createClass({
 *     render() {
 *         return (
 *             <div>
 *                 <HeaderBar />
 *             </div>
 *         );
 *     }
 * });
 ```
 */
import React from 'react';
import './translate';
import './menu';
import './menu-ui';
import dhis2 from './dhis2';
import log from 'loglevel';

const defaultStyle = 'light_blue';
const defaultStylesheetUrl = 'light_blue/light_blue.css';
const stylesLocation = 'dhis-web-commons/css';

function stripApi(baseUrl) {
    return baseUrl.replace(/\/api\/?$/, '');
}

function islocalStorageSupported() {
    try {
        localStorage.setItem('dhis2.menu.localstorage.test', 'dhis2.menu.localstorage.test');
        localStorage.removeItem('dhis2.menu.localstorage.test');
        return true;
    } catch (e) {
        return false;
    }
}

function saveToLocalStorage(headerData) {
    if (islocalStorageSupported()) {
        localStorage.setItem('dhis2.menu.ui.headerBar.userStyle', headerData.userStyleUrl);
        localStorage.setItem('dhis2.menu.ui.headerBar.logo', headerData.logo);
        localStorage.setItem('dhis2.menu.ui.headerBar.title', headerData.title);
        localStorage.setItem('dhis2.menu.ui.headerBar.link', headerData.link);
    }

    return headerData;
}

const HeaderBar = React.createClass({
    contextTypes: {
        d2: React.PropTypes.object.isRequired,
    },

    getInitialState() {
        return {
            headerBar: {

            },
        };
    },

    componentWillMount() {
        dhis2.settings.baseUrl = stripApi(this.context.d2.Api.getApi().baseUrl);
        dhis2.menu.ui.initMenu();

        this.getSystemSettings(this.context.d2)
            .then(this.getHeaderBarData)
            .catch(this.loadDataFromLocalStorageIfAvailable)
            .then(saveToLocalStorage)
            .then(headerData => {
                this.setHeaderData(headerData.userStyleUrl, headerData.logo, headerData.title, headerData.link);
            });
    },

    getSystemSettings(d2) {
        return d2.system.settings.all();
    },

    getHeaderBarData(systemSettings) {
        return this.requestUserStyle()
            .catch(() => {
                log.info('Unable to load usersettings, falling back to systemSettings');
                localStorage.setItem('dhis2.menu.ui.headerBar.userStyle', systemSettings.currentStyle);
                return systemSettings.currentStyle;
            })
            .then(userStyleUrl => {
                return {
                    userStyleUrl: userStyleUrl || systemSettings.currentStyle,
                    logo: systemSettings.keyCustomTopMenuLogo,
                    title: systemSettings.applicationTitle,
                    link: systemSettings.startModule,
                };
            });
    },

    getBaseUrl() {
        return this.context.d2.Api.getApi().baseUrl.replace(/\/api\/?$/, '');
    },

    getStyleLogoUrl(styleName) {
        return [this.getBaseUrl(), stylesLocation, styleName, 'logo_banner.png'].join('/');
    },

    getStylesheetUrl(stylesheet) {
        return [this.getBaseUrl(), stylesLocation, 'themes', stylesheet || defaultStylesheetUrl].join('/');
    },

    getStyleName(userStyle) {
        if (typeof userStyle === 'string' && userStyle.split('/')[0] && userStyle.split('/').length > 0) {
            return userStyle.split('/')[0];
        }
        return defaultStyle;
    },

    render() {
        const headerBarStyle = {
            height: '44px',
            position: 'fixed',
            zIndex: 15,
            top: 0,
            left: 0,
            right: 0,
            boxShadow: '0 0 3px #222',
        };

        const headerBannerStyle = {
            position: 'absolute',
            top: '13px',
            left: '55px',
        };

        const headerTextStyle = {
            position: 'absolute',
            top: 12,
            left: 175,
            fontWeight: 'bold',
            color: '#fff',
            fontSize: 16,
        };

        return (
            <div className="header-bar" style={headerBarStyle} id="header">
                <a href={this.state.headerBar.link} title={this.state.headerBar.title} className="title-link">
                    <img className="header-logo" src={this.state.headerBar.logo} id="headerBanner" style={headerBannerStyle} />
                    <span className="header-text" id="headerText" style={headerTextStyle}>{this.state.headerBar.title}</span>
                </a>
                <div>{this.state.headerBar.message}</div>
                <div id="dhisDropDownMenu"></div>
            </div>
        );
    },

    loadDataFromLocalStorageIfAvailable() {
        let logo;
        let title;
        let link;
        let userStyle;

        // Load values from localStorage if they are available
        if (islocalStorageSupported()) {
            logo = localStorage.getItem('dhis2.menu.ui.headerBar.logo');
            title = localStorage.getItem('dhis2.menu.ui.headerBar.title');
            link = localStorage.getItem('dhis2.menu.ui.headerBar.link');
            userStyle = localStorage.getItem('dhis2.menu.ui.headerBar.userStyle');
        }

        return {
            userStyleUrl: userStyle,
            logo: logo,
            title: title,
            link: link,
        };
    },

    setHeaderData(userStyleUrl, logo, title, link) {
        const userStyleName = this.getStyleName(userStyleUrl);

        this.addUserStyleStylesheet(this.getStylesheetUrl(userStyleUrl));
        this.setHeaderLogo(userStyleName, logo);
        this.setHeaderTitle(title);
        this.setHeaderLink(link);
    },

    setHeaderBarProp(name, value) {
        this.setState({
            headerBar: Object.assign({}, this.state.headerBar, {
                [name]: value,
            }),
        });
    },

    setHeaderLogo(userStyleName, customTopMenuLogo) {
        if (customTopMenuLogo === true) {
            this.setHeaderBarProp('logo', [this.getBaseUrl(), '/external-static/logo_banner.png'].join(''));
        } else {
            if (this.isValidUserStyle(userStyleName)) {
                this.setHeaderBarProp('logo', this.getStyleLogoUrl(userStyleName));
            } else {
                this.setHeaderBarProp('logo', this.getStyleLogoUrl(defaultStyle));
            }
        }
    },

    setHeaderTitle(applicationTitle) {
        this.setHeaderBarProp('title', applicationTitle || 'District Health Information Software 2');
    },

    setHeaderLink(startModule) {
        this.setHeaderBarProp('link', [this.getBaseUrl(), startModule || 'dhis-web-dashboard-integration', 'index.action'].join('/'));
    },

    requestUserStyle() {
        const api = this.context.d2.Api.getApi();
        return api.get('userSettings/currentStyle', {}, {dataType: 'text'})
            .then(response => {
                return response.trim();
            });
    },

    isValidUserStyle(userStyle) {
        return typeof userStyle === 'string' && /^[A-z0-9_\-]+$/.test(userStyle);
    },

    addUserStyleStylesheet(stylesheetUrl) {
        jQuery('head').append('<link href="' + stylesheetUrl + '" type="text/css" rel="stylesheet" media="screen,print" />');
    },
});

export default HeaderBar;

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
        localStorage.setItem('dhis2.menu.ui.headerBar.title', headerData.title);
        localStorage.setItem('dhis2.menu.ui.headerBar.link', headerData.link);
    }

    return headerData;
}

const HeaderBar = React.createClass({
    propTypes: {
        lastUpdate: React.PropTypes.instanceOf(Date),
    },

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
        // dhis2.settings.baseUrl = dhis2.settings.baseUrl || '..';
        dhis2.menu.ui.initMenu();

        this.getSystemSettings(this.context.d2)
            .then(this.getHeaderBarData)
            .catch(this.loadDataFromLocalStorageIfAvailable)
            .then(saveToLocalStorage)
            .then(headerData => {
                this.setHeaderData(headerData.userStyleUrl, headerData.title, headerData.link);
            })
            .catch(error => {
                log.error(error);
            });
    },

    componentWillReceiveProps(props) {
        if (this.props.lastUpdate && (this.props.lastUpdate.getTime() - props.lastUpdate.getTime()) !== 0) {
            dhis2.menu.ui.bootstrapMenu();
        }
    },

    getSystemSettings(d2) {
        return d2.system.settings.all();
    },

    getHeaderBarData(systemSettings) {
        return this.requestUserStyle()
            .catch(() => {
                log.info('Unable to load usersettings, falling back to systemSettings');
                localStorage.setItem('dhis2.menu.ui.headerBar.userStyle', systemSettings.keyCurrentStyle);
                return systemSettings.keyCurrentStyle;
            })
            .then(userStyleUrl => {
                return {
                    userStyleUrl: userStyleUrl || systemSettings.keyCurrentStyle,
                    title: systemSettings.applicationTitle,
                    link: systemSettings.startModule,
                };
            })
            .catch(error => log.error(error));
    },

    getApiBaseUrl() {
        return this.context.d2.Api.getApi().baseUrl;
    },

    getBaseUrl() {
        return this.getApiBaseUrl().replace(/\/api\/?$/, '');
    },

    getLogoUrl() {
        return [this.getApiBaseUrl(), 'staticContent', 'logo_banner'].join('/');
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
            paddingLeft: 10,
            boxShadow: '0 0 3px #222',
        };

        const headerBarContentStyle = {
            position: 'relative',
            maxWidth: 1200,
        };

        const headerBannerWrapperStyle = {
            display: 'table-cell',
            width: 155,
            height: 44,
            verticalAlign: 'middle',
            textAlign: 'center',
        };

        const headerBannerStyle = {
            maxWidth: 175,
            maxHeight: 44,
        };

        const headerTextStyle = {
            position: 'absolute',
            top: 12,
            left: 175,
            fontWeight: 'bold',
            color: '#fff',
            fontSize: 16,
        };

        const dropDownMenuStyle = {
            position: 'absolute',
            top: 0,
            right: 0,
        };

        return (
            <div className="header-bar" style={headerBarStyle} id="header">
                <div style={headerBarContentStyle}>
                    <a href={this.state.headerBar.link} title={this.state.headerBar.title} className="title-link">
                        <div style={headerBannerWrapperStyle}>
                            <img className="header-logo" src={this.getLogoUrl()} id="headerBanner" style={headerBannerStyle} />
                        </div>
                        <span className="header-text" id="headerText" style={headerTextStyle}>{this.state.headerBar.title}</span>
                    </a>
                    <div>{this.state.headerBar.message}</div>
                    <div style={dropDownMenuStyle} id="dhisDropDownMenu"></div>
                </div>
            </div>
        );
    },

    loadDataFromLocalStorageIfAvailable() {
        let title;
        let link;
        let userStyle;

        // Load values from localStorage if they are available
        if (islocalStorageSupported()) {
            title = localStorage.getItem('dhis2.menu.ui.headerBar.title');
            link = localStorage.getItem('dhis2.menu.ui.headerBar.link');
            userStyle = localStorage.getItem('dhis2.menu.ui.headerBar.userStyle');
        }

        return {
            userStyleUrl: userStyle,
            title: title,
            link: link,
        };
    },

    setHeaderData(userStyleUrl, title, link) {
        this.addUserStyleStylesheet(this.getStylesheetUrl(userStyleUrl));
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

    setHeaderTitle(applicationTitle) {
        this.setHeaderBarProp('title', applicationTitle || 'District Health Information Software 2');
    },

    setHeaderLink() {
        this.setHeaderBarProp('link', [this.getBaseUrl(), 'dhis-web-commons-about/redirect.action'].join('/'));
    },

    requestUserStyle() {
        const api = this.context.d2.Api.getApi();
        return api.get('userSettings/keyStyle', {}, { dataType: 'text' })
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

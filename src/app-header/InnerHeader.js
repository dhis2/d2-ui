// import React from 'react';
// import styles from './header-bar-styles';
//
// export default function InnerHeader(props) {
//     return (
//         <div style={styles.headerTitle}>Inner header</div>
//     );
// }

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
import log from 'loglevel';
import styles from './header-bar-styles';

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
    }

    return headerData;
}

const InnerHeader = React.createClass({
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
        if (!d2.system) {
            return Promise.reject(new Error('Offline'));
        }

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
                };
            })
            .catch(error => log.error(error));
    },

    getApiBaseUrl() {
        if (!this.context.d2.Api) {
            return '/';
        }
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
        const headerBannerWrapperStyle = {
            width: 155,
            height: 44,
            verticalAlign: 'middle',
            textAlign: 'center',
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        };

        const headerBannerStyle = {
            maxWidth: 175,
            maxHeight: 44,
        };

        const headerTextStyle = {
            fontWeight: 'bold',
            color: '#fff',
            fontSize: 16,
            flex: 1,
            padding: '.5rem',
        };

        const linkStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textDecoration: 'none',
        };

        const linkHref = [this.getBaseUrl(), 'dhis-web-commons-about/redirect.action'].join('/');

        return (
            <div style={Object.assign({ display: 'flex'}, styles.headerTitle)}>
                <a href={linkHref} title={this.state.headerBar.title} style={linkStyle} className="title-link">
                    <div style={headerBannerWrapperStyle}>
                        <div>
                            <img className="header-logo" src={this.getLogoUrl()} id="headerBanner" style={headerBannerStyle} />
                        </div>
                    </div>
                    <span className="header-text" id="headerText" style={headerTextStyle}>{this.state.headerBar.title}</span>
                </a>
            </div>
        );
    },

    loadDataFromLocalStorageIfAvailable() {
        let title;
        let userStyle;

        // Load values from localStorage if they are available
        if (islocalStorageSupported()) {
            title = localStorage.getItem('dhis2.menu.ui.headerBar.title');
            userStyle = localStorage.getItem('dhis2.menu.ui.headerBar.userStyle');
        }

        return {
            userStyleUrl: userStyle,
            title: title,
        };
    },

    setHeaderData(userStyleUrl, title, link) {
        this.addUserStyleStylesheet(this.getStylesheetUrl(userStyleUrl));
        this.setHeaderTitle(title);
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

export default InnerHeader;

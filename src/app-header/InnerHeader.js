import React from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';
import { Observable, Subject } from 'rxjs';
import styles, { whenWidthLargerThan1150 } from './header-bar-styles';
import getBaseUrlFromD2ApiUrl from './getBaseUrlFromD2ApiUrl';

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

function saveToLocalStorage(headerData = {}) {
    if (islocalStorageSupported()) {
        headerData.userStyleUrl && localStorage.setItem('dhis2.menu.ui.headerBar.userStyle', headerData.userStyleUrl);
        headerData.title && localStorage.setItem('dhis2.menu.ui.headerBar.title', headerData.title);
    }

    return headerData;
}

const InnerHeader = React.createClass({
    propTypes: {
        lastUpdate: PropTypes.instanceOf(Date),
    },

    contextTypes: {
        d2: PropTypes.object.isRequired,
    },

    getInitialState() {
        this.unmount = new Subject();

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
            .then((headerData) => {
                this.setHeaderData(headerData.userStyleUrl, headerData.title);
            })
            .catch((error) => {
                log.error(error);
            });
    },

    componentDidMount() {
        Observable
            .fromEvent(window, 'resize')
            .takeUntil(this.unmount)
            .debounceTime(200)
            .subscribe(
                () => this.forceUpdate(),
                e => log.error('Could not update the HeaderBar after resize', e),
            );
    },

    componentWillReceiveProps(props) {
        if (this.props.lastUpdate && (this.props.lastUpdate.getTime() - props.lastUpdate.getTime()) !== 0) {
            dhis2.menu.ui.bootstrapMenu();
        }
    },

    componentWillUnmount() {
        this.unmount.next(true);
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
            .then(userStyleUrl => ({
                userStyleUrl: userStyleUrl || systemSettings.keyCurrentStyle,
                title: systemSettings.applicationTitle,
            }))
            .catch(error => log.error(error));
    },

    getApiBaseUrl() {
        if (!this.context.d2.Api) {
            return '/';
        }
        return this.context.d2.Api.getApi().baseUrl;
    },

    getBaseUrl() {
        return getBaseUrlFromD2ApiUrl(this.context.d2);
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

        const linkWrapStyle = {
            flex: 1,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            color: '#FFF',
            alignItems: 'center',
            justifyItems: 'center',
            display: 'flex',
            minWidth: whenWidthLargerThan1150(450, 'auto'),
            paddingRight: '1rem',
            boxSizing: 'border-box',
        };

        const linkStyle = {
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#FFF',
            textDecoration: 'none',
            textOverflow: 'ellipsis',
            minWidth: 1,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        };

        const logoHref = {
            minWidth: 175,
        };

        const linkHref = [this.getBaseUrl(), 'dhis-web-commons-about/redirect.action'].join('/');

        const largeScreensInnerHeader = Object.assign({ display: 'flex', minWidth: 450 + 175, overflow: 'hidden', textOverflow: 'ellipsis' }, styles.headerTitle);

        const smallerScreensInnerHeader = Object.assign({ display: 'flex', overflow: 'hidden', textOverflow: 'ellipsis' }, styles.headerTitle);

        return (
            <div style={whenWidthLargerThan1150(largeScreensInnerHeader, smallerScreensInnerHeader)}>
                <a href={linkHref} title={this.state.headerBar.title} style={logoHref} className="title-link">
                    <div style={headerBannerWrapperStyle}>
                        <div>
                            <img className="header-logo" src={this.getLogoUrl()} id="headerBanner" style={headerBannerStyle} />
                        </div>
                    </div>
                </a>
                <div style={linkWrapStyle}>
                    <a href={linkHref} title={this.state.headerBar.title} style={linkStyle} className="title-link">
                        {this.state.headerBar.title}
                    </a>
                </div>
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
            title,
        };
    },

    setHeaderData(userStyleUrl, title) {
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
        return api.get('userSettings/keyStyle')
            .then(response => response.trim());
    },

    isValidUserStyle(userStyle) {
        return typeof userStyle === 'string' && /^[A-z0-9_\-]+$/.test(userStyle);
    },

    addUserStyleStylesheet(stylesheetUrl) {
        const linkElement = document.createElement('link');
        linkElement.setAttribute('href', stylesheetUrl);
        linkElement.setAttribute('type', 'text/css');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('media', 'screen,print');

        document.querySelector('head').appendChild(linkElement);
    },
});

export default InnerHeader;

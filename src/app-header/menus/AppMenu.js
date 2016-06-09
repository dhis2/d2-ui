import React from 'react';
import HeaderMenu from './HeaderMenu';
import HeaderMenuItem from './HeaderMenuItem';
import FlatButton from 'material-ui/lib/flat-button';
import AppsIcon from 'material-ui/lib/svg-icons/navigation/apps';
import addD2Context from '../../component-helpers/addD2Context';
import { white } from 'material-ui/lib/styles/colors';
import { config } from 'd2/lib/d2';

// App menu strings to be translated
config.i18n.strings.add('more_applications');

const styles = {
    moreAppsButton: {
        marginTop: '1rem',
        width: '375px',
        display: 'block',
        textAlign: 'center',
    },
};

function getBaseUrl(d2) {
    if (d2.Api) {
        return d2.Api.getApi().baseUrl.replace('/api', '');
    }
    return './'; // Get old base url from local storage
}

const AppMenu = addD2Context(function AppMenu(props, { d2 }) {
    const menuItems = props.items.map((item, index) => (<HeaderMenuItem key={index} {...item} />));
    const moreAppsButton = (
        <FlatButton style={styles.moreAppsButton} linkButton={true} href={getBaseUrl(d2) + '/dhis-web-commons-about/modules.action'}>
            {d2.i18n.getTranslation('more_applications')}
        </FlatButton>
    );

    return (
        <HeaderMenu
            name={<div>{<AppsIcon color={white} />}</div>}
            moreButton={moreAppsButton}
            rowItemCount={props.rowItemCount}
            columnItemCount={props.columnItemCount}
        >
            {menuItems}
        </HeaderMenu>
    );
});

export default AppMenu;

import { white } from 'material-ui/lib/styles/colors';

export function applyUserStyle(user, style) {
    switch (user.userSettings.keyStyle) {

    case 'vietnam/vietnam.css':
        return Object.assign({}, style, { background: '#b40303' });
    }

    return style;
}

export default {
    avatar: {
        height: 32,
        width: 32,
        fontSize: '1.3rem',
        letterSpacing: -2,
        lineHeight: '32px',
    },

    headerBar: {
        boxSizing: 'border-box',
        background: '#276696',
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        minHeight: 48,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1400,
    },

    headerTitle: {
        flex: 1,
        color: '#FFF',
    },

    headerMenu: {
        flex: '0 0 auto',
        padding: '0 1rem',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
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
        right: 40,
        overflow: 'hidden',
        width: 400,
        flexDirection: 'column',
    },

    searchField: {
        flex: 2,
        position: 'relative',
    },

    searchResultList: {
        display: 'flex',
        flexWrap: 'wrap',
    },

    searchResults: {
        position: 'absolute',
        top: 48,
        left: 0,
        right: 0,
        padding: '1rem',
    },

    searchFieldInput: {
        color: white,
    },

    searchFieldHintText: {
        color: '#CCC',
    },

    menuItemLink: {
        padding: '1rem',
        display: 'flex',
        width: '125px',
        height: '125px',
        boxSizing: 'border-box',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    menuItemIcon: {
        height: 48,
        width: 48,
    },
};

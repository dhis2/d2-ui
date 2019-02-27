import { colors } from '../colors';

export const styles = {
    highlightedItem: {
        backgroundColor: colors.accentSecondaryDark,
    },
    highlightedText: {
        color: colors.white,
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        padding: '3px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    ghost: {
        transition: 'opacity 0.2s ease',
        opacity: '0.2',
    },
    selectedItem: {
        backgroundColor: '#b2dfdb',
    },
    selectedItemLabel: {
        fontSize: '14px',
        padding: '2px',
    },
    unselectedItemLabel: {
        fontSize: '14px',
        padding: '2px 5px 2px 2px',
    }
};

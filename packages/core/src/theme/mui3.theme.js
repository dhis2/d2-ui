// Color palette from https://projects.invisionapp.com/share/A7LT4TJYETS#/screens/302550228_Color
export const colors = {
    accentPrimary: '#1976d2',
    accentPrimaryDark: '#004BA0',
    accentPrimaryLight: '#63A4FF',
    accentPrimaryLightest: '#EAF4FF',

    accentSecondary: '#00796B',
    accentSecondaryDark: '#004C40',
    accentSecondaryLight: '#48A999',
    accentSecondaryLightest: '#B2DFDB',
    accentSecondaryBackground: '#D9ECEB',

    black: '#000000',
    greyBlack: '#494949',
    grey: '#9E9E9E',
    greyLight: '#E0E0E0',
    blueGrey: '#ECEFF1',
    snow: '#F4F6F8',
    white: '#FFFFFF',

    negative: '#E53935',
    warning: '#F19C02',
    positive: '#3D9305',
    info: '#EAF4FF',
};

export const palette = {
    common: {
        white: colors.white,
        black: colors.black,
    },
    action: {
        active: colors.greyBlack,
        disabled: colors.greyLight,
    },
    text: {
        primary: colors.black,
        secondary: colors.greyBlack,
        disabled: colors.grey,
        hint: colors.grey,
    },
    primary: {
        main: colors.accentPrimary,
        dark: colors.accentPrimaryDark,
        light: colors.accentPrimaryLight,
        lightest: colors.accentPrimaryLightest, // Custom extension, not used by default
    },
    secondary: {
        main: colors.accentSecondary,
        dark: colors.accentSecondaryDark,
        light: colors.accentSecondaryLight,
        lightest: colors.accentSecondaryLightest, // Custom extension, not used by default
    },
    error: {
        main: colors.negative, // This is automatically expanded to main/light/dark/contrastText
    },
    status: {
        // Custom colors collection, not used by default in MUI
        negative: colors.negative,
        warning: colors.warning,
        positive: colors.positive,
        info: colors.info,
    },
    background: {
        paper: colors.white,
        default: colors.snow,
        grey: '#FCFCFC',
        hover: colors.greyLight,
    },
    divider: colors.greyLight,

    // Custom color, not used by default in MUI
    shadow: colors.grey,
};

const spacingUnit = 8;
const childSelectorMuiTypography =
    '& span[class^="MuiTypography"], & span[class*=" MuiTypography"]';
export const theme = {
    colors,
    palette,
    typography: {
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontSize: 14,
        useNextVariants: true,
    },
    spacing: {
        unit: spacingUnit,
    },
    overrides: {
        MuiDivider: {
            light: {
                backgroundColor: palette.divider, // No light dividers for now
            },
        },
        MuiDialog: {
            paperWidthSm: {
                flexBasis: 400,
                maxWidth: 400,
                maxHeight: 'calc(100vh - 15%)',
            },
            paperWidthMd: {
                flexBasis: 600,
                maxWidth: 600,
                maxHeight: 'calc(100vh - 15%)',
            },
            paperWidthLg: {
                flexBasis: 800,
                maxWidth: 800,
                maxHeight: 'calc(100vh - 20%)',
            },
        },
        MuiDialogTitle: {
            root: {
                fontSize: 16,
                fontWeight: 'bold',
                padding: `${spacingUnit * 2.5}px ${spacingUnit * 3}px ${spacingUnit * 0.5}px`,

                '&>h6': { // When not specifying 'disableTypography', an h6 element is created by default beneath DialogTitle
                    fontSize: '1em',
                    lineHeight: 'inherit',
                    fontWeight: 'inherit',
                },
            },
        },
        MuiDialogContent: {
            root: {
                margin: spacingUnit * 3,
                padding: 0,

                '&:first-child': {
                    paddingTop: 0,
                },
            },
        },
        MuiDialogActions: {
            root: {
                borderTop: `1px solid ${palette.divider}`,
                margin: 0,
                padding: `${spacingUnit * 1.5}px ${spacingUnit * 3}px`,

                '&> *:last-child': {
                    marginRight: 0,
                },
            },
        },
        MuiSelect: {
            select: {
                '&:focus': {
                    background: '$labelcolor',
                },
            },
        },
        MuiInput: {
            underline: {
                '&:after': {
                    borderBottom: '1px solid #aaa',
                },
                '&:before': {
                    borderBottom: `1px solid ${colors.greyLight}`,
                },
                '&:hover:not($disabled):not($focused):not($error):before': {
                    borderBottom: `1px solid ${colors.greyLight}`,
                },
            },
        },
        MuiMenuItem: {
            root: {
                paddingTop: spacingUnit,
                paddingBottom: spacingUnit,
                fontSize: '15px',
                '&$selected': {
                    backgroundColor: colors.accentSecondaryBackground,
                },
                '&:hover': {
                    backgroundColor: '#FAFAFA', // TODO: Make a theme color
                },
                [childSelectorMuiTypography]: {
                    fontSize: 'inherit',
                },
            },
        },
        MuiListItem: {
            button: {
                transitionDuration: '0s',
            },
        },
    },
};

export default theme;

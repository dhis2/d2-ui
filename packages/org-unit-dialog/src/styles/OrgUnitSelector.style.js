export default {
    orgUnitsContainer: {
        border: '1px solid #dedede',
        position: 'relative',

        tooltipContainer: {
            textAlign: 'center',
            position: 'absolute',
            bottom: 10,
            width: '100%',
        },

        tooltip: {
            display: 'inline-block',
            borderRadius: 3,
            background: '#535353',
            padding: 10,
            color: '#fff',

            link: {
                outline: 'none',
                marginLeft: 5,
                background: 'none',
                color: 'inherit',
                border: 'none',
                padding: 0,
                font: 'inherit',
                textDecoration: 'underline',
                cursor: 'pointer',
            },
        },
    },
    scrollableContainer: {
        index: {
            height: '400px',
            overflowY: 'auto',
        },
        overlayContainer: {
            position: 'relative',
            paddingLeft: 20,
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 10,
            backgroundColor: 'rgba(255,255,255, 0.8)',
        },
    },
    orgUnitTree: {
        selectedLabelStyle: {
            fontWeight: 400,
            fontSize: 14,
            color: 'inherit',
            position: 'relative',
            bottom: 2,
        },
        labelStyle: {
            fontSize: 14,
            fontWeight: 400,
            position: 'relative',
            bottom: 2,

            checkbox: {
                position: 'relative',
                bottom: 3,
            },
            folderIcon: {
                fontSize: 18,
                position: 'relative',
                top: 3,
                margin: '0 4px 0 2px',
                color: '#6eadff',
            },
            stopIcon: {
                color: '#a8a7a8',
                fontSize: 12,
                margin: '2px 3px 2px 2px',
                position: 'relative',
                top: 2,
            },
        },
        treeStyle: {
            marginLeft: 5,
            arrow: {
                color: '#a7a7a7',
                fontSize: 15,
            },
        },
    },
    userOrgUnits: {
        index: {
            background: '#F4F5F8',
            margin: '0 0px 10px',
        },
        checkbox: {
            fontSize: 16,
        },
        stopIcon: {
            position: 'relative',
            top: '4px',
            color: '#9e9e9e',
            fontSize: '15px',
            margin: '0 3px 0 -10px',
        },
        text: {
            color: '#000',
            position: 'relative',
            top: '3px',
        },
    },
    footer: {
        index: {
            marginTop: 10,
            width: '100%',
            position: 'relative',
        },
    },
};

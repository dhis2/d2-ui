export default function getApplicationMenu(options = {}) {
    return {
        name: 'applications',
        dataSource: '/dhis-web-commons/menu/getModules.action',
        options: {
            searchable: !options.isMobile,
            scrollable: true,
            extraLink: {
                text: 'more_applications',
                url: '../dhis-web-commons-about/modules.action',
            },
            shortCut: 'm',
        },
    };
}

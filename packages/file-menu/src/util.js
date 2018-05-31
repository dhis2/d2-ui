export const getFileTypeLabel = (fileType) => {
    switch (fileType) {
    case 'chart':
        return 'chart';
    case 'reportTable':
        return 'pivot table';
    case 'map':
        return 'map';
    case 'eventChart':
        return 'event chart';
    case 'eventReport':
        return 'event report';
    default:
        return 'file';
    }
};

import moment from 'moment';

export function formatDate(value = '', uiLocale = 'en') {
    if (typeof global.Intl !== 'undefined' && Intl.DateTimeFormat) {
        return new Intl.DateTimeFormat(uiLocale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(new Date(value));
    }

    return value.substr(0, 19).replace('T', ' ');
}

export function formatRelative(value, uiLocale) {
    const createdRelativeDate = moment(value, moment.ISO_8601).fromNow();

    return dateIsOver24Hours(createdRelativeDate) ? formatDate(value, uiLocale) : createdRelativeDate;
};

export function dateIsOver24Hours(relativeDate) {
    let shouldFormatToDate = false;
    ['day', 'year', 'month'].forEach(item => { 
        if(relativeDate.includes(item)) {
            shouldFormatToDate = true;
        }  
    }); 

    return shouldFormatToDate;
};

export const isEdited = (createdDate, lastUpdatedDate, locale) =>
    createdDate.substring(0, 19) !== lastUpdatedDate.substring(0, 19);
    
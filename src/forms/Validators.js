import isFinite from 'lodash.isfinite';

// Taken from http://blog.mattheworiordan.com/post/13174566389/url-regular-expression-for-links-with-or-without
// const urlRegExp = /^(([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?$/i;
const urlRegExp = /^https?:\/\/[^ ]*/i;

const relativeUrlRegExp = /[^ ]*/i;

// Taken from the HTML5 spec http://www.w3.org/TR/html5/forms.html#e-mail-state-(type=email)
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function isNull(value) {
    return value === null;
}

export function isUndefined(value) {
    return value === undefined;
}

export function isEmptyString(value) {
    return value === '';
}

export function isEmptyStringOrUndefined(value) {
    return isUndefined(value) || isEmptyString(value);
}

export function isRequired(value) {
    return Boolean(value) || 'field_required';
}

export function isUrl(value) {
    if (isEmptyStringOrUndefined(value)) {
        return true;
    }
    return urlRegExp.test(value) || 'field_should_be_a_url';
}

export function isRelativeUrl(value) {
    if (isEmptyStringOrUndefined(value)) {
        return true;
    }
    return relativeUrlRegExp.test(value.trim()) || 'field_should_be_a_relative_url';
}

export function isUrlArray(value) {
    if (isEmptyStringOrUndefined(value)) {
        return true;
    }
    return (value + '')
        .split('\n')
        .filter(v => v.trim().length > 0)
        .reduce((prev, curr) => {
            return prev === true && isUrl(curr) || isEmptyString(curr.trim());
        }, true) === true ? true : 'field_should_be_list_of_urls';
}

export function isEmail(value) {
    if (isEmptyStringOrUndefined(value)) {
        return true;
    }
    return emailRegExp.test(value) || 'field_should_be_an_email';
}

export function isNumber(value) {
    if (!value && value !== 0 ) {
        return true;
    }
    return isFinite(Number(value)) || 'field_should_be_a_number';
}

export const wordToValidatorMap = new Map([
    ['required', isRequired],
    ['url', isUrl],
    ['relative_url', isRelativeUrl],
    ['url_array', isUrlArray],
    ['number', isNumber],
    ['email', isEmail],
]);

export default {
    isRequired,
    isUrl,
    isNumber,
    isEmail,
    isEmptyString,
    isNull,
    isUndefined,
};

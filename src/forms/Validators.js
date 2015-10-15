import isFinite from 'lodash.isfinite';

// Taken from http://blog.mattheworiordan.com/post/13174566389/url-regular-expression-for-links-with-or-without
const urlRegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/i;

// Taken from the HTML5 spec http://www.w3.org/TR/html5/forms.html#e-mail-state-(type=email)
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function isRequired(value) {
    return Boolean(value) || 'field_required';
}

export function isUrl(value) {
    return urlRegExp.test(value) || 'field_should_be_an_url';
}

export function isEmail(value) {
    return emailRegExp.test(value) || 'field_should_be_an_email';
}

export function isNumber(value) {
    return isFinite(Number(value)) || 'field_should_be_a_number';
}

export const wordToValidatorMap = new Map([
    ['required', isRequired],
    ['url', isUrl],
    ['number', isNumber],
    ['email', isEmail],
]);

export default {
    isRequired,
    isUrl,
    isNumber,
    isEmail,
};

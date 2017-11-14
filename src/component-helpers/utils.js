/**
 * @module lib/utils
 */


/**
 * Function to create CSS class names
 *
 * @param {String} name The base name
 * @param {String} selector string to append to the base name
 * @returns String
 */
export const createClassName = (name = '', selector = '') =>
    selector ? `${name} ${name}-${selector}` : name;

/**
 * Returns an object containing properties where the omitProperties have been removed
 * @param {Object} props Object containing all the properties
 * @param {Array} omitProps List of property keys to not include in the properties
 * @returns {Object}
 */
export function getRestProps(props, omitProps) {
    return Object.keys(props).reduce((acc, key) => { // eslint-disable-line arrow-body-style
        return omitProps.indexOf(key) === -1 ? { ...acc, [key]: props[key] } : acc;
    }, {});
}

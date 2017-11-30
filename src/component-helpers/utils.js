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
 * Returns an object containing only the properties listed in propsWhiteList
 * @param {Object} props Object containing all the properties
 * @param {Array} propsWhiteList List of property keys to include in the properties
 * @returns {Object}
 */
export function getRestProps(props, propsWhiteList) {
    // eslint-disable-next-line arrow-body-style
    return Object.keys(props).reduce((acc, key) => {
        return propsWhiteList.indexOf(key) !== -1 ? { ...acc, [key]: props[key] } : acc;
    }, {});
}

/**
 * Remove last segment from OU path
 * @param path
 * @returns {string | *}
 */
export const removeLastPathSegment = path => path.substr(0, path.lastIndexOf('/'));

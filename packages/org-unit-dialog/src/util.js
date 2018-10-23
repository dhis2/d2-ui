/**
 * Remove last segment from OU path
 * @param path
 * @returns {string | *}
 */
const removeLastPathSegment = (path) => {
    // if root path, then return unprocessed path
    if (path.match(/\//g).length === 1) {
        return path;
    }

    return path.substr(0, path.lastIndexOf('/'));
};

export default removeLastPathSegment;

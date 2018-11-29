/**
 * Check if two arrays are identical
 * @param array1
 * @param array2
 */
export const arrayEquals = (array1, array2) => {
    if (!Array.isArray(array1) || !Array.isArray(array2)) {
        return false;
    }

    if (array1.length !== array2.length) {
        return false;
    }

    for (let i = 0; i < array1.length; ++i) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }

    return true;
};

export default {
    arrayEquals,
};

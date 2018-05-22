/**
 * Check if array has specific item by comparing
 * each array's element by id with the item
 * @param item
 * @param array
 * @returns bool
 */
export const arrayHasById = (item, array) => {
    return !!array.find(_item => _item.id === item.id);
};

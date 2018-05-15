export const arrayHasById = (item, array) => {
    return array.find(_item => _item.id === item.id);
};

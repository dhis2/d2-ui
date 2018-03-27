// import { createAction } from 'redux-actions';

export const TOGGLE_TAB = 'TOGGLE_TAB';
export const UPDATE_DATA_TAB = 'UPDATE_DATA_TAB';
export const UPDATE_AXES_TAB = 'UPDATE_AXES_TAB';
export const UPDATE_CHECKBOX = 'UPDATE_CHECKBOX';

export const updateTabIndex = tabID => ({
    type: TOGGLE_TAB,
    id: tabID,
});

export const updateTabContent = (fieldName, newValue) => ({
    type: UPDATE_DATA_TAB,
    fieldName,
    newValue,
});

export const updateCheckBoxContent = (fieldName, newValue) => ({
    type: UPDATE_CHECKBOX,
    fieldName,
    newValue,
});

export const updateAxesContent = (fieldName, newValue) => ({
    type: UPDATE_AXES_TAB,
    fieldName,
    newValue,
});

/* action creators
export const { toggleTab, updateDataTab, updateAxesTab, updateCheckbox } = createAction({
    TOGGLE_TAB: tabID => ({
        id: tabID
    }),
    UPDATE_DATA_TAB: (fieldName, newValue) => ({
        fieldName: fieldName,
        newValue: newValue
    }),
    UPDATE_AXES_TAB: (fieldName, newValue) => ({
        fieldName: fieldName,
        newValue: newValue
    }),
    UPDATE_CHECKBOX: (fieldName, newValue) => ({
        fieldName: fieldName,
        newValue: newValue
    })
}); */

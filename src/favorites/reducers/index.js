import { combineReducers } from 'redux';

export const actionTypes = {
    SET_FAVORITE_TYPE: 'SET_FAVORITE_TYPE',
    SET_ACTIONS_MENU_ANCHOR_EL: 'SET_ACTIONS_MENU_ANCHOR_EL',
    SET_SORT_ORDER: 'SET_SORT_ORDER',
    SET_SORT_COLUMN: 'SET_SORT_COLUMN',
    SET_DATA: 'SET_DATA',
    SET_SEARCH_VALUE: 'SET_SEARCH_VALUE',
    SET_FILTER_VALUE: 'SET_FILTER_VALUE',
    SET_CREATEDBY_VALUE: 'SET_CREATEDBY_VALUE',
    SET_PAGE: 'SET_PAGE',
    SET_ROWS_PER_PAGE: 'SET_ROWS_PER_PAGE',
    SET_TOTAL_RECORDS: 'SET_TOTAL_RECORDS',
    SET_SELECTED_FAVORITE: 'SET_SELECTED_FAVORITE',
    TOGGLE_LOADING: 'TOGGLE_LOADING',
    TOGGLE_DELETE_DIALOG: 'TOGGLE_DELETE_DIALOG',
    TOGGLE_RENAME_DIALOG: 'TOGGLE_RENAME_DIALOG',
    TOGGLE_SHARE_DIALOG: 'TOGGLE_SHARE_DIALOG',
    TOGGLE_ACTIONS_MENU: 'TOGGLE_ACTIONS_MENU',
};

const initialState = {
    isLoading: false,
    actions: {
        menuIsOpen: false,
        menuAnchorEl: null,
        remove: {
            dialogIsOpen: false,
        },
        rename: {
            dialogIsOpen: false,
        },
        share: {
            dialogIsOpen: false,
        },
        select: {
            favoriteModel: null,
        },
    },
    data: {
        records: [],
        totalRecords: 0,
        filtering: {
            type: 'chart',
            searchValue: '',
            createdByValue: 'all',
        },
        sorting: {
            order: 'asc',
            column: 'displayName',
        },
        pagination: {
            page: 0,
            rowsPerPage: 10,
        },
    },
};

const loading = (isLoading = initialState.isLoading, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_LOADING:
            return !isLoading;
        default:
            return isLoading;
    }
};

const actions = (state = initialState.actions, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_ACTIONS_MENU:
            return { ...state, menuIsOpen: !state.menuIsOpen };
        case actionTypes.SET_ACTIONS_MENU_ANCHOR_EL:
            return { ...state, menuAnchorEl: action.payload };
        case actionTypes.TOGGLE_SHARE_DIALOG:
            return {
                ...state,
                share: {
                    ...state.share,
                    dialogIsOpen: !state.share.dialogIsOpen,
                },
            };
        case actionTypes.TOGGLE_DELETE_DIALOG:
            return {
                ...state,
                remove: {
                    ...state.remove,
                    dialogIsOpen: !state.remove.dialogIsOpen,
                },
            };
        case actionTypes.TOGGLE_RENAME_DIALOG:
            return {
                ...state,
                rename: {
                    ...state.rename,
                    dialogIsOpen: !state.rename.dialogIsOpen,
                },
            };
        case actionTypes.SET_SELECTED_FAVORITE:
            return { ...state, select: { favoriteModel: action.payload } };
        default:
            return state;
    }
};

const sorting = (state = initialState.data.sorting, action) => {
    switch (action.type) {
        case actionTypes.SET_SORT_ORDER:
            return { ...state, order: action.payload };
        case actionTypes.SET_SORT_COLUMN:
            return { ...state, column: action.payload };
        default:
            return state;
    }
};

const data = (state = initialState.data, action) => {
    switch (action.type) {
        case actionTypes.SET_DATA:
            return { ...state, records: action.payload };
        case actionTypes.SET_TOTAL_RECORDS:
            return { ...state, totalRecords: action.payload };
        default:
            return state;
    }
};

const pagination = (state = initialState.data.pagination, action) => {
    switch (action.type) {
        case actionTypes.SET_PAGE:
            return { ...state, page: action.payload };
        case actionTypes.SET_ROWS_PER_PAGE:
            return { ...state, rowsPerPage: action.payload };
        default:
            return state;
    }
};

const filtering = (state = initialState.data.filtering, action) => {
    switch (action.type) {
        case actionTypes.SET_FAVORITE_TYPE:
            return { ...state, type: action.payload };
        case actionTypes.SET_CREATEDBY_VALUE:
            return { ...state, createdByValue: action.payload };
        case actionTypes.SET_SEARCH_VALUE:
            return { ...state, searchValue: action.payload };
        default:
            return state;
    }
};

export default combineReducers({
    loading,
    actions,
    pagination,
    sorting,
    data,
    filtering,
});

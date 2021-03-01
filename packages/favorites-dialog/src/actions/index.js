import log from 'loglevel';

import { actionTypes } from '../reducers';
import { CHART, PIVOT_TABLE } from '../visTypes';

export const toggleLoading = () => ({ type: actionTypes.TOGGLE_LOADING });

// select
export const selectFavorite = (model) => ({
    type: actionTypes.SET_SELECTED_FAVORITE,
    payload: model,
});

// d2
export const setD2 = (d2) => ({
    type: actionTypes.SET_D2,
    payload: d2,
});

export const setFavoriteType = (type) => ({
    type: actionTypes.SET_FAVORITE_TYPE,
    payload: type,
});

// data
export const setData = (data) => ({
    type: actionTypes.SET_DATA,
    payload: data,
});
export const setSortOrder = (order) => ({
    type: actionTypes.SET_SORT_ORDER,
    payload: order,
});
export const setSortColumn = (column) => ({
    type: actionTypes.SET_SORT_COLUMN,
    payload: column,
});
export const setSearchValue = (search) => ({
    type: actionTypes.SET_SEARCH_VALUE,
    payload: search,
});
export const setTotalRecords = (total) => ({
    type: actionTypes.SET_TOTAL_RECORDS,
    payload: total,
});
export const setCreatedByValue = (filter) => ({
    type: actionTypes.SET_CREATEDBY_VALUE,
    payload: filter,
});
export const setVisTypeValue = (filter) => ({
    type: actionTypes.SET_VIS_TYPE_VALUE,
    payload: filter,
});
export const searchData = (searchValue) => {
    //    const searchValue = event.target.value;

    return (dispatch, getState) => {
        //        dispatch(setSearchValue(searchValue));
        dispatch(fetchData());
    };
};
export const filterData = (filter, value) => {
    return (dispatch, getState) => {
        switch (filter) {
            case 'owner':
                dispatch(setCreatedByValue(value));
                break;
            case 'visType':
                dispatch(setVisTypeValue(value));
                break;
            default:
                break;
        }

        dispatch(fetchData());
        dispatch(setPage(0));
    };
};
export const sortData = (event, column) => {
    return (dispatch, getState) => {
        const state = getState();

        let order = 'desc';

        if (state.sorting.column !== column) {
            order = state.sorting.order;
        } else if (state.sorting.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? state.data.records.sort((a, b) =>
                      b[column] < a[column] ? -1 : 1
                  )
                : state.data.records.sort((a, b) =>
                      a[column] < b[column] ? -1 : 1
                  );

        dispatch(setSortOrder(order));
        dispatch(setSortColumn(column));
        dispatch(setData(data));
    };
};
export const fetchData = () => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch(toggleLoading());

        let favoriteModel = state.d2.models[state.filtering.type];

        if (state.filtering.createdByValue) {
            const currentUserId = state.d2.currentUser.id;

            switch (state.filtering.createdByValue) {
                case 'byme':
                    favoriteModel = favoriteModel
                        .filter()
                        .on('user.id')
                        .equals(currentUserId);
                    break;
                case 'byothers':
                    favoriteModel = favoriteModel
                        .filter()
                        .on('user.id')
                        .notEqual(currentUserId);
                    break;
                case 'all':
                default:
                    break;
            }
        }

        if (state.filtering.visTypeValue) {
            switch (state.filtering.visTypeValue) {
                case 'all':
                    break;
                case CHART:
                    favoriteModel = favoriteModel
                        .filter()
                        .on('type')
                        .notEqual(PIVOT_TABLE);
                    break;
                default:
                    favoriteModel = favoriteModel
                        .filter()
                        .on('type')
                        .equals(state.filtering.visTypeValue);
            }
        }

        if (state.filtering.searchValue) {
            favoriteModel = favoriteModel
                .filter()
                .on('displayName')
                .ilike(state.filtering.searchValue);
        }

        favoriteModel
            .list({
                fields:
                    'id,type,displayName,title,displayDescription,created,lastUpdated,user,access,href',
                order: 'name:asc',
                pageSize: state.pagination.rowsPerPage,
                page: state.pagination.page + 1,
            })
            .then((collection) => {
                dispatch(setTotalRecords(collection.pager.total));
                dispatch(setData(collection.toArray()));
                dispatch(toggleLoading());
            })
            .catch((error) => log.error('favorites: fetch error', error));
    };
};

// pagination
export const setPage = (page) => ({
    type: actionTypes.SET_PAGE,
    payload: page,
});
export const setRowsPerPage = (event) => ({
    type: actionTypes.SET_ROWS_PER_PAGE,
    payload: event.target.value,
});
export const changePage = (event, page) => {
    return (dispatch, getState) => {
        dispatch(setPage(page));
        dispatch(fetchData());
    };
};

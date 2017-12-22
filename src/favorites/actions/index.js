import { getInstance } from "d2/lib/d2";
import { actionTypes } from "../reducers";
import log from "loglevel";

export const toggleLoading = () => ({ type: actionTypes.TOGGLE_LOADING });

// actions context menu
export const toggleActionsMenu = () => ({
    type: actionTypes.TOGGLE_ACTIONS_MENU
});
export const setActionsMenuAnchorEl = el => ({
    type: actionTypes.SET_ACTIONS_MENU_ANCHOR_EL,
    payload: el
});

// select
export const selectFavorite = model => ({
    type: actionTypes.SET_SELECTED_FAVORITE,
    payload: model
});

// delete
export const toggleDeleteDialog = () => ({
    type: actionTypes.TOGGLE_DELETE_DIALOG
});
export const deleteFavorite = event => {
    return (dispatch, getState) => {
        const state = getState();
        const selectedFavorite = state.actions.selected.favoriteModel;

        if (selectedFavorite) {
            selectedFavorite
                .delete()
                .then(() => {
                    dispatch(toggleDeleteDialog());
                    dispatch(fetchData());
                })
                .catch(error => log.error("favorites: delete error", error));
        }
    };
};

// rename
export const toggleRenameDialog = () => ({
    type: actionTypes.TOGGLE_RENAME_DIALOG
});
export const renameFavorite = () => {
    return (dispatch, getState) => {
        const state = getState();
        const favoriteModel = state.actions.select.favoriteModel;
        const newName = state.actions.rename.newName;
        const newDescription = state.actions.rename.newDescription;
        let api;

        if (favoriteModel) {
            getInstance()
                .then(d2 => {
                    api = d2.Api.getApi();

                    // the whole model is required for validation
                    return d2.models[state.filtering.type].get(
                        favoriteModel.id
                    );
                })
                .then(model => {
                    model.name = newName;
                    model.description = newDescription;

                    model.validate().then(validationStatus => {
                        if (validationStatus.status === true) {
                            const payload = {};

                            if (newName) {
                                payload.name = newName;
                            }

                            if (newDescription) {
                                payload.description = newDescription;
                            }

                            if (payload.name || payload.description) {
                                api
                                    .request(
                                        "PATCH",
                                        model.href,
                                        JSON.stringify(payload)
                                    )
                                    .then(response => {
                                        dispatch(toggleRenameDialog());
                                        // refresh data
                                        dispatch(fetchData());
                                    })
                                    .catch(error => {
                                        log.error(
                                            "favorites: rename error",
                                            error
                                        );
                                        dispatch(toggleRenameDialog());
                                    });
                            }
                        }
                    });
                })
                .catch(error => {
                    log.error(
                        `favorites: favorite (${
                            favoriteModel.id
                        }) not found (${error})`
                    );
                });
        }
    };
};
export const setFormFieldValue = (field, value) => ({
    type: actionTypes.SET_FORM_FIELD_VALUE,
    payload: { field, value }
});
// share
export const toggleShareDialog = () => ({
    type: actionTypes.TOGGLE_SHARE_DIALOG
});
export const setFavoriteType = type => ({
    type: actionTypes.SET_FAVORITE_TYPE,
    payload: type
});

// data
export const setData = data => ({
    type: actionTypes.SET_DATA,
    payload: data
});
export const setSortOrder = order => ({
    type: actionTypes.SET_SORT_ORDER,
    payload: order
});
export const setSortColumn = column => ({
    type: actionTypes.SET_SORT_COLUMN,
    payload: column
});
export const setSearchValue = search => ({
    type: actionTypes.SET_SEARCH_VALUE,
    payload: search
});
export const setTotalRecords = total => ({
    type: actionTypes.SET_TOTAL_RECORDS,
    payload: total
});
export const setCreatedByValue = filter => ({
    type: actionTypes.SET_CREATEDBY_VALUE,
    payload: filter
});
export const searchData = event => {
    const searchValue = event.target.value;

    return (dispatch, getState) => {
        dispatch(setSearchValue(searchValue));
        dispatch(fetchData());
    };
};
export const filterData = event => {
    const createdByValue = event.target.value;

    return (dispatch, getState) => {
        dispatch(setCreatedByValue(createdByValue));
        dispatch(fetchData());
    };
};
export const sortData = (event, column) => {
    return (dispatch, getState) => {
        const state = getState();

        let order = "desc";

        if (state.sorting.column !== column) {
            order = state.sorting.order;
        } else if (state.sorting.order === "desc") {
            order = "asc";
        }

        const data =
            order === "desc"
                ? state.data.records.sort(
                      (a, b) => (b[column] < a[column] ? -1 : 1)
                  )
                : state.data.records.sort(
                      (a, b) => (a[column] < b[column] ? -1 : 1)
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

        getInstance()
            .then(d2 => {
                let favoriteModel = d2.models[state.filtering.type];

                if (state.filtering.createdByValue) {
                    const currentUserId = d2.currentUser.id;

                    switch (state.filtering.createdByValue) {
                        case "byme":
                            favoriteModel = favoriteModel
                                .filter()
                                .on("user.id")
                                .equals(currentUserId);
                            break;
                        case "byothers":
                            favoriteModel = favoriteModel
                                .filter()
                                .on("user.id")
                                .notEqual(currentUserId);
                            break;
                        case "all":
                        default:
                            break;
                    }
                }

                if (state.filtering.searchValue) {
                    favoriteModel = favoriteModel
                        .filter()
                        .on("displayName")
                        .ilike(state.filtering.searchValue);
                }

                return favoriteModel.list({
                    fields:
                        "id,displayName,title,displayDescription,created,lastUpdated,user,href",
                    order: "name:asc",
                    pageSize: state.pagination.rowsPerPage,
                    page: state.pagination.page + 1
                });
            })
            .then(collection => {
                dispatch(setTotalRecords(collection.pager.total));
                dispatch(setData(collection.toArray()));
                dispatch(toggleLoading());
            })
            .catch(error => log.error("favorites: fetch error", error));
    };
};

// pagination
export const setPage = page => ({
    type: actionTypes.SET_PAGE,
    payload: page
});
export const setRowsPerPage = event => ({
    type: actionTypes.SET_ROWS_PER_PAGE,
    payload: event.target.value
});
export const changePage = (event, page) => {
    return (dispatch, getState) => {
        dispatch(setPage(page));
        dispatch(fetchData());
    };
};

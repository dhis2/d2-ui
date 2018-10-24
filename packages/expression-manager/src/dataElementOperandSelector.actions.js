import { Observable } from 'rxjs';
import { getInstance } from 'd2';
import Pager from 'd2/lib/pager/Pager';
import { Action } from '@dhis2/d2-ui-core';

const createFakePager = response =>
    // Fake the modelCollection since dataElementOperands do not have a valid uid
    ({
        pager: new Pager(response.pager, {
            list(pager) {
                return getInstance()
                    .then((d2) => {
                        if (this.searchValue) {
                            return d2.Api.getApi().get('dataElementOperands', { page: pager.page, fields: 'id,displayName', filter: ['dataElement.domainType:eq:AGGREGATE', `name:ilike:${this.searchValue}`], totals: true });
                        }

                        return d2.Api.getApi().get('dataElementOperands', { page: pager.page, fields: 'id,displayName', totals: true, filter: ['dataElement.domainType:eq:AGGREGATE'] });
                    });
            },
        }),
        toArray() {
            return response.dataElementOperands;
        },
    })
;

export function subscribeDataElementActionsToStore(dataElementOperandSelectorActions, dataElementOperandStore) {
    const loadListSubscription = dataElementOperandSelectorActions.loadList.subscribe(() => {
        getInstance()
            .then(d2 => d2.Api.getApi().get('dataElementOperands', { fields: 'id,displayName', totals: true, filter: ['dataElement.domainType:eq:AGGREGATE'] }))
            .then(createFakePager)
            .then(collection => dataElementOperandStore.setState(collection));
    });

    const searchSubscription = dataElementOperandSelectorActions.search
        .debounceTime(500)
        .distinctUntilChanged((x, y) => x === y, action => action.data)
        .map((action) => {
            const searchPromise = getInstance()
                .then((d2) => {
                    if (action.data) {
                        return d2.Api.getApi().get('dataElementOperands', { fields: 'id,displayName', totals: true, filter: ['dataElement.domainType:eq:AGGREGATE', `name:ilike:${action.data}`] });
                    }
                    return d2.Api.getApi().get('dataElementOperands', { fields: 'id,displayName', totals: true, filter: ['dataElement.domainType:eq:AGGREGATE'] });
                })
                .then(createFakePager)
                .then(collection => ({
                    complete: action.complete,
                    error: action.error,
                    collection,
                }));

            return Observable.fromPromise(searchPromise);
        })
        .concatAll()
        .subscribe((actionResult) => {
            dataElementOperandStore.setState(actionResult.collection);
            actionResult.complete();
        });

    const getNextPageSubscription = dataElementOperandSelectorActions.getNextPage
        .subscribe((action) => {
            const [pager, searchValue] = action.data;
            pager.pagingHandler.searchValue = searchValue;

            pager.getNextPage()
                .then(createFakePager)
                .then(collection => ({
                    complete: action.complete,
                    error: action.error,
                    collection,
                }))
                .then((actionResult) => {
                    dataElementOperandStore.setState(actionResult.collection);
                    actionResult.complete();
                });
        });

    const getPreviousPageSubscription = dataElementOperandSelectorActions.getPreviousPage
        .subscribe((action) => {
            const [pager, searchValue] = action.data;
            pager.pagingHandler.searchValue = searchValue;

            pager.getPreviousPage()
                .then(createFakePager)
                .then(collection => ({
                    complete: action.complete,
                    error: action.error,
                    collection,
                }))
                .then((actionResult) => {
                    dataElementOperandStore.setState(actionResult.collection);
                    actionResult.complete();
                });
        });

    const subscriptions = [];

    subscriptions.push(loadListSubscription);
    subscriptions.push(searchSubscription);
    subscriptions.push(getNextPageSubscription);
    subscriptions.push(getPreviousPageSubscription);

    return subscriptions;
}

export function createDataElementOperandActions() {
    return Action.createActionsFromNames(['search', 'loadList', 'getNextPage', 'getPreviousPage']);
}

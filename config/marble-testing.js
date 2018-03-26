import {Observable} from 'rxjs/Observable';
import {SubscriptionLog} from 'rxjs/testing/SubscriptionLog';
import {ColdObservable} from 'rxjs/testing/ColdObservable';
import {HotObservable} from 'rxjs/testing/HotObservable';
import {observableToBeFn, subscriptionLogsToBeFn} from 'rxjs/testing/TestScheduler';

export function hot(marbles, values, error) {
    if (!global.rxTestScheduler) {
        throw 'tried to use hot() in async test';
    }
    return global.rxTestScheduler.createHotObservable.apply(global.rxTestScheduler, arguments);
}

export function cold(marbles, values, error) {
    if (!global.rxTestScheduler) {
        throw 'tried to use cold() in async test';
    }
    return global.rxTestScheduler.createColdObservable.apply(global.rxTestScheduler, arguments);
}

export function expectObservable(observable, unsubscriptionMarbles) {
    if (unsubscriptionMarbles === void 0) { unsubscriptionMarbles = null; }
    if (!global.rxTestScheduler) {
        throw 'tried to use expectObservable() in async test';
    }
    return global.rxTestScheduler.expectObservable.apply(global.rxTestScheduler, arguments);
}

export function expectSubscriptions(actualSubscriptionLogs) {
    if (!global.rxTestScheduler) {
        throw 'tried to use expectSubscriptions() in async test';
    }
    return global.rxTestScheduler.expectSubscriptions.apply(global.rxTestScheduler, arguments);
}

export function time(marbles) {
    if (!global.rxTestScheduler) {
        throw 'tried to use time() in async test';
    }
    return global.rxTestScheduler.createTime.apply(global.rxTestScheduler, arguments);
}

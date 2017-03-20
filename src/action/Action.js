import { isString } from 'lodash/fp';
import { Subject, Observable } from 'rxjs';
import log from 'loglevel';

/**
 * @class Action
 * @extends Rx.Subject
 *
 * @description
 * Action is an observable that can be subscribed to. When a action is executed all subscribers
 * to the action will receive a notification.
 *
 * @see https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/subjects/subject.md
 *
 */
const Action = {
    /**
     * @method create
     *
     * @param {String} [name=AnonymousAction]
     *
     * @description
     * A name can be provided that will be used to generate the Action.id Symbol identifier.
     */
    create(name = 'AnonymousAction') {
        const subject = Object.assign(
            (...actionArgs) => {
                log.trace(`Firing action: ${subject.id.toString()}`);

                return Observable.fromPromise(new Promise((resolve, reject) => {
                    subject.next({
                        // Pass one argument if there is just one else pass the arguments as an array
                        data: actionArgs.length === 1 ? actionArgs[0] : [...actionArgs],
                        // Callback to complete the action
                        complete: (...args) => {
                            resolve(...args);
                            log.trace(`Completed action: ${subject.id.toString()}`);
                        },
                        // Callback to error the action
                        error: (...args) => {
                            reject(...args);
                            log.debug(`Errored action: ${subject.id.toString()}`);
                        },
                    });
                }));
            },
            Observable.prototype,
            Subject.prototype
        );

        Object.defineProperty(subject, 'id', { value: Symbol(name) });

        Subject.call(subject);

        return subject;
    },

    /**
     * @method createActionsFromNames
     *
     * @param {String[]} [actionNames=[]] Names of the actions to create.
     * @param {String} [prefix] Prefix to prepend to all the action identifiers.
     *
     * @returns {{}}
     *
     * @description
     * Returns an object with the given names as keys and instanced of the Action class as actions.
     */
    createActionsFromNames(actionNames = [], prefix = undefined) {
        const actions = {};
        let actionPrefix = prefix;

        if (prefix && isString(prefix)) {
            actionPrefix = `${prefix}.`;
        } else {
            actionPrefix = '';
        }

        actionNames.forEach(actionName => {
            actions[actionName] = this.create(actionPrefix + actionName);
        });

        return actions;
    },
};

export default Action;

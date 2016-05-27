import Store from '../../store/Store';
import { appsMenuSource$ } from '../menu-sources';
import { Observable } from 'rx';

const headerBarSettingsStore = Store.create();

export function setGrid(grid) {
    headerBarSettingsStore.setState(
        Object.assign({}, headerBarSettingsStore.getState() || {}, {
            grid,
        })
    );
}

function getBodyWidth() {
    return document.querySelector('body').clientWidth;
}

function setBodyWidth(bodyWidth) {
    headerBarSettingsStore.setState(
        Object.assign({}, headerBarSettingsStore.getState() || {}, {
            bodyWidth,
        })
    );
}

Observable
    .fromEvent(window, 'resize')
    .debounce(200)
    .map(getBodyWidth)
    .startWith(getBodyWidth())
    .subscribe(setBodyWidth);

setGrid({ x: 3, y: 3 });

export default Observable.combineLatest(
    appsMenuSource$,
    headerBarSettingsStore,
    (appItems, headerBarSettings) => {
        return {
            ...headerBarSettings,
            gridOptions: [
                { x: 3, y: 3 },
                { x: 5, y: 4 },
                { x: 8, y: 3 },
                { x: Math.ceil(appItems.length / 4), y: 4 },
            ],
        };
    });

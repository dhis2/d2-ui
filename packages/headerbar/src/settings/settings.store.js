import { Observable } from 'rxjs';
import Store from 'd2-ui/lib/store/Store';
import { appsMenuSource$ } from '../utils/menu-sources';

const headerBarSettingsStore = Store.create();

export function setGrid(grid) {
    headerBarSettingsStore.setState(
        Object.assign({}, headerBarSettingsStore.getState() || {}, {
            grid,
        }),
    );
}

setGrid({ x: 3, y: 3 });

export default Observable.combineLatest(
    appsMenuSource$,
    headerBarSettingsStore,
    (appItems, headerBarSettings) => ({
        ...headerBarSettings,
        gridOptions: [
            { x: 3, y: 3 },
            { x: 5, y: 4 },
            { x: 8, y: 3 },
        ].concat(appItems ? [{ x: Math.ceil(appItems.length / 4), y: 4 }] : []),
    }));

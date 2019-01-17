const state = {
    boldMode: false,
    italicMode: false,
    element: null,
};

const markerMap = {
    italic: '_',
    bold: '*',
};

const toggleMode = (mode) => {
    const prop = `${mode}Mode`;

    state[prop] = !state[prop];
};

const insertMarkers = (mode, cb) => {
    toggleMode(mode);

    const marker = markerMap[mode] || null;
    if (!marker || !cb) {
        return;
    }

    const element = state.element;
    const { selectionStart, selectionEnd, value } = element;
    let newValue;

    if (selectionStart >= 0 && selectionStart === selectionEnd) {
        newValue = `${value}${marker}`;
    } else if (selectionStart >= 0) {
        newValue = [
            value.slice(0, selectionStart),
            value.slice(selectionStart, selectionEnd),
            value.slice(selectionEnd),
        ].join(marker);

        toggleMode(mode);
    }

    cb(newValue);
};

const convertCtrlKey = (event, cb) => {
    const { key, ctrlKey, metaKey } = event;

    const element = event.target;

    state.element = element;

    if (key === "b" && (ctrlKey || metaKey)) {
        insertMarkers("bold", cb);
    } else if (key === "i" && (ctrlKey || metaKey)) {
        insertMarkers("italic", cb);
    }
}

export default convertCtrlKey;

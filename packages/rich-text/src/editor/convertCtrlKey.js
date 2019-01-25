const state = {
    boldMode: false,
    italicMode: false,
    element: null,
};

const markerMap = {
    italic: '_',
    bold: '*',
};

const trim = str => {
    const leftSpaces = /^\s+/;
    const rightSpaces = /\s+$/;

    return str.replace(leftSpaces, '').replace(rightSpaces, '');
}

const toggleMode = (mode) => {
    const prop = `${mode}Mode`;

    state[prop] = !state[prop];
};

const insertMarkers = (mode, cb) => {
    const { selectionStart: start, selectionEnd: end, value } = state.element;
    const marker = markerMap[mode] || null;
    if (!marker || !cb || start < 0) {
        return;
    }

    toggleMode(mode);

    let newValue;
    let caretPos = end + 1;

    const padMarkers = text => {
        // is caret between two markers (i.e., "**" or "__")? Then do not add padding
        if (start === end && value.length && start > 0) {
            if ((value[start-1] === markerMap.bold && value[start] === markerMap.bold) ||
                (value[start-1] === markerMap.italic && value[start] === markerMap.italic)) {
                return text;
            }
        }

        if (value.length && start > 0 && value[start - 1] !== ' ') {
            text = ` ${text}`;
            ++caretPos;
        }

        if (value.length && end !== value.length && value[end] !== ' ') {
            text = `${text} `
        }

        return text;
    }

    if (start === end) { //no text
        const valueArr = value.split('');

        valueArr.splice(start, 0, padMarkers(`${marker}${marker}`));
        newValue = valueArr.join('');
    } else {
        const text = value.slice(start, end);
        const trimmedText = trim(text);

        // adjust caretPos based on trimmed text selection
        caretPos = caretPos - (text.length - trimmedText.length) + 1;

        newValue = [
            value.slice(0, start),
            padMarkers(`${marker}${trimmedText}${marker}`),
            value.slice(end),
        ].join('');

        toggleMode(mode);
    }

    cb(newValue, caretPos);
};

const convertCtrlKey = (event, cb) => {
    const { key, ctrlKey, metaKey } = event;

    const element = event.target;

    state.element = element;

    if (key === "b" && (ctrlKey || metaKey)) {
        event.preventDefault();
        insertMarkers("bold", cb);
    } else if (key === "i" && (ctrlKey || metaKey)) {
        event.preventDefault();
        insertMarkers("italic", cb);
    }
}

export default convertCtrlKey;

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
    const { selectionStart: start, selectionEnd: end, value } = state.element;
    const marker = markerMap[mode] || null;
    if (!marker || !cb || start < 0) {
        return;
    }

    toggleMode(mode);

    let newValue;
    let caretPos = end + 1;

    if (start === end) {
        const markersWithPadding = () => {
            let insertChars = `${marker}${marker}`;
    
            // add padding if needed
            if (value.length && value[start - 1] !== ' ') {
                insertChars = ` ${insertChars}`;
                ++caretPos;
            }
    
            if (value.length && end !== value.length && value[start] !== ' ') {
                insertChars = `${insertChars} `
            }
    
            return insertChars;
        }
    
        const valueArr = value.split('');
        valueArr.splice(start, 0, markersWithPadding());
        newValue = valueArr.join('');
    } else {
        const valueWithMarkers = val => {
            ++caretPos;

            let leading;
            let trailing;

            if (start === 0 || value[start - 1] === ' ') {
                leading = marker;
            } else {
                leading = ` ${marker}`;
                ++caretPos;
            }

            if (end === value.length || value[end] === ' ') {
                trailing = marker;
            } else {
                trailing = `${marker} `;
            }

            return `${leading}${val}${trailing}`;
        }

        newValue = [
            value.slice(0, start),
            valueWithMarkers(value.slice(start, end)),
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
        insertMarkers("bold", cb);
    } else if (key === "i" && (ctrlKey || metaKey)) {
        insertMarkers("italic", cb);
    }
}

export default convertCtrlKey;

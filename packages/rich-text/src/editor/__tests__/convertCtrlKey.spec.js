import convertCtrlKey from '../convertCtrlKey';

describe('convertCtrlKey', () => {
    it('does not trigger callback if no ctrl key', () => {
        const cb = jest.fn();
        const e = { key: 'j' };

        convertCtrlKey(e, cb);

        expect(cb).not.toHaveBeenCalled();
    });

    it('triggers callback with opening marker if ctrl key + "b"', () => {
        const cb = jest.fn();
        const e = {
            key: 'b',
            ctrlKey: true,
            target: {
                selectionStart: 0,
                selectionEnd: 0,
                value: '',
            },
        };

        convertCtrlKey(e, cb);

        expect(cb).toHaveBeenCalled();
        expect(cb).toHaveBeenCalledWith('*');
    });

    it('triggers callback with closing marker if ctrl key + "b" + value', () => {
        const cb = jest.fn();
        const e = {
            key: 'b',
            metaKey: true,
            target: {
                selectionStart: 4,
                selectionEnd: 4,
                value: '*abc',
            },
        };

        convertCtrlKey(e, cb);

        expect(cb).toHaveBeenCalled();
        expect(cb).toHaveBeenCalledWith('*abc*');
    });

    it('triggers callback with marker not at end of value', () => {
        const cb = jest.fn();
        const e = {
            key: 'b',
            metaKey: true,
            target: {
                selectionStart: 4,
                selectionEnd: 4,
                value: 'the quick brown fox',
            },
        };

        convertCtrlKey(e, cb);

        expect(cb).toHaveBeenCalled();
        expect(cb).toHaveBeenCalledWith('the *quick brown fox');
    });


    it('triggers callback with opening and closing marker when text is selected', () => {
        const cb = jest.fn();
        const e = {
            key: 'b',
            metaKey: true,
            target: {
                selectionStart: 8,
                selectionEnd: 12,
                value: 'rainbow dash is purple',
            },
        };

        convertCtrlKey(e, cb);

        expect(cb).toHaveBeenCalled();
        expect(cb).toHaveBeenCalledWith('rainbow *dash* is purple');
    })
});

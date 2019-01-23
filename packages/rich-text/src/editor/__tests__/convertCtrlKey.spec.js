import convertCtrlKey from '../convertCtrlKey';

describe('convertCtrlKey', () => {
    it('does not trigger callback if no ctrl key', () => {
        const cb = jest.fn();
        const e = { key: 'j' };

        convertCtrlKey(e, cb);

        expect(cb).not.toHaveBeenCalled();
    });

    describe('when ctrl key + "b" pressed', () => {
        it('triggers callback with open/close markers and caret pos in between', () => {
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
            expect(cb).toHaveBeenCalledWith('**', 1);
        });

        it('triggers callback with open/close markers and caret pos in between (end of text)', () => {
            const cb = jest.fn();
            const e = {
                key: 'b',
                ctrlKey: true,
                target: {
                    selectionStart: 22,
                    selectionEnd: 22,
                    value: 'rainbow dash is purple',
                },
            };
    
            convertCtrlKey(e, cb);
    
            expect(cb).toHaveBeenCalled();
            expect(cb).toHaveBeenCalledWith('rainbow dash is purple **', 24);
        });
    
        it('triggers callback with open/close markers mid-text with surrounding spaces (1)', () => {
            const cb = jest.fn();
            const e = {
                key: 'b',
                metaKey: true,
                target: {
                    selectionStart: 4, // caret located just before "quick"
                    selectionEnd: 4,
                    value: 'the quick brown fox',
                },
            };
    
            convertCtrlKey(e, cb);
    
            expect(cb).toHaveBeenCalled();
            expect(cb).toHaveBeenCalledWith('the ** quick brown fox', 5);
        });

        it('triggers callback with open/close markers mid-text with surrounding spaces (2)', () => {
            const cb = jest.fn();
            const e = {
                key: 'b',
                metaKey: true,
                target: {
                    selectionStart: 3, // caret located just after "the"
                    selectionEnd: 3,
                    value: 'the quick brown fox',
                },
            };
    
            convertCtrlKey(e, cb);
    
            expect(cb).toHaveBeenCalled();
            expect(cb).toHaveBeenCalledWith('the ** quick brown fox', 5);
        });

        describe('selected text', () => {
            it('triggers callback with open/close markers around text and caret pos after closing marker', () => {
                const cb = jest.fn();
                const e = {
                    key: 'b',
                    metaKey: true,
                    target: {
                        selectionStart: 5, // "ow da" is selected
                        selectionEnd: 10,
                        value: 'rainbow dash is purple',
                    },
                };
        
                convertCtrlKey(e, cb);
        
                expect(cb).toHaveBeenCalled();
                expect(cb).toHaveBeenCalledWith('rainb *ow da* sh is purple', 13);
            });
    
            it('triggers callback with open/close markers around text when starting at beginning of line', () => {
                const cb = jest.fn();
                const e = {
                    key: 'b',
                    metaKey: true,
                    target: {
                        selectionStart: 0, // "rainbow" is selected
                        selectionEnd: 7,
                        value: 'rainbow dash is purple',
                    },
                };
        
                convertCtrlKey(e, cb);
        
                expect(cb).toHaveBeenCalled();
                expect(cb).toHaveBeenCalledWith('*rainbow* dash is purple', 9);
            });
    
            it('triggers callback with open/close markers around text when ending at end of line', () => {
                const cb = jest.fn();
                const e = {
                    key: 'b',
                    metaKey: true,
                    target: {
                        selectionStart: 16, // "purple" is selected
                        selectionEnd: 22,
                        value: 'rainbow dash is purple',
                    },
                };
        
                convertCtrlKey(e, cb);
        
                expect(cb).toHaveBeenCalled();
                expect(cb).toHaveBeenCalledWith('rainbow dash is *purple*', 24);
            });
    
            it('triggers callback with open/close markers around word', () => {
                const cb = jest.fn();
                const e = {
                    key: 'b',
                    metaKey: true,
                    target: {
                        selectionStart: 8, // "dash" is selected
                        selectionEnd: 12,
                        value: 'rainbow dash is purple',
                    },
                };
        
                convertCtrlKey(e, cb);
        
                expect(cb).toHaveBeenCalled();
                expect(cb).toHaveBeenCalledWith('rainbow *dash* is purple', 14);
            });
        });
    
    
    });

    describe('when ctrl key + "i" pressed', () => {
        it('triggers callback with open/close italics markers and caret pos in between', () => {
            const cb = jest.fn();
            const e = {
                key: 'i',
                ctrlKey: true,
                target: {
                    selectionStart: 0,
                    selectionEnd: 0,
                    value: '',
                },
            };
    
            convertCtrlKey(e, cb);
    
            expect(cb).toHaveBeenCalled();
            expect(cb).toHaveBeenCalledWith('__', 1);
        });
    });
});

import { getMarkdown } from '../helper';

let cursorStart;
let cursorEnd;
let highlightedText = '';

const cases = {
    noInput: '',
    withoutSpace: 'sometexthere',
    withSpace:'some text here',
    withoutTrailingSpace: 'sometext here',
    withoutLeadingSpace: 'some texthere',
};


describe('markdown: helper fn ', () => {
    describe('with no input', () => {
        it('should return a placeholder with correct highlight values', () => {
            cursorStart = 0;
            cursorEnd = 0;
            const actualResult = getMarkdown('LINK', cases.noInput, cases.noInput, cursorStart, cursorEnd);
            
            const expectedResult = {
                text: 'http://<link-url>',
                highlightStart: 7,
                highlightEnd: 17,
            };
        
            expect(actualResult).toEqual(expectedResult);
        });
    });

    describe('without highlighted text', () => {
        it('should add necesarry whitespace and return a placeholder with correct highlight values', () => {
            cursorStart = cases.withSpace.length;
            cursorEnd = cases.withSpace.length;
            const actualResult = getMarkdown('BOLD', cases.withSpace, highlightedText, cursorStart, cursorEnd);
            
            const expectedResult = {
                text: 'some text here *bold text*',
                highlightStart: 16,
                highlightEnd: 25,
            };

            expect(actualResult).toEqual(expectedResult);
        });
    });

    describe('with highlighted text', () => {
        it('should add necesarry whitespace and return a link concatenated with the highlighted text', () => {
            cursorStart = 4;
            cursorEnd = 8;
            highlightedText = 'text';
            const actualResult = getMarkdown('ITALIC', cases.withoutSpace, highlightedText, cursorStart, cursorEnd);
            
            const expectedResult = {
                text: 'some _text_ here',
                highlightStart: 6,
                highlightEnd: 10,
            };

            expect(actualResult).toEqual(expectedResult);
        })
    });
});

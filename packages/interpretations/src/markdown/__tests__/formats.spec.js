import {
    insertItalicWithSpace,
    insertItalicWithoutSpace,
    insertBoldWithSpace,
    insertBoldWithoutSpace
} from '../formats'

describe('insertItalicWithSpace', () => {

    it('sets placeholder text with no input', () => {
        expect(insertItalicWithSpace('', 0))
            .toEqual({"highlightEnd": 13, "highlightStart": 2, "text": " _italic text_"})
    })
    
    it('sets placeholder text with input', () => {
        expect(insertItalicWithSpace('here is the input', 4))
            .toEqual({"highlightEnd": 17, "highlightStart": 6, "text": "here _italic text_"})
    })
})


describe('insertItalicWithoutSpace', () => {

    it('sets placeholder text with no input', () => {
        expect(insertItalicWithoutSpace('', 0))
            .toEqual({"highlightEnd": 12, "highlightStart": 1, "text": "_italic text_"})
    })
    
    it('sets placeholder text with input', () => {
        expect(insertItalicWithoutSpace('here is the input', 4))
            .toEqual({"highlightEnd": 16, "highlightStart": 5, "text": "here_italic text_"})
    })
})


describe('insertBoldWithSpace', () => {

    it('sets placeholder text with no input', () => {
        expect(insertBoldWithSpace('', 0))
            .toEqual({"highlightEnd": 11, "highlightStart": 2, "text": " *bold text*"})
    })
    
    it('sets placeholder text with input', () => {
        expect(insertBoldWithSpace('here is the input', 4))
            .toEqual({"highlightEnd": 15, "highlightStart": 6, "text": "here *bold text*"})
    })
})


describe('insertBoldWithoutSpace', () => {

    it('sets placeholder text with no input', () => {
        expect(insertBoldWithoutSpace('', 0))
            .toEqual({"highlightEnd": 10, "highlightStart": 1, "text": "*bold text*"})
    })
    
    it('sets placeholder text with input', () => {
        expect(insertBoldWithoutSpace('here is the input', 4))
            .toEqual({"highlightEnd": 14, "highlightStart": 5, "text": "here*bold text*"})
    })
})
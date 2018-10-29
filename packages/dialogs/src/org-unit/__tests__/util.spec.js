import removeLastPathSegment from '../util';

describe('lastPathSegment', () => {
    it('handles a root path', () => {
        const path = '/'
        expect(removeLastPathSegment(path)).toEqual(path);
    });

    it('handles a path with single segment', () => {
        const path = '/abc';
        expect(removeLastPathSegment(path)).toEqual(path);
    });

    it('handles a path with multiple segments', () => {
        const path = 'ABC/def/GHI'
        expect(removeLastPathSegment(path)).toEqual('ABC/def');
    });
})

import IconPicker from '../IconPicker.component';

describe('IconPicker index', () => {
    it('should export the IconPicker as default', () => {
        expect(IconPicker).toBe(require('../').default);
    });
});

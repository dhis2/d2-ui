import IconPicker from '../../src/icon-picker/IconPicker.component';

describe('IconPicker index', () => {
    it('should export the IconPicker as default', () => {
        expect(IconPicker).toBe(require('../../src/icon-picker').default);
    });
});

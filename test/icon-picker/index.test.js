import IconPicker from '../../src/icon-picker/IconPicker.component';

describe('IconPicker index', () => {
    it('should export the IconPicker as default', () => {
        expect(IconPicker).to.equal(require('../../src/icon-picker').default);
    });
});

import * as helpers from '../../src/component-helpers';

describe('component-helpers', () => {
    it('should have addContext on the helpers object', () => {
        expect(helpers.addContext).to.be.a('function');
    });

    it('should have addD2Context on the helpers object', () => {
        expect(helpers.addD2Context).to.be.a('function');
    });
});

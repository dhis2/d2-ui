import Auth from '../../src/auth/Auth.mixin';

describe('Auth mixin', () => {
    beforeEach(() => {
        Auth.context = {
            d2: {
                currentUser: {
                    canCreate: jest.fn().mockReturnValue(true),
                    canCreatePublic: jest.fn().mockReturnValue(false),
                },
                models: {
                    dataElement: {
                        name: 'dataElement',
                    },
                },
            },
        };
    });

    it('should define d2 on the context', () => {
        expect(Auth.contextTypes.d2).not.toBe(undefined);
    });

    it('should have a user property', () => {
        expect(Auth.getCurrentUser()).not.toBe(undefined);
    });

    it('should have a canCreate method on the user object', () => {
        expect(typeof Auth.getCurrentUser().canCreate).toBe('function');
    });

    it('should have a canCreate method on the user object', () => {
        expect(typeof Auth.getCurrentUser().canCreatePublic).toBe('function');
    });

    describe('getModelDefinitionByName', () => {
        it('should be a method', () => {
            expect(typeof Auth.getModelDefinitionByName).toBe('function');
        });

        it('should return the model definition on D2', () => {
            expect(Auth.getModelDefinitionByName('dataElement')).toBe(Auth.context.d2.models.dataElement);
        });

        it('should return undefined if the definition does not exist', () => {
            expect(Auth.getModelDefinitionByName('user')).toBe(undefined);
        });
    });
});

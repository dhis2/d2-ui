import Auth from '../../src/auth/Auth.mixin';

describe('Auth mixin', () => {
    beforeEach(() => {
        Auth.context = {
            d2: {
                currentUser: {
                    canCreate: stub().returns(true),
                    canCreatePublic: stub().returns(false),
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
        expect(Auth.contextTypes.d2).to.not.be.undefined;
    });

    it('should have a user property', () => {
        expect(Auth.getCurrentUser()).to.not.be.undefined;
    });

    it('should have a canCreate method on the user object', () => {
        expect(Auth.getCurrentUser().canCreate).to.be.a('function');
    });

    it('should have a canCreate method on the user object', () => {
        expect(Auth.getCurrentUser().canCreatePublic).to.be.a('function');
    });

    describe('getModelDefinitionByName', () => {
        it('should be a method', () => {
            expect(Auth.getModelDefinitionByName).to.be.a('function');
        });

        it('should return the model definition on D2', () => {
            expect(Auth.getModelDefinitionByName('dataElement')).to.equal(Auth.context.d2.models.dataElement);
        });

        it('should return undefined if the definition does not exist', () => {
            expect(Auth.getModelDefinitionByName('user')).to.be.undefined;
        });
    });
});

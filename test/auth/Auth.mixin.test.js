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
        expect(Auth.currentUser).to.not.be.undefined;
    });

    it('should have a canCreate method on the user object', () => {
        expect(Auth.currentUser.canCreate).to.be.a('function');
    });

    it('should have a canCreate method on the user object', () => {
        expect(Auth.currentUser.canCreatePublic).to.be.a('function');
    });

    it('should not be able to set the currentUser', () => {
        expect(() => Auth.currentUser = 'Override').to.throw();
    });
});

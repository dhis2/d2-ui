import Translate from '../../src/i18n/Translate.mixin';

describe('Translate mixin', () => {
    beforeEach(() => {
        Translate.context = {
            d2: {
                i18n: {
                    getTranslation: stub().returns('Navn'),
                },
            },
        };
    });

    it('should have a getTranslation method', () => {
        expect(Translate.getTranslation).to.be.a('function');
    });

    it('should define d2 on the context', () => {
        expect(Translate.contextTypes.d2).to.not.be.undefined;
    });

    it('should call the d2 translation service for the translation', () => {
        Translate.getTranslation('name');

        expect(Translate.context.d2.i18n.getTranslation).to.be.calledWith('name');
    });

    it('should pass the ', () => {
        expect(Translate.getTranslation('name')).to.equal('Navn');
    });
});

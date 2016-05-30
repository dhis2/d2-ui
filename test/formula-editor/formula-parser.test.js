import { formulaParser } from '../../src/formula-editor/formula-parser';

describe('Formula parser', () => {
    it('should be a function', () => {
        expect(formulaParser).to.be.a('function');
    });

    it('should return an array when an empty formula is given', () => {
        expect(formulaParser('')).to.deep.equal([]);
    });

    it('should return an empty array when no formula is given', () => {
        expect(formulaParser()).to.deep.equal([]);
    });

    it('should return the expected parts for the passed formula', () => {
        expect(formulaParser('#{cYeuwXTCPkU.pq2XI5kz2BY}+#{cYeuwXTCPkU.PT59n8BQbqM}')).to.deep.equal([
            {
                displaySubstitute: 'A',
                entityType: 'dataElement',
                value: '#{cYeuwXTCPkU.pq2XI5kz2BY}',
                index: 0,
            },
            {
                entityType: 'operator',
                value: '+',
                index: 26,
            },
            {
                displaySubstitute: 'B',
                entityType: 'dataElement',
                value: '#{cYeuwXTCPkU.PT59n8BQbqM}',
                index: 27,
            },
        ]);
    });

    it('should return the expected part for a simple indicator expression', () => {
        expect(formulaParser('#{fbfJHSPpUQD}')).to.deep.equal([{
            displaySubstitute: 'A',
            entityType: 'dataElement',
            value: '#{fbfJHSPpUQD}',
            index: 0,
        }]);
    });

    it('should go to AA style identifiers when the alphabet is used up', () => {
        const parsedFormula = formulaParser(`
            #{cYeuwXTCPkU.pq2XI5kz2BY}+#{cYeuwXTCPkU.PT59n8BQbqM}
            #{cYeuwXTCPkU.pq2XI5kz2BY}+#{cYeuwXTCPkU.PT59n8BQbqM}
            #{cYeuwXTCPkU.pq2XI5kz2BY}+#{cYeuwXTCPkU.PT59n8BQbqM}
            #{cYeuwXTCPkU.pq2XI5kz2BY}+#{cYeuwXTCPkU.PT59n8BQbqM}
            #{cYeuwXTCPkU.pq2XI5kz2BY}+#{cYeuwXTCPkU.PT59n8BQbqM}
            #{cYeuwXTCPkU.pq2XI5kz2BY}+#{cYeuwXTCPkU.PT59n8BQbqM}
            #{cYeuwXTCPkU.pq2XI5kz2BY}+#{cYeuwXTCPkU.PT59n8BQbqM}
            #{cYeuwXTCPkU.pq2XI5kz2BY}+#{cYeuwXTCPkU.PT59n8BQbqM}
            #{cYeuwXTCPkU.pq2XI5kz2BY}+#{cYeuwXTCPkU.PT59n8BQbqM}
            #{cYeuwXTCPkU.pq2XI5kz2BY}+#{cYeuwXTCPkU.PT59n8BQbqM}
            #{cYeuwXTCPkU.pq2XI5kz2BY}+#{cYeuwXTCPkU.PT59n8BQbqM}
            #{cYeuwXTCPkU.pq2XI5kz2BY}+#{cYeuwXTCPkU.PT59n8BQbqM}
            #{cYeuwXTCPkU.pq2XI5kz2BY}+#{cYeuwXTCPkU.PT59n8BQbqM}
            #{cYeuwXTCPkU.pq2XI5kz2BY}+#{cYeuwXTCPkU.PT59n8BQbqM}
            #{cYeuwXTCPkU.pq2XI5kz2BY}+#{cYeuwXTCPkU.PT59n8BQbqM}
        `);

        expect(parsedFormula[parsedFormula.length - 1]).to.deep.equal({
            displaySubstitute: 'AD',
            entityType: 'dataElement',
            value: '#{cYeuwXTCPkU.PT59n8BQbqM}',
            index: 964,
        });
    });

    it('should include brackets when they are in the formula', () => {
        const parsedFormula = formulaParser('(#{cYeuwXTCPkU.pq2XI5kz2BY} + 2) - #{cYeuwXTCPkU.PT59n8BQbqM}');

        expect(parsedFormula[0]).to.deep.equal({
            entityType: 'bracket',
            value: '(',
            index: 0,
        });
    });
});


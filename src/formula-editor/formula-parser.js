import { curry } from 'lodash/fp';
import { compose } from 'lodash/fp';
import { map } from 'lodash/fp';
import { sortBy } from 'lodash/fp';

// parseFormula :: regexp -> formula -> [object]
const parseFormula = curry((regexp, formula) => {
    const matches = [];
    let match;

    while (match = regexp.exec(formula)) {
        matches.push(match);
    }

    return matches;
});

// extractDataElements :: string -> [object]
const extractDataElements = parseFormula(/(#{[A-z0-9]{11}\.?(?:[A-z0-9]{11})?})/g);
// extractOperators :: string -> [object]
const extractOperators = parseFormula(/([+\-/\*]|\[days\])/g);
// extractBrackets :: string -> [object]
const extractBrackets = parseFormula(/([\(\)])/g);
// createFormulaPartObject :: string -> object -> object
const createFormulaPartObject = curry((entityType, match) => ({
    entityType,
    value: match[1],
    index: match.index,
}));

function getCharForIndex(index) {
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    if (index < 26) {
        return alphabet[index];
    }

    return getCharForIndex(Math.floor(index / 26) - 1) + getCharForIndex((index % 26));
}

const addVariableNames = parts => parts.map((part, index) => Object.assign({}, part, { displaySubstitute: getCharForIndex(index) }));

const extractFormulaParts = formula => [].concat(
    compose(addVariableNames, map(createFormulaPartObject('dataElement')), extractDataElements)(formula),
    compose(map(createFormulaPartObject('operator')), extractOperators)(formula),
    compose(map(createFormulaPartObject('bracket')), extractBrackets)(formula),
);

const getOrderedFormulaParts = compose(sortBy('index'), extractFormulaParts);


export function formulaParser(formula) {
    if (!formula) { return []; }

    return getOrderedFormulaParts(formula);
}

const data = require('./data/powerball_res.json');
const comboGenerator = require('./combo.generator');
const { getProbabilityFromPattern, getNumEven } = require('./pattern.analyser');
const { maxPositions } = require('./config');
const pastResults = data.map(row => row.balls);

const combos = comboGenerator.generateCombinations(data, maxPositions);

// filter out ones with duplicates
const uniqueCombo = combos.filter(combo => {
    const pattern = combo.pattern.split(',');
    return new Set(pattern).size === pattern.length
});

// pattern analysis
const patternProb = getProbabilityFromPattern(pastResults, maxPositions);

for (const combo of uniqueCombo) {
    const even = getNumEven(combo.pattern);
    const patternWeight = patternProb[even];
    combo.weight *= patternWeight;
}

const sortedCombo = uniqueCombo.sort((a, b) => {
    return b.weight - a.weight;
});

console.log(sortedCombo.splice(0, 10));


const Node = require('./models/node');

function getHistogram(data, maxPositions) {
    const posHistogram = new Array(maxPositions); // array symbolising position of ball
    // create histogram mapping value -> occurrence for each position
    for (const row of data) {
        const balls = row.balls.split(',');
        for (let i = 0; i < balls.length; i++) {
            let histogram = posHistogram[i];
            const num = balls[i];
            if (!histogram) {
                histogram = {
                    [num]: 1
                };
            } else if (histogram[num]) {
                histogram[num]++;
            } else {
                histogram[num] = 1;
            }

            posHistogram[i] = histogram;
        }
    }
    return posHistogram;
}

function toArray (histogram, draws) {
    return Object.keys(histogram)
        .map(key => new Node(key,histogram[key] / draws))
        .sort((a, b) => {
            // descending
            return b.count - a.count;
        });
}

function generateCombinations (data, maxPositions) {
    const histogram = getHistogram(data, maxPositions);
    const combinations = Array(maxPositions);
    // turn to nodes
    for (let i = 0; i < maxPositions; i++) {
        const hist = toArray(histogram[i], data.length);
        // restricted to top 10 to stop heap from being overfilled
        // TODO find a way to get combo without heap filling
        combinations[i] = hist.length <= 10 ? hist : hist.splice(0, 10);
    }
    // assign children
    for (let i = 0; i < combinations.length - 1; i++) {
        for (let j = 0; j < combinations[i].length; j++) {
            combinations[i][j].children = combinations[i+1];
        }
    }
    let allCombo = [];
    for (const node of combinations[0]) {
        allCombo = allCombo.concat(node.getCombination())
    }
    return allCombo.sort((a, b) => {
        // descending
        return b.weight - a.weight;
    });
}

module.exports = {
    generateCombinations
}

class Node {
    constructor(value, count) {
        this.value = value;
        this.count = count;
        this.children = [];
        this.combination = undefined;
    }

    getCombination = () => {
        if (this.combination) {
            return this.combination;
        }
        if (this.children.length === 0) {
            return [{pattern: this.value, weight: this.count}];
        }
        this.combination = [];
        for (const child of this.children) {
            const childComb = child.getCombination();
            for (const subCom of childComb) {
                const com = {
                    pattern: `${this.value},${subCom.pattern}`,
                    weight: subCom.weight * this.count
                }
                this.combination.push(com);
            }
        }
        return this.combination;
    };
}

module.exports = Node;

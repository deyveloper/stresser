const randomstring = require('randomstring');

class Insert {
    constructor(db, collectionName = 'stresstest', data = null, dataLength = 140000, loops = 100) {
        if (!data) {
            data = randomstring.generate({
              length: dataLength,
              charset: 'alphabetic'
            });
        };

        this.db = db;
        this.collectionName = collectionName;
        this.data = data;
        this.loops = loops;
    };

    async do() {
        this.collection = await this.db.collection(this.collectionName);
        console.time(`Insert|Data: ${this.data.length}|Loops: ${this.loops}`);
        for (let index = 0; index < this.loops; index++) {
            await this.collection.insertOne({ 'value': this.data });
        };
        console.timeEnd(`Insert|Data: ${this.data.length}|Loops: ${this.loops}`);
        return this.collection;
    };
};

module.exports = Insert;
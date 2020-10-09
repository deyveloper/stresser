const randomstring = require('randomstring');

class Delete {
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
        let ids = [];
        for (let index = 0; index < this.loops; index++) {
            const curr = await this.collection.insertOne({ 'value': this.data });
            ids.push(curr._id);
        };
        
        console.time(`Removing|Data: ${this.data.length}|Loops: ${this.loops}`);
        ids.forEach((currId) => {
            this.collection.deleteOne({ _id: currId });
        });
        console.timeEnd(`Removing|Data: ${this.data.length}|Loops: ${this.loops}`);
        return this.collection;
    };
};

module.exports = Delete;
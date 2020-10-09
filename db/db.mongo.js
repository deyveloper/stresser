const { MongoClient } = require("mongodb");

class Mongo {
    constructor() {
    };

    async connect() {
        this.uri = `${process.env.MONGO_PROTOCOL}://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/`;
        this.client = new MongoClient(this.uri, {
             useUnifiedTopology: true
        });
        await this.client.connect();
        this.db = await this.client.db('stress');
        console.log(`Connected to db ${this.uri}.`);
        return this.db;
    };
};

module.exports = Mongo;
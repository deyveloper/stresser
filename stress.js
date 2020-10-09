require('dotenv').config();
const { mongodb } = require('./db');
const tstress = require('./tstress');

const mongo = new mongodb();
Promise.all([(mongo.connect())])
    .then(() => {
        // Mongo tests
        Object.keys(tstress.TMongo)
            .forEach((test) => {
                new tstress.TMongo[test](mongo.db).do();
            });       
    });



process.on('SIGTERM', () => {
    console.log('\nGood luck :)');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\nGood luck :)');
    process.exit(0);
});
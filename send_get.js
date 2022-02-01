const { MongoClient } = require('mongodb');
const csvtojson = require("csvtojson");
const mongodb = require("mongodb").MongoClient;
const readline = require('readline-sync')
const name = readline.question('csv:')


// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'Project';

csvtojson()
    .fromFile(name)
    .then(csvData => {
        console.log(csvData);

        mongodb.connect(
            url,
            (err, client) => {
                if (err) throw err;

                client
                    .db("Project")
                    .collection("documents")
                    .insertMany(csvData, (err, res) => {
                        if (err) throw err;
                        client.close();
                    });
            }
        );
    });
const child_process = require('child_process');
const util = require('util');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
// pingtest.js
const PingResult = require('../models/Ping');


const exec = util.promisify(child_process.exec);

const mongoUrl = 'mongodb+srv://erijbenamor6:adminadmin@erijapi.9b6fc2g.mongodb.net/Node-API?retryWrites=true&w=majority'; // Update with your MongoDB connection string
const dbName = 'Node-API'; // Update with your database name
const collectionName = 'pingResults'; // Update with your collection name

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

async function pingAndStore(hostname) {
    if (!/^[a-zA-Z0-9.-]+$/.test(hostname)) {
        console.error('Invalid hostname');
        return;
    }

    try {
        const { stdout, stderr } = await exec(`ping ${hostname}`);
        console.log('stderr: ', stderr);
        console.log('stdout: ', stdout);

        const lines = stdout.split('\n');

        // Récupérer les informations pertinentes
        const sizeMatch = /(\d+) octets/g.exec(lines[1]);
        const tempsMatch = /temps=(\d+) ms/g.exec(lines[2]);
        const ttlMatch = /TTL=(\d+)/g.exec(lines[2]);

        // Créer l'objet JSON
        const pingResult = new PingResult({
            size: sizeMatch ? parseInt(sizeMatch[1]) : null,
            temps: tempsMatch ? parseInt(tempsMatch[1]) : null,
            TTL: ttlMatch ? parseInt(ttlMatch[1]) : null,
            timestamp: new Date(),
        });

        console.log('Ping Result:', pingResult);

        await pingResult.save();

    } catch (err) {
        console.error('Error:', err.message);
    }
}

// Set interval to ping every 2 minutes
setInterval(() => {
    pingAndStore('www.google.com');
}, 10 * 60 * 1000); // 1 minute in milliseconds


module.exports = pingAndStore;


/*const exec = require("child_process").exec;
const fs = require("fs");

const hosts = ["104.21.72.230"];
const replyFromLocale = "Reply from";

const promises = [];

hosts.forEach(host => {
    promises.push(new Promise((resolve, reject) => {
        exec(`ping -n 1 -w 1000 ${host}`, (err, stdout, stderr) => {
            // successfull response: Reply from 142.250.186.78: bytes=32 time=10ms TTL=128
            // unsuccessfull:        Reply from 192.168.1.3: Destination host unreachable
            // host unreachable:     Ping request could not find host
            let status = "offline";
            let output = stdout.toString();
            let replyFromIndex = output.indexOf(replyFromLocale);
            if (replyFromIndex > 0 && output.substring(replyFromIndex).toUpperCase().indexOf("BYTES") > 0) {
                status = "online"
            }
            resolve(new Date().toISOString() + " " + host + " " + status)
        })
    }))
})

Promise.all(promises).then((results) => {
    fs.writeFile("ping-results.txt", results.join("\n"), (err) => {
        if (err) { console.log(err); }
    })
})
module.exports= hosts;

/*const ping = require('ping');

// Fonction pour effectuer un ping
const performPing = async (ipAddress) => {
  try {
    const result = await ping.promise.probe(ipAddress);
    console.log(`Ping result: ${result.alive}`);
    // Traitez le résultat du ping selon vos besoins
  } catch (error) {
    console.error(`Erreur lors du ping : ${error.message}`);
    // Gérez les erreurs de ping
  }
};

module.exports = { performPing };*/
/*const child_process = require('child_process');
const util = require('util');
const { MongoClient } = require('mongodb');

const exec = util.promisify(child_process.exec);

const mongoUrl = 'mongodb+srv://erijbenamor6:adminadmin@erijapi.9b6fc2g.mongodb.net/Node-API?retryWrites=true&w=majority'; // Update with your MongoDB connection string
const dbName = 'Node-API'; // Update with your database name

async function pingAndStore(hostname) {
  if (!/^[a-zA-Z0-9.-]+$/.test(hostname)) {
    console.error('Invalid hostname');
    return;
  }

  try {
    const { stdout, stderr } = await exec(`ping ${hostname}`);
    console.log('stderr: ', stderr);
    console.log('stdout: ', stdout);

    const lines = stdout.split('\n');

    // Récupérer les informations pertinentes
    const sizeMatch = /(\d+) octets/g.exec(lines[1]);
    const tempsMatch = /temps=(\d+) ms/g.exec(lines[2]);
    const ttlMatch = /TTL=(\d+)/g.exec(lines[2]);

    // Créer l'objet JSON
    const pingResult = {
      size: sizeMatch ? parseInt(sizeMatch[1]) : null,
      temps: tempsMatch ? parseInt(tempsMatch[1]) : null,
      TTL: ttlMatch ? parseInt(ttlMatch[1]) : null,
    };

    console.log('Ping Result:', pingResult);

    await storepingResult(pingResult);

  } catch (err) {
    console.error('Error:', err.message);
  }
}

async function storepingResult(result) {
  const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to the database');

    const db = client.db(dbName);
    const pingResultsCollection = db.collection('pingResults');

    await pingResultsCollection.insertOne(result);
    console.log('Ping result stored in MongoDB');

  } catch (err) {
    console.error('Error storing ping result in MongoDB:', err.message);

  } finally {
    await client.close();
    console.log('Disconnected from the database');
  }
}

pingAndStore('fleskconsulting.com');

 

/*const exec = require("child_process").exec;
const fs = require("fs");

const hosts = ["104.21.72.230"];
const replyFromLocale = "Reply from";

const promises = [];

hosts.forEach(host => {
    promises.push(new Promise((resolve, reject) => {
        exec(`ping -n 1 -w 1000 ${host}`, (err, stdout, stderr) => {
            // successfull response: Reply from 142.250.186.78: bytes=32 time=10ms TTL=128
            // unsuccessfull:        Reply from 192.168.1.3: Destination host unreachable
            // host unreachable:     Ping request could not find host
            let status = "offline";
            let output = stdout.toString();
            let replyFromIndex = output.indexOf(replyFromLocale);
            if (replyFromIndex > 0 && output.substring(replyFromIndex).toUpperCase().indexOf("BYTES") > 0) {
                status = "online"
            }
            resolve(new Date().toISOString() + " " + host + " " + status)
        })
    }))
})

Promise.all(promises).then((results) => {
    fs.writeFile("ping-results.txt", results.join("\n"), (err) => {
        if (err) { console.log(err); }
    })
})
module.exports= hosts;

/*const ping = require('ping');

// Fonction pour effectuer un ping
const performPing = async (ipAddress) => {
  try {
    const result = await ping.promise.probe(ipAddress);
    console.log(`Ping result: ${result.alive}`);
    // Traitez le résultat du ping selon vos besoins
  } catch (error) {
    console.error(`Erreur lors du ping : ${error.message}`);
    // Gérez les erreurs de ping
  }
};

module.exports = { performPing };*/
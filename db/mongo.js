const { ip, port, dbName } = require('./config.json');

const { MongoClient } = require('mongodb');

function init(callback) {
  const url = `mongodb://${ip}:${port}/${dbName}`;
  return MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    const db = client.db('velib');
    callback(db);
  });
}

module.exports = init;

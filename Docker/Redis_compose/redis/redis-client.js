const redis = require('redis');
const {promisify} = require('util');
const client = redis.createClient({ url: 'redis://redis:6379' });

module.exports = {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  keysAsync: promisify(client.keys).bind(client)
};
const convict = require('convict');
const schema = require('./schema');

const config = convict(schema.schema);
const env = process.env.NODE_ENV || schema.defEnv

if (!schema.envs.includes(env)) {
  throw new Error('Environement config not found')
}

config.loadFile(`${__dirname}/env/${env}.json`);
config.validate({ allowed: 'strict' });

module.exports = config

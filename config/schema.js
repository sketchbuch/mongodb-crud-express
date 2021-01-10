const defEnv = 'development';
const envs = [defEnv, 'production', 'test'];

const schema = {
  db: {
    collection: {
      default: 'quotes',
      doc: 'The collection to use in MomngoDB.',
      format: String,
    },
    name: {
      default: 'crud-tutorial',
      doc: 'The database to use in MomngoDB.',
      format: String,
    },
  },
  name: {
    default: 'test',
    doc: 'The name for the MongoDB connection.',
    format: String,
  },
  password: {
    env: "MDB_PASSWORD",
    default: '',
    doc: 'The password for the MongoDB connection.',
    format: String,
  },
  username: {
    env: "MDB_USERNAME",
    default: '',
    doc: 'The username for the MongoDB connection.',
    format: String,
  },
};


module.exports = {
  defEnv,
  envs,
  schema,
};
const { createHttpLink } = require('apollo-link-http');
const {
  introspectSchema,
  makeRemoteExecutableSchema,
  mergeSchemas
} = require('graphql-tools');
const fetch = require('node-fetch');

async function createRemoteSchema(uri) {
  const link = createHttpLink({ uri, fetch });
  const schema = await introspectSchema(link);

  return makeRemoteExecutableSchema({ schema, link });
}

async function mergeRemotesSchemas(remoteSchemas) {
  const schemas = await Promise.all(remoteSchemas);

  return mergeSchemas({ schemas });
}

module.exports = {
  createRemoteSchema,
  mergeRemotesSchemas
};

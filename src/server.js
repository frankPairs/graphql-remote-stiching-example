const { GraphQLServer } = require('graphql-yoga');

const { createRemoteSchema, mergeRemotesSchemas } = require('./utils');

async function init() {
  const schema = await mergeRemotesSchemas([
    createRemoteSchema('https://countries.trevorblades.com/'),
    createRemoteSchema('https://api.graphloc.com/graphql')
  ]);

  const server = new GraphQLServer({ schema });

  server.start(() => console.log('Server is running on localhost:4000'));
}

init();

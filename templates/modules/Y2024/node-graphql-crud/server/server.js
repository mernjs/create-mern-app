require('dotenv').config()
const { resolve } = require('path');
const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const PORT = process.env.PORT || process.env.APP_PORT

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;

const resolvers = require('./src/resolvers/User');

const server = new GraphQLServer({
  	typeDefs: resolve(__dirname, './src/graphql/User.graphql'),
  	resolvers,
  	context: { db },
})

server.start({ port: PORT}, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
const express = require('express');
// Will need apollo for GraphQL API
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

// Basic server outline
app.get('/', (req, res) => res.send('Hello World'));

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
});

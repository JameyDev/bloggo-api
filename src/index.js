const express = require('express');
// Will need apollo for GraphQL API
const { ApolloServer, gql } = require('apollo-server-express');

// Basic server outline
// app.get('/', (req, res) => res.send('Hello World'));

// Run the server on a port specified in .env or 4000
const port = process.env.PORT || 4000;

// Test posts array
let posts = [
	{
		id: 1,
		title: 'First Post',
		content: 'This is the first post...',
		author: 'jamey',
		likes: 0,
		likedBy: []
	},
	{
		id: 2,
		title: 'Second Post',
		content: 'This is the second post...',
		author: 'jamey',
		likes: 0,
		likedBy: []
	}

];

// Construct a schema using GraphQL's schema language
const typeDefs = gql`
	type Query {
		hello: String
		posts: [Post!]!
		post(id: ID!): Post!
	}

	type Mutation {
		newPost(content: String!): Post!
	}

	type Post {
		id: ID!
		title: String!
		content: String!
		author: String!
		likes: Int!
		likedBy: [String]
	}
`;

// Schema Resolvers
const resolvers = {
	Query: {
		hello: () => 'Hello world!',
		posts: () => posts,
		post: (parent, args) => {
			return posts.find(post => post.id === args.id);
		}
	},
	Mutation: {
		newPost: (parent, args) => {
			let postValue = {
				id: String(posts.length + 1),
				content: args.content,
				author: 'jamey',
				likes: 0,
				likedBy: []
			};
			posts.push(postValue);
			return postValue;
		}
	}
};

const app = express();

// Apollo server GQL middleware setup
const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(res => {
	server.applyMiddleware({ app, path: '/api' })
});

app.listen({ port }, () => {
	console.log(
		`GraphQL Server running at http://localhost:${port}/api`
	);
});

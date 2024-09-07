import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './App';

const client = new ApolloClient({
  	uri: 'https://create-mern-app-graphql-production.up.railway.app',
})

ReactDOM.render(
  	<ApolloProvider client={client}>
    	<App />
  	</ApolloProvider>,
  	document.getElementById('root'),
);
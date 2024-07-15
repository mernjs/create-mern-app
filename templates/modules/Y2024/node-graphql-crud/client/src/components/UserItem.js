import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { ApolloConsumer } from 'react-apollo';
import { IconButton, ListItem, ListItemText, Tooltip } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { GET_USERS } from './UserList';

const REMOVE_USER = gql`
  	mutation removeUser($id: String!) {
    	removeUser(_id: $id) {
      		_id
    	}
  	}
`;

export default class TodoItem extends Component {
  	
	constructor(props){
		super(props)
		this.state = {
			loading: false,
		};
	}

  	handleDelete = (client) => async () => {
    	const { id } = this.props;
    	await client.mutate({mutation: REMOVE_USER, variables: { id }, update: this.handleUpdate })
  	}

	handleUpdate = (cache, { data: { removeUser } }) => {
		const { users } = cache.readQuery({ query: GET_USERS });
		if (removeUser) {
			const removedUser = users.findIndex((user) => user._id === removeUser._id);
			users.splice(removedUser, 1);
			cache.writeQuery({ query: GET_USERS, data: { users } })
		}
	}

	render() {

		const { name, email } = this.props;
		const { loading } = this.state;

		return (
			<ApolloConsumer>
				{(client) => {
					return (
						<ListItem disabled={loading} dense button>
							<ListItemText primary={name} secondary={email} />
							<Tooltip title="Delete" placement="bottom">
								<IconButton onClick={this.handleDelete(client)}>
								<DeleteIcon />
								</IconButton>
							</Tooltip>
						</ListItem>
					);
				}}
			</ApolloConsumer>
		);
	}
}

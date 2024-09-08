import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { Button, TextField, List, ListItem, ListItemText } from '@material-ui/core';
import { GET_USERS } from './UserList';

const CREATE_TODO = gql`
  	mutation createUser($name: String!, $email: String!, $password: String!) {
    	createUser(name: $name, email: $email, password: $password) {
      		_id
      		name
      		email
      		password
    	}
  	}
`;

export default class AddUserForm extends Component {
  	
	constructor(props){
		super(props)
		this.state = {
			name: '',
			email: '',
			password: '',
		}
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleUpdate = (cache, { data: { createUser } }) => {
		const { users } = cache.readQuery({ query: GET_USERS });
		cache.writeQuery({query: GET_USERS, data: { users: [...users, createUser] }});
	};

	handleSubmit = (createUser) => async (e) => {
		e.preventDefault();
		await createUser();
		this.setState({name: '',email: '',password: ''});
	};

  	render() {
		const { name, email, password } = this.state;
		return (
			<Mutation mutation={CREATE_TODO} variables={{ name, email, password }} update={this.handleUpdate}>
				{(createUser, { loading }) => {
					return (
						<form onSubmit={this.handleSubmit(createUser)}>
							<List>
								<ListItem>
								<ListItemText>
									<TextField
										name="name"
										label="name"
										value={name}
										onChange={this.handleChange}
										margin="normal"
										disabled={loading}
										required
										fullWidth
									/>
								</ListItemText>

								<ListItemText>
									<TextField
										name="email"
										label="email"
										value={email}
										onChange={this.handleChange}
										disabled={loading}
										margin="normal"
										required
										fullWidth
									/>
								</ListItemText>

								<ListItemText>
									<TextField
										name="password"
										label="password"
										value={password}
										onChange={this.handleChange}
										disabled={loading}
										margin="normal"
										required
										fullWidth
									/>
								</ListItemText>
								</ListItem>
							</List>

							<Button disabled={loading} type="submit" color="primary" aria-label="Add">
								Submit
							</Button>
						</form>
					);
				}}
			</Mutation>
		);
	}
}

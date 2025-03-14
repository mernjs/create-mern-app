import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { List, ListItem, ListItemText, CircularProgress } from '@material-ui/core';
import UserItem from './UserItem';
import AddUserForm from './AddUserForm';


export const GET_USERS = gql`
  	query getUsers {
    	users {
      		_id
      		name
      		email,
			password
    	}
  	}
`;

const TodoList = () => (
  	<Query query={GET_USERS}>
    	{({ loading, data }) => {
      		const users = data?.users || []
			if (loading) {
				return (
					<center>
						<CircularProgress size={50} />
					</center>
				);
			}
			if (users?.length === 0) {
				return (
					<List>
						<ListItem>
						<ListItemText>There is no users yet.</ListItemText>
						</ListItem>
					</List>
				);
			}
			return (
				<>
					<AddUserForm/>
					<List>{users?.map((item ) => <UserItem key={item._id} id={item._id} {...item} />)}</List>
				</>
			)
		}}
  	</Query>
);

export default TodoList;
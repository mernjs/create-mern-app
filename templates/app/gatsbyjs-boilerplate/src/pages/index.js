import React from 'react';
import { Header, Footer, Head } from '../components';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Dashboard = () => {
	const user = useSelector((state) => state.auth.user);
	return (
		<>
			<Head title={"Home"} />
			<ScrollView>
				<Header />
				<Container>
					{!user ? (
						<h1>Home</h1>
					) : (
						<>
							<h1>Dashboard</h1>
							<p>
								<b>Name</b>: {user?.name || ''}
							</p>
							<p>
								<b>Email</b>: {user?.email || ''}
							</p>
						</>
					)}
				</Container>
			</ScrollView>
			<Footer />
		</>
	);
};

export default Dashboard;

const ScrollView = styled.div`
    min-height: calc(100vh - 80px);
`;

const Container = styled.div`
    text-align: center;
    padding-top: 50px;
`;

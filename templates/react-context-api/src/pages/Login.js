import React, { useState } from 'react'
import { Header, Footer, TextInput, H2, Button } from 'components'
import styled from "styled-components";
import { Link } from 'react-router-dom';
import useAuth  from 'hooks/useAuth'

const validate = values => {
	const errors = {}
	if (!values.email) {
	  	errors.email = 'Email is Required'
	}
	if (!values.password) {
	  	errors.password = 'Password is Required'
	}
	return errors
}

const Login = (props) => {

	let { login } = useAuth()
	const [inputs, setInputs] = useState({});

	const handleLogin = (event) => {
		event.preventDefault();
		login(inputs)
	}
	
	const handleChange = e => setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    
    return (
        <>
        	<ScrollView>
				<Header />
				<Container>
					<H2>Sign In</H2>
					<form onSubmit={handleLogin}>
						<TextInput
							name="email"
							placeholder="Enter Your Email"
							type="text"
							onChange={handleChange}
						/>
						<TextInput 
							name="password"
							placeholder="Enter Your Password"
							type="password"
							onChange={handleChange}
						/>
						<Button className="btn btn-secondary" type="submit">Log In</Button>
						<div>Don't have an account? <Link to="/signup"> Signup</Link></div>
					</form>
				</Container>
			</ScrollView>
			<Footer/>
		</>
    )
}

export default Login

const ScrollView = styled.div`
	min-height: calc(100vh - 80px);
`;

const Container = styled.div`
	align-content: center;
	padding-top: 50px;
	min-height: 100%;
	margin: auto;
	width: 400px;
	max-width: 100%;
`;

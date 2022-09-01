import React, { useState } from 'react'
import { Header, Footer, TextInput, H2, Button } from 'components'
import styled from "styled-components";
import { Link } from 'react-router-dom';
import useAuth  from 'hooks/useAuth'

const validate = values => {
	const errors = {}
	if (!values.name) {
	  	errors.name = 'Name is Required'
	}
	if (!values.email) {
	  	errors.email = 'Email is Required'
	}
	if (!values.password) {
	  	errors.password = 'Password is Required'
	}
	if (!values.confirm_password) {
	  	errors.confirm_password = 'Confirm Password is Required'
	}
	return errors
}

const Signup = (props) => {

	let { signup } = useAuth()
	const [inputs, setInputs] = useState({});

	const handleSignup = (event) => {
		event.preventDefault();
		signup(inputs)
	}

	const handleChange = e => setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    
    return (
        <>
        	<ScrollView>
				<Header />
				<Container>
					<H2>Sign Up</H2>
					<form onSubmit={handleSignup}>
						<TextInput
							name="name"
							placeholder="Enter Your Name"
							type="text"
							onChange={handleChange}
						/>
						<TextInput
							name="email"
							placeholder="Enter Your Email ID"
							type="text"
							onChange={handleChange}
						/>
						<TextInput
							name="password"
							placeholder="Enter Your Password"
							type="text"
							onChange={handleChange}
						/>
						<TextInput
							name="confirm_password"
							placeholder="Enter Your Confirm Password"
							type="text"
							onChange={handleChange}
						/>
						<Button className="btn btn-secondary" type="submit">Sign Up</Button>
						<div>Don't have an account? <Link to="/login"> Login</Link></div>
					</form>
				</Container>
			</ScrollView>
			<Footer/>
		</>
    )
}

export default Signup

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

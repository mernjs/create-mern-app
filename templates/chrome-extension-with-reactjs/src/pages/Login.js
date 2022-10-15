import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Header, Footer, TextInput, H2, Button } from '../components'
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { formSubmitStart, formSubmitSuccess, formSubmitError } from '../utils/Utilities'
import { AuthActions } from '../reducers/AuthReducer'
import apiRequest from '../utils/apiRequest';

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

	const dispatch = useDispatch()

	const login = async (payload) => {
        try {
            formSubmitStart('login')
            const response = await apiRequest.post(`auth/login`, payload)
            dispatch(AuthActions.setAuth(response.data.data))
            formSubmitSuccess('login', response.data.message)
        } catch (error) {
            formSubmitError('login', error)
        }
    }

	const { handleSubmit, submitting } = props
    
    return (
        <>
        	<ScrollView>
				<Header />
				<Container>
					<H2>Sign In</H2>
					<form onSubmit={handleSubmit( (values) => login(values))}>
						<Field
							name="email"
							type="text"
							component={TextInput}
							placeholder="Enter Your Email"
						/>
						<Field
							name="password"
							type="password"
							component={TextInput}
							placeholder="Enter Your Password"
						/>
						<Button disabled={submitting} className="btn btn-secondary" type="submit">{submitting ? 'Submitting...' : 'Log In'}</Button>
						<div>Don't have an account? <Link to="/signup"> Signup</Link></div>
					</form>
				</Container>
			</ScrollView>
			<Footer/>
		</>
    )
}

export default reduxForm({
	validate,
    form: 'login'
})(Login)

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

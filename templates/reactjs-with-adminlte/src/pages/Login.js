import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextInput from 'components/TextInput'
import useAuth  from 'hooks/useAuth'
import { Content, Row, Col, Box, Button } from 'adminlte-2-react';

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
	const { login } = useAuth()
	const { handleSubmit } = props
    return (
		
       	<Content title="Login">
			<Row>
				<Col md={12}>
					<Box
						type="info"
						title="Login Form"
						bodyClassName="form-horizontal"
						footer={(
							<React.Fragment>
								<Button text="SignIn" onClick={handleSubmit( (values) => login(values))} type="primary" pullRight />
							</React.Fragment>
						)}
						border
					>
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
					</Box>
				</Col>
			</Row>
		</Content>
    )
}

export default reduxForm({
	validate,
    form: 'login'
})(Login)
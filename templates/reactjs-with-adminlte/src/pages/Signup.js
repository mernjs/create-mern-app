import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextInput from 'components/TextInput'
import useAuth  from 'hooks/useAuth'
import { Content, Row, Col, Box, Button } from 'adminlte-2-react';
  
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
	
	const { signup } = useAuth()
	const { handleSubmit } = props
    
    return (
		<Content title="Signup">
			<Row>
				<Col md={12}>
					<Box
						type="info"
						title="Signup Form"
						bodyClassName="form-horizontal"
						footer={(
							<React.Fragment>
								<Button text="SignUp" onClick={handleSubmit( (values) => signup(values))} type="primary" pullRight />
							</React.Fragment>
						)}
						border
					>
						<Field
							name="name"
							type="text"
							component={TextInput}
							placeholder="Enter Your Name"
						/>

						<Field
							name="email"
							type="text"
							component={TextInput}
							placeholder="Enter Your Email ID"
						/>
						<Field
							name="password"
							type="password"
							component={TextInput}
							placeholder="Enter Your Password"
						/>
						<Field
							name="confirm_password"
							type="password"
							component={TextInput}
							placeholder="Enter Your Confirm Password"
						/>
					</Box>
				</Col>
			</Row>
		</Content>
    )
}

export default reduxForm({
	validate,
    form: 'signup'
})(Signup)
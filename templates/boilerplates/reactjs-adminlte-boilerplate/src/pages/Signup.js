import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Header, Footer, TextInput, H2, Button } from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import apiRequest, {
  formSubmitStart,
  formSubmitSuccess,
  formSubmitError
} from '../Utilities';
import { AuthActions } from '../reducers/AuthReducer';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Name is Required';
  }
  if (!values.email) {
    errors.email = 'Email is Required';
  }
  if (!values.password) {
    errors.password = 'Password is Required';
  }
  if (!values.confirm_password) {
    errors.confirm_password = 'Confirm Password is Required';
  }
  return errors;
};

const Signup = (props) => {
  const dispatch = useDispatch();

  const signup = async (payload) => {
    try {
      formSubmitStart('signup');
      const response = await apiRequest.post(`auth/signup`, payload);
      dispatch(AuthActions.setAuth(response.data.data));
      formSubmitSuccess('signup', response.data.message);
    } catch (error) {
      formSubmitError('signup', error);
    }
  };

  const { handleSubmit, submitting } = props;

  return (
    <>
      <ScrollView>
        <Header />
        <Container>
          <H2>Sign Up</H2>
          <form onSubmit={handleSubmit((values) => signup(values))}>
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
            <Button
              className="btn btn-secondary"
              type="submit"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Sign Up'}
            </Button>
            <div>
              Don't have an account? <Link to="/login">Login</Link>
            </div>
          </form>
        </Container>
      </ScrollView>
      <Footer />
    </>
  );
};

export default reduxForm({
  validate,
  form: 'signup'
})(Signup);

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

import React from 'react';
import { Header, Footer, TextInput, H2, Button, Head } from '../components';
import styled from 'styled-components';
import { Link, navigate } from 'gatsby';
import { useDispatch } from 'react-redux';
import apiRequest, { showToast } from '../Utilities';
import { AuthActions } from '../reducers/AuthReducer';
import { useForm, Controller } from 'react-hook-form';

const Login = () => {
    const {
        handleSubmit,
        control,
        formState: { isSubmitting, errors },
    } = useForm({ mode: 'onChange' });

    const dispatch = useDispatch();

    const login = async (payload) => {
        try {
            const response = await apiRequest.post(`login`, payload);
            dispatch(AuthActions.setAuth(response.data.data));
            navigate('/');
        } catch (error) {
            showToast(error?.response?.data?.message, 'error');
        }
    };

    return (
        <>
            <Head title={""} />
            <ScrollView>
                <Header />
                <Container>
                    <H2>Sign In</H2>
                    <form onSubmit={handleSubmit((values) => login(values))}>
                        <Controller
                            name="email"
                            control={control}
                            render={(field) => (
                                <TextInput
                                    {...field}
                                    type="text"
                                    placeholder="Enter Your Email"
                                    errors={errors}
                                />
                            )}
                            rules={{ required: 'Email is required.' }}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={(field) => (
                                <TextInput
                                    {...field}
                                    type="password"
                                    placeholder="Enter Your Password"
                                    errors={errors}
                                />
                            )}
                            rules={{ required: 'Password is required.' }}
                        />
                        <Button
                            disabled={isSubmitting}
                            className="btn btn-secondary"
                            type="submit"
                        >
                            {isSubmitting ? 'Submitting...' : 'Log In'}
                        </Button>
                        <div>
                            Don&apos;t have an account?{' '}
                            <Link to="/signup"> Signup</Link>
                        </div>
                    </form>
                </Container>
            </ScrollView>
            <Footer />
        </>
    );
};

export default Login;

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

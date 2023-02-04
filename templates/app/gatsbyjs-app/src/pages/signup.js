import React from 'react';
import { Header, Footer, TextInput, H2, Button } from '../components';
import styled from 'styled-components';
import { Link, navigate } from 'gatsby';
import { useDispatch } from 'react-redux';
import apiRequest, { showToast } from '../Utilities';
import { AuthActions } from '../reducers/AuthReducer';
import { useForm, Controller } from 'react-hook-form';

const Signup = () => {
    const {
        handleSubmit,
        control,
        formState: { isSubmitting, errors },
    } = useForm({ mode: 'onChange' });

    const dispatch = useDispatch();

    const signup = async (payload) => {
        try {
            const response = await apiRequest.post(`signup`, payload);
            dispatch(AuthActions.setAuth(response.data.data));
            navigate('/');
        } catch (error) {
            showToast(error?.response?.data?.message, 'error');
        }
    };

    return (
        <>
            <ScrollView>
                <Header />
                <Container>
                    <H2>Sign Up</H2>
                    <form onSubmit={handleSubmit((values) => signup(values))}>
                        <Controller
                            name="name"
                            control={control}
                            render={(field) => (
                                <TextInput
                                    {...field}
                                    type="text"
                                    placeholder="Enter Your Name"
                                    errors={errors}
                                />
                            )}
                            rules={{
                                required: 'Name is required.',
                                maxLength: {
                                    value: 20,
                                    message: 'This input exceed maxLength.',
                                },
                            }}
                        />
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
                        <Controller
                            name="confirm_password"
                            control={control}
                            render={(field) => (
                                <TextInput
                                    {...field}
                                    type="password"
                                    placeholder="Enter Your Confirm Password"
                                    errors={errors}
                                />
                            )}
                            rules={{
                                required: 'Comfirm Password is required.',
                            }}
                        />
                        <Button
                            className="btn btn-secondary"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Sign Up'}
                        </Button>
                        <div>
                            Don&apos;t have an account?{' '}
                            <Link to="/login">Login</Link>
                        </div>
                    </form>
                </Container>
            </ScrollView>
            <Footer />
        </>
    );
};

export default Signup;

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

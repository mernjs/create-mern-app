import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AuthActions } from '../reducers/AuthReducer';
import apiRequest from '../Utilities';

const useAuthMiddleware = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state?.auth?.user);

	const getClient = async () => {
		try {
			const response = await apiRequest({
				url: `user`,
				method: 'GET',
			});
			dispatch(AuthActions.setAuth(response?.data?.response));
		} catch (error) {
			dispatch(AuthActions.logout());
		}
	}

	useEffect(() => {
		getClient()
	}, [dispatch]);

	return user;
};

export default useAuthMiddleware;
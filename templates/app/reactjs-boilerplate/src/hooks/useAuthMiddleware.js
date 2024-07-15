import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrypt } from '@/Utilities';
import { AuthActions } from '@/reducers/AuthReducer';
import { useValidateTokenQuery } from '@/services/AuthServices';

const useAuthMiddleware = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state?.auth?.user);
	const decryptedUser = user ? decrypt({ data: user }) : null;

	const { error } = useValidateTokenQuery(undefined, {
		skip: !user,
		keepUnusedDataFor: 0,
		onSuccess: (data) => {
			if (data) {
				// dispatch(AuthActions.setAuth(data));
			}
		},
		onError: (err) => {
			dispatch(AuthActions.logout());
		},
	});

	useEffect(() => {
		if (error) {
			dispatch(AuthActions.logout())
		}
	}, [error, dispatch]);

	return decryptedUser
};

export default useAuthMiddleware;

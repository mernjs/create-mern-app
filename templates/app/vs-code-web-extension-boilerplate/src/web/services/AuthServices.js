import { api } from './api';

export const AuthServices = api.injectEndpoints({
	endpoints: (build) => ({

		login: build.mutation({
			query: (payload) => ({
				url: 'login',
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: [{ type: 'Auth', id: 'STATUS' }],
		}),

		register: build.mutation({
			query: (payload) => ({
				url: 'signup',
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: [{ type: 'Auth', id: 'STATUS' }],
		}),

		validateToken: build.query({
			query: () => ({
				url: `token`,
				method: 'GET',
			}),
			keepUnusedDataFor: 300,
			refetchOnMountOrArgChange: false,
			invalidatesTags: [{ type: 'Auth', id: 'STATUS' }],
		}),

	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useValidateTokenQuery,
} = AuthServices;

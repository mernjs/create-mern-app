import { api } from 'services/api';

export const UserServices = api.injectEndpoints({
	endpoints: (build) => ({

		getUsers: build.query({
			query: (page) => `users?page=${page}`,
			providesTags: (result) =>
				result?.data?.docs ? result.data?.docs.map(({ _id }) => ({ type: 'Users', _id })) : [],
			keepUnusedDataFor: 60,
			refetchOnMountOrArgChange: true,
		}),

		addUser: build.mutation({
			query: (body) => ({
				url: `users`,
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'Users', id: 'LIST' }],
		}),

		getUser: build.query({
			query: (id) => ({
				url: `user/${id}`,
				method: 'GET',
			}),
			providesTags: (result, error, id) => [{ type: 'Users', id }],
			keepUnusedDataFor: 300,
			refetchOnMountOrArgChange: false,
		}),

		updateUser: build.mutation({
			query: ({ id, ...patch }) => ({
				url: `users/${id}`,
				method: 'PUT',
				body: patch,
			}),
			async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					api.util.updateQueryData('getUser', id, (draft) => {
						Object.assign(draft, patch);
					}),
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
			invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }],
		}),

		deleteUser: build.mutation({
			query(id) {
				return {
					url: `users/${id}`,
					method: 'DELETE',
				};
			},
			invalidatesTags: (result, error, id) => [{ type: 'Users', id }],
		}),
	}),
});

export const {
	useGetUserQuery,
	useGetUsersQuery,
	useAddUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
} = UserServices;

import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: `/api/v1/`,
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (token) {
			headers.set('authentication', `Bearer ${token}`);
		}
		return headers;
	},
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const apiCall = createApi({
	reducerPath: 'apiCall',
	baseQuery: baseQueryWithRetry,
	tagTypes: ['Users'],
	endpoints: () => ({}),
});

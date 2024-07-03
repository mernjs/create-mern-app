import { createApi, retry } from '@reduxjs/toolkit/query/react';
import apiRequest from '../Utilities';

const baseQuery = async (args) => {
	try {
		const response = await apiRequest(args);
		return { data: { data: response?.data, message: response?.message } };
	} catch (error) {
		return { error: { data: error?.data, message: error?.message } };
	}
};

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithRetry,
	tagTypes: ['Users', 'Auth', 'Payments'],
	endpoints: () => ({}),
});

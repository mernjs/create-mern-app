import React from 'react';
import { ErrorMessage } from '@hookform/error-message';

const Input = (props) => {
	const { field, label, type, placeholder, errors } = props;
	return (
		<div>
			{label && <label htmlFor={field?.name} className="block sr-only text-sm font-medium leading-6 text-gray-900">{label}</label>}
			<div className="mt-2">
				<input
					placeholder={placeholder}
					className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					type={type}
					id={field?.name}
					{...field}
				/>
				{errors && (
					<ErrorMessage
						errors={errors}
						name={field?.name}
						render={({ message }) => (
							<span style={{ color: 'red' }}>{message}</span>
						)}
					/>
				)}
			</div>
		</div>
	);
};

export default Input;

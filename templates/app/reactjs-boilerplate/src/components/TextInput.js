import React from 'react';
import { ErrorMessage } from '@hookform/error-message';

const Input = (props) => {
	const { field, label, type, placeholder, errors } = props;
	return (
		<div>
			{label && <label htmlFor={field.name} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>}
			<div className="mt-2">
				<input
					placeholder={placeholder}
					className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-4"
					type={type}
					id={field.name}
					{...field}
				/>
				{errors && (
					<ErrorMessage
						errors={errors}
						name={field.name}
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

import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";

interface TextInputProps {
	field: {
		name: string;
		value: string;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		onBlur: () => void;
	};
	label?: string;
	type?: string;
	placeholder?: string;
	errors?: any;
	preFix?: string;
	coverClass?: string;
	readOnly?:boolean;
}

const Input = ({
	field,
	label,
	type,
	placeholder,
	errors,
	preFix,
	coverClass,
	readOnly,
	
}: TextInputProps) => {
	return (
		<div className={`${coverClass}`}>
			{label && (
				<label
					htmlFor={field.name}
					className="mb-[6px] block font-bold leading-[24px] text-[#111535]"
				>
					{label}
				</label>
			)}
			<div className="relative">
				{preFix && (
					<span className="absolute bottom-0 left-0 top-0 flex h-[41px] items-center rounded-l-lg border border-[#d0d5dd] bg-white px-3 text-sm text-[#111535] text-gray-900">
						{preFix}
					</span>
				)}

				<input
					className={`block h-[41px] w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${preFix ? "ps-[80px]" : ""
						}`}
					placeholder={placeholder}
					type={type}
					readOnly={readOnly}
					id={field.name}
					{...field}
				/>
			</div>

			{errors && (
				<ErrorMessage
					errors={errors}
					name={field.name}
					render={({ message }) => (
						<p className="mt-2 text-sm text-red-600 dark:text-red-500">
							{message}
						</p>
					)}
				/>
			)}
		</div>
	);
};

const TextInput = ({
	control,
	name,
	type,
	label,
	placeholder,
	rules,
	errors,
	coverClass,
	readOnly,
}: any) => {
	return (
		<Controller
			name={name}
			control={control}
			render={(field) => (
				<Input
					{...field}
					type={type}
					label={label}
					placeholder={placeholder}
					errors={errors}
					readOnly={readOnly}
					coverClass={coverClass}
				/>
			)}
			rules={rules}
		/>
	);
};

export default TextInput;

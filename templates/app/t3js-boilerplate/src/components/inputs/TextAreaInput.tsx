import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";

interface TextAreaProps {
	field: {
		name: string;
		value: string;
		onChange: (selectedItem: any) => void;
		onBlur: () => void;
	};
	label?: string;
	placeholder?: string;
	errors?: any;
	readOnly?:boolean;
}

const Input = ({
	field,
	label,
	placeholder,
	errors,
	readOnly,
}: TextAreaProps) => {
	return (
		<div className="flex flex-col">
			{label && (
				<label
					htmlFor={field.name}
					className="mb-[6px] block font-bold leading-[24px] text-[#111535]">
					{label}
				</label>
			)}
			<textarea
				rows={4}
				className="w-full flex-1 resize-none rounded-md border border-[#d0d5dd]"
				id={field.name}
				placeholder={placeholder}
				{...field}
				readOnly={readOnly}
			>
				{field.value}
			</textarea>

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

const TextAreaInput = ({ control, name, label, placeholder, rules, errors, readOnly }: any) => {
	return <Controller
		name={name}
		control={control}
		render={(field) => (
			<Input
				{...field}
				readOnly={readOnly}
				label={label}
				placeholder={placeholder}
				errors={errors}
			/>
		)}
		rules={rules}
	/>
}


export default TextAreaInput;
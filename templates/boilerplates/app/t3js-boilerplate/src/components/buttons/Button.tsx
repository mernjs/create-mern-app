import { type ReactNode, type MouseEventHandler } from "react";

interface ButtonProps {
	type: "button" | "reset" | "submit" | undefined;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
	children?: ReactNode;
	classButton?: string;
}

const Button = ({
	type,
	onClick,
	disabled,
	children,
	classButton,
}: ButtonProps) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`${classButton} flex w-full justify-center rounded-[8px] bg-[#4c84ff] px-[18px] py-[10px] text-[18px] font-black leading-[24px] text-white ${disabled ? "opacity-[.5]" : ""
				}`}
		>
			{children}
		</button>
	);
};

export default Button;

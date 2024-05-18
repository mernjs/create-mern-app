import Button from "~/components/buttons/Button";
import TextInput from "~/components/inputs/TextInput";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { showToast } from "~/utils/utils";

const LoginForm = () => {
	const router = useRouter();

	const {
		handleSubmit,
		control,
		formState: { isSubmitting, errors },
	} = useForm({ mode: "onChange" });

	const onSubmit = async (values: any) => {
		const res: any = await signIn("credentials", {
			redirect: false,
			email: values.email,
			password: values.password,
		});
		if (!res?.ok) return showToast(res.error, "error")
		router.push(`/`)
	}

	return (
		<form
			className="w-full max-w-[400px] space-y-6"
			onSubmit={handleSubmit((values) => onSubmit(values))}
		>
			<TextInput
				name="email"
				control={control}
				type="text"
				label={"Email"}
				placeholder="Enter your email"
				errors={errors}
				rules={{ required: "Email is required." }}
			/>

			<TextInput
				name="password"
				control={control}
				type="password"
				label={"Password"}
				placeholder="Enter your password"
				errors={errors}
				rules={{ required: "Password is required." }}
			/>

			<div>
				<div className="flex items-center justify-between">
					<div className="flex items-center">
					</div>
					<div className="text-sm">
						<Link
							href="/auth/forgot-password"
							className="text-[18px] font-black leading-[24px] text-[#4c84ff]"
						>
							Forgot password?
						</Link>
					</div>
				</div>
			</div>

			<Button disabled={isSubmitting} type="submit">
				{isSubmitting ? "Submitting..." : "Log In"}
			</Button>
		</form>
	);
};

export default LoginForm;
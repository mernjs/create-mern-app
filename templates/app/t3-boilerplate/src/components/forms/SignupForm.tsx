import Button from "~/components/buttons/Button";
import TextInput from "~/components/inputs/TextInput";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";
import { showToast } from "~/utils/utils";
import { validateConfirmPassword, validateEmail, validateName, validatePassword } from "~/utils/validations";
import { signIn } from "next-auth/react";

const SignupForm = () => {
	const router = useRouter();

	const {
		handleSubmit,
		control,
		watch,
		getValues,
		formState: { isSubmitting, errors, isValid },
	} = useForm({ mode: "onChange" });

	const password = watch("password");

	const signupMutation = api.user.signup.useMutation({
		retry: false,
		onError(err) {
			showToast(err.message, 'error')
		},
		onSuccess(data: any) {
			(async () => {
				const res: any = await signIn("credentials", {
					redirect: false,
					email: getValues('email'),
					password: getValues('password'),
				});
				if (!res?.ok) return showToast(res.error, "error")
				showToast(data.message, 'success')
				router.push('/');
			})()
		},
	});

	const onSubmit = (values: any) => {
		signupMutation.mutate(values)
	};

	return (

		<form
			className="w-full max-w-[400px] space-y-6"
			onSubmit={handleSubmit((values) => onSubmit(values))}
		>
			<TextInput
				name="name"
				control={control}
				type="text"
				label={"Name*"}
				placeholder="Enter your name"
				errors={errors}
				rules={{ validate: validateName }}
			/>

			<TextInput
				name="email"
				control={control}
				type="text"
				label={"Email*"}
				placeholder="Enter your email"
				errors={errors}
				rules={{ validate: validateEmail }}
			/>

			<TextInput
				name="password"
				control={control}
				type="password"
				label={"Password*"}
				placeholder="Enter your password"
				errors={errors}
				rules={{ validate: validatePassword }}
			/>

			<TextInput
				name="confirm_password"
				control={control}
				type="password"
				label={"Confirm Password*"}
				placeholder="Enter your confirm password"
				errors={errors}
				rules={{ validate: (value: any) => validateConfirmPassword(value, password) }}
			/>

			<Button disabled={!isValid || isSubmitting} type="submit">
				{isSubmitting ? "Submitting..." : "Signup"}
			</Button>

		</form>
	);
};

export default SignupForm;
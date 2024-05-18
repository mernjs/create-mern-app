import Button from "~/components/buttons/Button";
import TextInput from "~/components/inputs/TextInput";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";
import { getItem, showToast } from "~/utils/utils";
import { validateConfirmPassword, validatePassword } from "~/utils/validations";

const ResetPasswordForm = () => {

	const router = useRouter();
	const email = getItem('email')

	const {
		handleSubmit,
		control,
		watch,
		formState: { isSubmitting, errors, isValid },
	} = useForm({ mode: "onChange" });

	const password = watch("password");

	const resetPasswordMutation = api.user.resetPassword.useMutation({
		retry: false,
		onError(err) {
			showToast(err.message, 'error')
		},
		onSuccess(data) {
			showToast(data.message, 'success')
			router.push("/auth/login");
		},
	});

	const onSubmit = (values: any) => {
		resetPasswordMutation.mutate({ email, password: values.password })
	};

	return (
		<form
			className="w-full max-w-[400px] space-y-6"
			onSubmit={handleSubmit((values) => onSubmit(values))}
		>
			<TextInput
				name="password"
				control={control}
				type="password"
				label={"Password"}
				placeholder="••••••••"
				errors={errors}
				rules={{ validate: validatePassword }}
			/>

			<TextInput
				name="confirm_password"
				control={control}
				type="password"
				label={"Confirm password"}
				placeholder="••••••••"
				errors={errors}
				rules={{ validate: (value: any) => validateConfirmPassword(value, password) }}
			/>
			<Button disabled={!isValid || isSubmitting} type="submit">
				{isSubmitting ? "Submitting..." : "Reset password"}
			</Button>

		</form>
	);
};

export default ResetPasswordForm;
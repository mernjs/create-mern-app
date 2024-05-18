import Button from "~/components/buttons/Button";
import TextInput from "~/components/inputs/TextInput";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";
import { setItem, showToast } from "~/utils/utils";
import { validateEmail } from "~/utils/validations";

const ForgotPasswordForm = () => {
	const router = useRouter();

	const {
		handleSubmit,
		control,
		getValues,
		setError,
		formState: { isSubmitting, errors, isValid },
	} = useForm({ mode: "onChange" });

	const forgotPasswordMutation = api.user.forgotPassword.useMutation({
		retry: false,
		onError(err) {
			setError('email', { message: err.message });
			showToast(err.message, 'error')
		},
		onSuccess(data) {
			showToast(data.message, 'success')
			setItem("email", getValues('email'))
			router.push("/auth/reset-password");
		},
	});

	const onSubmit = (values: any) => {
		forgotPasswordMutation.mutate(values)
	};

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
				rules={{ validate: validateEmail }}
			/>

			<Button disabled={!isValid || isSubmitting} type="submit">
				{isSubmitting ? "Submitting..." : "Reset password"}
			</Button>
		</form>
	);
};

export default ForgotPasswordForm;
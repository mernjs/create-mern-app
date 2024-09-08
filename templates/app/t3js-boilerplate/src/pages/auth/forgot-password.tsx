import ForgotPasswordForm from "~/components/forms/ForgotPasswordForm";
import withPublic from "~/components/hoc/withPublic";

const ForgotPassword = () => {
	return (
		<div className="max-w-screen flex min-h-screen flex-col items-center justify-start p-[96px]">
			<h2 className="mb-[8px] mt-[24px] text-[28px] font-black leading-[42px] text-[#111535]">
				Forgot password?
			</h2>
			<ForgotPasswordForm />
		</div>
	);
};

export default withPublic(ForgotPassword);
import ResetPasswordForm from "~/components/forms/ResetPasswordForm";
import withPublic from "~/components/hoc/withPublic";

const ResetPassword = () => {
	return (
		<div className="max-w-screen flex min-h-screen flex-col items-center justify-start p-[96px]">
			<h2 className="mb-[8px] text-[28px] font-black leading-[42px] text-[#111535]">
				Reset Password
			</h2>
			<ResetPasswordForm />
		</div>
	);
};

export default withPublic(ResetPassword);

import Link from "next/link";
import LoginForm from "~/components/forms/LoginForm";
import withPublic from "~/components/hoc/withPublic";

const Login = () => {
	return (
		<div className="max-w-screen flex min-h-screen flex-col items-center justify-start p-[96px]">
			<h2 className="mb-[8px] mt-[24px] text-[28px] font-black leading-[42px] text-[#111535]">
				Login
			</h2>
			<LoginForm />
			<div className="mt-8 flex justify-center font-bold leading-[24px] text-[#111535]">
				Don&apos;t have an account?{" "}
				<Link
					className="ms-[4px] text-[18px] font-black leading-[24px] text-[#4c84ff]"
					href="/auth/signup"
				>
					{" "}
					Sign up
				</Link>
			</div>
		</div>
	);
};

export default withPublic(Login);

import SignupForm from "~/components/forms/SignupForm";
import Link from "next/link";
import withPublic from "~/components/hoc/withPublic";

const Signup = () => {
	return (
		<div className="max-w-screen flex min-h-screen flex-col items-center justify-start p-[96px]">
			<h2 className="mb-[8px] mt-[24px] text-[28px] font-black leading-[42px] text-[#111535]">
				Signup
			</h2>
			<SignupForm />
			<div className="mt-8 flex justify-center font-bold leading-[24px] text-[#111535]">
				Already have an account?{" "}
				<Link
					className="ms-[4px] text-[18px] font-black leading-[24px] text-[#4c84ff]"
					href="/auth/login"
				>
					{" "}
					Log in
				</Link>
			</div>
		</div>
	);
};

export default withPublic(Signup);

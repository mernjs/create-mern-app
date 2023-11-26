import { signOut, useSession } from "next-auth/react";
import Button from "~/components/buttons/Button";
import withAuth from "~/components/hoc/withAuth";

const Dashboard = () => {
	const { data: session }: any = useSession();
	return (
		<div className="max-w-screen flex min-h-screen flex-col items-center justify-start p-[96px]">
			<h2 className="mb-[8px] mt-[24px] text-[28px] font-black leading-[42px] text-[#111535]">
				Welcome {session?.user?.name}
			</h2>
			<div className="max-w-[400px]">
				<Button type="button" onClick={() => signOut({ callbackUrl: '/' })}>Logout</Button>
			</div>
		</div >
	);
};

export default withAuth(Dashboard);

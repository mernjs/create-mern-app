import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

interface WithPublicProps {
	children: React.ReactNode | (() => React.JSX.Element);
}

function withPublic(WrappedComponent: React.ComponentType<any>) {
	return function WithPublicComponent(props: WithPublicProps) {
		const router = useRouter();
		const { data: session, status } = useSession();
		if (status === "loading") return <p>Loading...</p>;
		if (status !== "authenticated" && !session) {
			return (
				<WrappedComponent
					{...props}
					session={session}
					router={router}
					status={status}
				/>
			);
		} else {
			router.push(`/`);
		}
	};
}

export default withPublic;
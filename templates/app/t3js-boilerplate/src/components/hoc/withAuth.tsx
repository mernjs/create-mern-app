import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

interface WithAuthProps {
	children: React.ReactNode | (() => React.JSX.Element);
}

function withAuth(WrappedComponent: React.ComponentType<any>) {
	return function WithAuthComponent(props: WithAuthProps) {
		const router = useRouter();
		const { data: session, status } = useSession();
		if (status === "loading") return <p>Loading...</p>;
		if (!session) {
			router.push(`/auth/login`);
			return <p>Loading...</p>;
		}

		if (status === "authenticated") {
			return <WrappedComponent {...props} session={session} router={router} />
		} else {
			router.push(`/auth/login`);
			return <p>Loading...</p>;
		}
	};
}

export default withAuth;
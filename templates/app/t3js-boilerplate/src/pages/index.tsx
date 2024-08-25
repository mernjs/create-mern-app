import withAuth from "~/components/hoc/withAuth";

const Home = ({ status, session, router }: any) => {
	if (status == "loading") {
		return <p>Loading...</p>;
	}
	if (!session) {
		router.push(`/auth/login`);
		return null
	}
	router.push(`/dashboard`);
	return null
};

export default withAuth(Home);

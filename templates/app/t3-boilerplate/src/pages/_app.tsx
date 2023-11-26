import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { api } from "~/utils/api";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "~/styles/globals.css";


const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
			<ToastContainer />
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);

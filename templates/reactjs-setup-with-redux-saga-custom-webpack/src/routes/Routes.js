import WelcomePage from '../views/pages/Welcome'
import Page404     from '../views/pages/Page404'

export default [
	{
        path: "/",
        component: WelcomePage,
        private: false
    },
    {
        path: "*",
        component: Page404,
        private: false
    },
]
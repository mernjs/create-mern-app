import WelcomePage from '../views/pages/Welcome'
import UserFormPage from '../views/pages/UserForm'
import Page404     from '../views/pages/Page404'

export default [
	{
        path: "/",
        component: WelcomePage,
        private: false
    },
    {
        path: "/form",
        component: UserFormPage,
        private: false
    },
    {
        path: "*",
        component: Page404,
        private: false
    },
]
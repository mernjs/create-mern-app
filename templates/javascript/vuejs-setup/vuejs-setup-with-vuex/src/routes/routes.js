import Home from '../views/pages/Home.vue'
import NotFound from '../views/pages/NotFound.vue'

import Login from '../views/pages/auth/Login'
import Signup from '../views/pages/auth/Signup'
import ForgotPassword from '../views/pages/auth/ForgotPassword'
import ForgotPasswordReset from '../views/pages/auth/ForgotPasswordReset'

import AboutUs from '../views/pages/static/AboutUs'
import ContactUs from '../views/pages/static/ContactUs'

import ChangePassword from '../views/pages/user/ChangePassword'
import MyProfile from '../views/pages/user/MyProfile'

const routes = [
    {
      path: '/',
      component: Home,
      meta: {
        private: false,
      },
    },
    {
      path: '/login',
      component: Login,
      meta: {
        private: false
      }
    },
    {
      path: '/signup',
      component: Signup,
      meta: {
        private: false
      }
    },
    {
      path: '/forgot-password',
      component: ForgotPassword,
      meta: {
        private: false
      }
    },
    {
      path: '/forgot-password-reset',
      component: ForgotPasswordReset,
      meta: {
        private: false
      }
    },
    {
      path: '/about-us',
      component: AboutUs,
      meta: {
        private: false
      }
    },
    {
      path: '/contact-us',
      component: ContactUs,
      meta: {
        private: false
      }
    },
    {
      path: '/change-password',
      component: ChangePassword,
      meta: {
        private: true
      }
    },
    {
      path: '/my-profile',
      component: MyProfile,
       meta: {
        private: true
      }
    },
		{
      path: '*',
      component: NotFound,
      meta: {
        private: false
      }
		},
  ]

  export default  routes
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '../routes/routes'

Vue.use(VueRouter);

const router =  new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.private)) {
    let isLoggedIn = localStorage.getItem('users')
    console.log('users => ', isLoggedIn)
    if (isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../components/Login.vue'
import FindingFriends from '../components/FindingFriends.vue'
import Register from '../components/Register.vue'
import RegisterAdmin from '../components/RegisterAdmin.vue'
import UserBoard from '../components/UserBoard'
import Admin from '../components/Admin'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        guest: true
      }
    },
    {
      path: '/register-admin',
      name: 'register-admin',
      component: RegisterAdmin,
      meta: {
        guest: true
      }
    },
    {
      path: '/finding_friends',
      name: 'finding_friends',
      component: FindingFriends,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'userboard',
      component: UserBoard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({ path: '/login', params: { nextUrl: to.fullPath } })
    } else {
      const user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin === 1) {
          next()
        } else {
          next('/')
        }
      } else {
        next()
      }
    }
  } else
  if (to.matched.some(record => record.meta.guest)) {
    if (store.getters.isLoggedIn) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (store.getters.isLoggedIn) {
//       next()
//       return
//     }
//     next('/login')
//   } else {
//     next()
//   }
// })

export default router

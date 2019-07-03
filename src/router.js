import Vue from 'vue'
import Router from 'vue-router'
import Signup from "./views/Users/Signup.vue";
import Login from "./views/Users/Login.vue";
import Logout from "./views/Users/Logout.vue";
import Show from "./views/Users/Show.vue";
import Edit from "./views/Users/Edit.vue";
import Index from "./views/Posts/Index.vue"


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'posts-index', component: Index },
    { path: "/users/:id", name: "users-show", component: Show },
    { path: "/users/:id/edit", name: "users-edit", component: Edit},
    { path: "/signup", name: "signup", component: Signup },
    { path: "/login", name: "login", component: Login },
    { path: "/logout", name: "logout", component: Logout }   
  ]
})

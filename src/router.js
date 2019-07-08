import Vue from 'vue'
import Router from 'vue-router'
import Signup from "./views/Users/Signup.vue";
import Login from "./views/Users/Login.vue";
import Logout from "./views/Users/Logout.vue";
import UsersShow from "./views/Users/UsersShow.vue";
import Edit from "./views/Users/Edit.vue";
import Index from "./views/Posts/Index.vue";
import PostsNew from "./views/Posts/PostsNew.vue";
import PostsShow from "./views/Posts/PostsShow.vue";
import PostsEdit from "./views/Posts/PostsEdit.vue";



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'posts-index', component: Index },
    { path: '/posts/new', name: 'posts-new', component: PostsNew},
    { path: '/posts/:id', name: 'posts-show', component: PostsShow},
    { path: '/posts/:id/edit', name: 'posts-edit', component: PostsEdit},
    { path: "/users/:id", name: "users-show", component: UsersShow },
    { path: "/users/:id/edit", name: "users-edit", component: Edit},
    { path: "/signup", name: "signup", component: Signup },
    { path: "/login", name: "login", component: Login },
    { path: "/logout", name: "logout", component: Logout }   
  ]
})

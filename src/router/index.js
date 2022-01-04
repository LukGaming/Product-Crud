import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Produtos from '../views/Produtos.vue'
import ProdutosCrud from '../views/ProdutosCrud.vue'
import Login from '../views/Login'
import Register from '../views/Register'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes:[{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/produtos',
    name: 'produtos',
    component: Produtos
  },
  {
    path: '/produtos/create',
    name: 'produto/create',
    component: ProdutosCrud
  },{
    path: '/produtos/:id/edit',
    name: 'produto/edit',
    component: ProdutosCrud
  }
  ,{
    path: '/produtos/:id',
    name: 'produto/read',
    component: ProdutosCrud
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  
  
]
})


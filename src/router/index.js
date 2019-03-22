import Vue from 'vue'
import Router from 'vue-router'
import Budgets from '@/components/Budgets'
import Budget from '@/components/Budget'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'budgets',
        component: Budgets
      },
    {
        path: '/budgets/:i',
        name: 'budget',
        component: Budget
      }
  ]
})
import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Orders from '@/components/Orders';
import Product from '@/components/Product';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders
    },
    {
      path: '/product',
      name: 'Product',
      component: Product
    },
    {
      path: '*',
      name: 'Index',
      component: Index
    }
  ]
});

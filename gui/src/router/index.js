import Vue from 'vue';
import Router from 'vue-router';
import CurrencyCalculator from '../components/CurrencyCalculator.vue';
import LoginForm from '../components/LoginForm.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: LoginForm },
    { path: '/convert', component: CurrencyCalculator }
  ]
});

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles.css';

//Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

// Specific Icon to Library
library.add(faSignOutAlt);

// Font Awesome component
Vue.component('font-awesome-icon', FontAwesomeIcon);


Vue.config.productionTip = false

document.title = process.env.APP_NAME || 'Currency Converter';

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')


import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueToastify from 'vue-toastify';

Vue.use(VueToastify);

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

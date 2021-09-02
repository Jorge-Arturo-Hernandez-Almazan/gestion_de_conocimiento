import Vue from 'vue'
import router from './router'
import App from '@/components/layout/App'
import Axios from 'axios'
import SweetAlert2 from 'sweetalert2'
import VueSweetalert2 from 'vue-sweetalert2' 
import $ from 'jquery';
import 'select2';
import 'foundation-sites';
import ToggleButton from 'vue-js-toggle-button'
import SmartTable from 'vuejs-smart-table'
import VueViewer from 'v-viewer'

import { Form } from 'vform';

window.Form = Form;

//require(['VueViewer'], function (VueViewer) {});

Vue.use(SmartTable)
Vue.use(ToggleButton)
Vue.use(VueSweetalert2)
Vue.use(VueViewer)
Vue.config.productionTip = false
//Vue.use(cargadorImagenes);

var vue_app = new Vue({
  el: '#app',
  router,
  menu:0,
  components: { App},
  template: '<App/>'
})
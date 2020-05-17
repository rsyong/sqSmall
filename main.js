import Vue from 'vue'
import App from './App'
import {request} from './common/js/request.js'
import {goBack} from './common/js/untils.js'
import stars from './wxcomponents/stars.vue'
Vue.config.productionTip = false

Vue.prototype.request=request;
Vue.prototype.goBack=goBack;
Vue.component("stars",stars);
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()

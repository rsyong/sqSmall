import Vue from 'vue'
import App from './App'
import {request} from './common/js/request.js'
import {goBack} from './common/js/untils.js'
Vue.config.productionTip = false

Vue.prototype.request=request;
Vue.prototype.goBack=goBack;
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()

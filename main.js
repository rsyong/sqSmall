import Vue from 'vue'
import App from './App'
import {request} from './common/js/request.js'
import {goBack} from './common/js/untils.js'
import stars from './wxcomponents/stars.vue'
import myNull from './wxcomponents/myNull/myNull.vue'
Vue.config.productionTip = false

Vue.prototype.request=request;
Vue.prototype.goBack=goBack;
Vue.prototype.baseURL='http://106.55.3.190';
Vue.prototype.baseURLImg='http://106.55.3.190';
Vue.component("stars",stars);
Vue.component("myNull",myNull);
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()

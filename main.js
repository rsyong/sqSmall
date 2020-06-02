import Vue from 'vue'
import App from './App'
import {request} from './common/js/request.js'
import {goBack} from './common/js/untils.js'
import stars from './wxcomponents/stars.vue'
import myNull from './wxcomponents/myNull/myNull.vue'
Vue.config.productionTip = false

Vue.prototype.request=request;
Vue.prototype.goBack=goBack;
Vue.prototype.baseURL='http://wanjiaguopin.com';
Vue.prototype.baseURLImg='http://wanjiaguopin.com';
Vue.component("stars",stars);
Vue.component("myNull",myNull);

Vue.filter('manyJin', function (value) {
	if (!value) return '';
	let price=Number(value.price || 0);
	let hair=Number(value.hair || 0);
	let monye=(price/hair).toFixed(2);
	return monye;
})

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()

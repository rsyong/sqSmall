<script>
	import {
		getAllNum
	} from './common/js/untils.js'
	export default {
		globalData: {
			appid: '',
			appSecret: '',
			token: '', //全局token
			goodsAllNum: 0, //全局购物车数量
			userInfo: {}, //全局用户信息 后台返回
			orderInfo: [], //购物车下单信息
			scene:1101
		},
		data() {
			return {
				provider: '',
				loginRes: ''
			}
		},
		onLaunch: function() {
			var launch=wx.getLaunchOptionsSync();
			this.globalData.scene=launch.scene;
			//第一次启动
			// uni.getProvider({
			//     service: 'oauth',
			//     success:(res) => {
			// 		this.provider=res.provider[0];
			// 		this.login();
			//     }
			// });
		},
		onShow: function() {
			//打开
			// uni.setTabBarBadge({
			// 	index:2,
			// 	text:'9'
			// })
		},
		onHide: function() {
			//关闭
		},
		/**
		 * 用户点击右上角分享
		 */
		
	}
</script>

<style>
	@import "/wxcomponents/vant/dist/common/index.wxss";
	@import "/static/font/iconfont.css";

	page {
		font-size: 14px;
		background-color: #f2f2f2;
		color: #333;
	}

	.flex {
		display: flex;
		flex: 1;
	}

	.flex1 {
		flex: 1;
	}

	.flex-column {
		flex-direction: column;
	}

	.just-between {
		justify-content: space-between;
	}

	.just-around {
		justify-content: space-around;
	}

	.just-center {
		justify-content: center;
	}

	.align-center {
		align-items: center;
	}

	.align-between {
		align-content: space-between;
	}

	.pad-center-10 {
		padding: 0 10px;
	}

	.mag-center-10 {
		margin: 0 10px;
	}

	.mt-10 {
		margin-top: 10px;
	}

	.mb-5 {
		margin-bottom: 5px;
	}

	.mb-10 {
		margin-bottom: 10px;
	}

	.mr-10 {
		margin-right: 10px;
	}

	.mr-5 {
		margin-right: 5px;
	}

	.only-line-1 {
		overflow: hidden;
		word-break: break-all;
		/* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 1;
		/** 显示的行数 **/
		/* white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden; */
	}

	.only-line-2 {
		overflow: hidden;
		word-break: break-all;
		/* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2;
		/** 显示的行数 **/
	}

	.price {
		font-size: 10px;
		color: #E4A711;
	}

	.price-monye {
		font-size: 14px;
	}

	.my-color {
		color: #E4A711;
	}

	.my-background {
		background-color: #E4A711;
		background: linear-gradient(to right, #F6C252, #E7A40D);
	}

	.my-button {
		color: #fff;
		border-radius: 25px;
		font-size: 14px;
	}

	button:after {
		border: none;
	}

	.uni-navbar--border {
		border-bottom-color: #E7A40D !important;
	}

	view.van-count-down {
		color: #ED5758;
		font-size: 10px;
	}

	.sp-list-weight {
		font-size: 10px;
		color: #888;
	}

	.sp-list-time {
		font-size: 10px;
	}

	.sp-list-img image {
		width: 227rpx;
		height: 227rpx;
		border-radius: 6px;
		margin-right: 10px;
	}

	.nav-tuijan {
		margin-top: 15px;
		font-size: 18px;
		font-weight: bold;
	}

	.nav-tuijan-title {
		margin: 0 8px;
	}

	.starating {
		color: #E1B12D;
	}

	.business {
		color: #35BD13;
		margin-right: 5px;
	}

	.shadow-1 {
		box-shadow: 0px 0px 5px #ddd;
	}

	.shadow {
		box-shadow: 0px 0px 5px #bbb;
	}

	.dots-1 {
		width: 3px;
		height: 3px;
		border-radius: 50%;
		background-color: #FCB71E;
		box-shadow: 0px 0px 2px #FCB71E;
		margin: 0 3px;
	}

	.dots-2 {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background-color: #FCB71E;
		box-shadow: 0px 0px 2px #FCB71E;
		margin: 0 3px;
	}

	.dots-3 {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: #FCB71E;
		box-shadow: 0px 0px 2px #FCB71E;
		margin: 0 3px;
	}
</style>

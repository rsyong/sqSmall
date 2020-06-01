<script>
import {getAllNum} from './common/js/untils.js'
export default {
	globalData:{
		appid:'wx99e7a5d35d7d086d',
		appSecret:'8514346960e863e5748524da781cb984',
		token:'', //全局token
		goodsAllNum:0, //全局购物车数量
		userInfo:{}, //全局用户信息 后台返回
		orderInfo:[], //购物车下单信息
	},
	data() {
		return {
			provider:'',
			loginRes:''
		}
	},
	onLaunch: function() {
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
	methods:{
		//获取设备信息
		login(){
			uni.login({
			    provider: this.provider,
			    success: (loginRes) => {
					this.loginRes=loginRes;
					this.getUserInfo();
			    }
			});
		},
		getUserInfo(){
			uni.getSetting({
				success:(res)=>{
					if (res.authSetting['scope.userInfo']) {
					  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
						uni.getUserInfo({
							success: (res) => {
								this.globalData.myuserInfo=res.userInfo;
								this.getOpenId(res);
							}
						})
					}
				}
			})
		},
		getOpenId(data){
			this.request(this.baseURL+'/api/login/login',{
				code:this.loginRes.code,
				iv:data.iv,
				encryptedData:data.encryptedData
			},{method:'POST'}).then(res=>{
				this.globalData.token=res.token;
				uni.hideLoading();
				this.getShoppingList();
				this.getInfo();
			}).catch(err=>{
				uni.hideLoading();
				uni.showToast({title: err});
			})
		},
		//获取商品列表
		getShoppingList(){
			this.request(this.baseURL+"/api/cart/getList",{
				page:1,
				size:10
			},{method:'GET'}).then(res=>{
				this.globalData.goodsAllNum=getAllNum(res.cart_list);
				if(this.globalData.goodsAllNum==0) return;
				uni.setTabBarBadge({
					index:3,
					text:this.globalData.goodsAllNum+''
				})
			}).catch(err=>{
				
			})
		},
		//获取详细信息
		getInfo(){
			this.request(this.baseURL+"/api/personal/getUserInfo",{
				
			},{method:'GET'}).then(res=>{
				uni.hideLoading();
				this.globalData.userInfo=res;
			}).catch(err=>{
				uni.hideLoading();
				uni.showToast({title: err});
			})
		},
	}
};
</script>

<style>
	@import "/wxcomponents/vant/dist/common/index.wxss";
	@import "/static/font/iconfont.css";
	page{
		font-size: 14px;
		background-color: #f2f2f2;
		color: #333;
	}
	.flex{
		display: flex;
		flex: 1;
	}
	.flex1{
		flex: 1;
	}
	.flex-column{
		flex-direction: column;
	}
	.just-between{
		justify-content: space-between;
	}
	.just-around{
		justify-content: space-around;
	}
	.just-center{
		justify-content: center;
	}
	.align-center{
		align-items: center;
	}
	.align-between{
		align-content: space-between;
	}
	.pad-center-10{
		padding: 0 10px;
	}
	.mag-center-10{
		margin: 0 10px;
	}
	.mt-10{
		margin-top: 10px;
	}
	.mb-5{
		margin-bottom: 5px;
	}
	.mb-10{
		margin-bottom: 10px;
	}
	.mr-10{
		margin-right: 10px;
	}
	.only-line-1{
		overflow: hidden;
		word-break: break-all;  /* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;  /* 超出部分省略号 */
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 1; /** 显示的行数 **/
		/* white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden; */
	}
	.only-line-2{
		overflow: hidden;
		word-break: break-all;  /* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;  /* 超出部分省略号 */
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2; /** 显示的行数 **/
	}
	.price{
		font-size: 10px;
		color: #E4A711;
	}
	.price-monye{
		font-size: 14px;
	}
	.my-color{
		color: #E4A711;
	}
	.my-background{
		background-color: #E4A711;
		background: linear-gradient(to right,#F6C252,#E7A40D);
	}
	.my-button{
		color: #fff;
		border-radius: 25px;
		font-size: 14px;
	}
	button:after{
		border: none;
	}
	
	.uni-navbar--border{
		border-bottom-color: #000 !important;
	}
	view.van-count-down{
		color: #ED5758;
		font-size: 10px;
	}
	
	.sp-list-weight{
		font-size: 10px;
		color: #888;
	}
	.sp-list-time{
		font-size: 10px;
	}
	.sp-list-img image{
		width: 227rpx;
		height: 227rpx;
		border-radius: 6px;
		margin-right: 10px;
	}
	.nav-tuijan{
		margin-top: 15px;
		font-size: 18px;
		font-weight: bold;
	}
	.starating{
		color: #E1B12D;
	}
	.business{
		color: #35BD13;
		margin-right: 5px;
	}
</style>

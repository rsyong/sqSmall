<template>
	<view>
		<uni-nav-bar title="个人中心" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<view class="back-view"><view class="back-qiu"></view></view>
		<view class="cras flex just-center">
			<view class="user-img">
				<button @getuserinfo="userInfo" open-type="getUserInfo" plain class="user-button">
					<image :src="myuserInfo.avatarUrl"></image>
					<view class="v flex">
						<view>V</view>
						<view>已绑定</view>
					</view>
				</button>
			</view>
			<view class="morn flex just-center align-center">></view>
		</view>
		<view class="order flex just-around align-center">
			<view>
				<view>全部订单</view>
			</view>
			<view>
				<view>待确认</view>
			</view>
			<view>
				<view>待收货</view>
			</view>
			<view>
				<view>售后</view>
			</view>
		</view>
		<view class="mt-10">
			<uni-list>
			    <uni-list-item title="联系客服"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:'http://img3.imgtn.bdimg.com/it/u=372372667,1126179944&fm=26&gp=0.jpg',
				provider:'',
				myuserInfo:{
					avatarUrl:''
				}
			}
		},
		onLoad(){
			uni.getProvider({
			    service: 'oauth',
			    success:(res) => {
					this.provider=res.provider[0];
					this.login();
			    }
			});
		},
		methods: {
			login(){
				uni.showLoading({title: '加载中'});
				uni.login({
				    provider: this.provider,
				    success: (loginRes) => {
						this.getOpenId(loginRes.code);
						this.getUserInfo();
				    },
					fail:err=>{
						uni.hideLoading();
						uni.showToast({title: '登录失败了'});
					}
				});
			},
			getOpenId(code){
				var appid=getApp().globalData.appid;
				var appSecret=getApp().globalData.appSecret;
				var JSCODE=code;
				var url='https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+appSecret+'&js_code='+JSCODE+'&grant_type=authorization_code';
				this.request(url,{},{method:'GET'}).then(res=>{
					uni.hideLoading();
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err});
				})
			},
			getUserInfo(){
				// 查看是否授权
				uni.authorize({
				    scope: 'scope.userInfo',
				    success:(res) => {
						uni.getUserInfo({
							success: (res) => {
								this.myuserInfo=res.userInfo;
							}
						})
				    }
				})
			},
			//用户回调
			userInfo(e){
				this.myuserInfo=e.detail.userInfo;
			}
		}
	}
</script>

<style>
	.uni-navbar--border{
		border-bottom-color: #000 !important;
	}
	.back-view{
		width: 100%;
		overflow: hidden;
	}
	.back-qiu{
		width: 150%;
		height: 300px;
		border-radius: 60%;
		background-color: #000;
		position: relative;
		margin-top: -170px;
		margin-left: -25%;
		z-index: -1;
	}
	.cras{
		margin: 10px;
		background-color: #F0AD4E;
		border-radius: 6px;
		height: 170px;
		margin-top: -120px;
		position: relative;
	}
	.user-img{
		margin-top: 15px;
		height: 69px;
		position: relative;
	}
	.user-img image{
		width: 65px;
		height: 65px;
		border-radius: 50%;
		border: 2px solid #ff5500;
	}
	.user-button{
		border: none !important;
	}
	.morn{
		position: absolute;
		right: 0;
		top: 10px;
		background-color: #3C3E49;
		color: #ff5500;
		border-top-left-radius: 14px;
		border-bottom-left-radius: 14px;
		width: 25px;
		height: 25px;
		text-indent: 5px;
	}
	.v{
		position: absolute;
		bottom: 0;
		width: 70px;
		left: 35px;
	}
	.order{
		height: 100px;
		background-color: #fff;
		border-bottom: 1px solid #e0e0e0;
	}
</style>

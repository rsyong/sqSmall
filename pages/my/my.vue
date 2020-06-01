<template>
	<view>
		<uni-nav-bar title="个人中心" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<view class="back-view"><view class="back-qiu"></view></view>
		<view class="cras flex just-center">
			<image class="cras-back" src="/static/image/back2.jpg" mode="aspectFill"></image>
			<view class="user-img">
				<button @getuserinfo="userInfo" open-type="getUserInfo" plain class="user-button">
					<image :src="myuserInfo.avatarUrl" v-if="myuserInfo.avatarUrl"></image>
					<view v-else class="authorization">点击登录</view>
				</button>
				<view class="v flex">
					<view class="v-text" v-if="myuserInfo.is_auth==1">
						<view class="iconfont icon-v"></view>
					</view>
					<view v-if="myuserInfo.is_auth==1">已认证</view>
					<view v-else style="text-align: center;" class="flex just-center">未认证</view>
				</view>
			</view>
			<view class="morn flex just-center align-center" @click="toPersonal">
				<uni-icons type="arrowright" size="14" color="#D2B85B"></uni-icons>
			</view>
		</view>
		<view class="order flex just-around align-center">
			<view class="flex just-center align-center flex-column" @click="toOrder(0)">
				<view class="iconfont icon-dingdan my-icon"></view>
				<view>全部订单</view>
			</view>
			<view class="flex just-center align-center flex-column" @click="toOrder(1)">
				<view class="iconfont icon-dengdaiqueren my-icon"></view>
				<view>待确认</view>
			</view>
			<view class="flex just-center align-center flex-column" @click="toOrder(2)">
				<view class="iconfont icon-daishouhuo my-icon"></view>
				<view>待收货</view>
			</view>
			<view class="flex just-center align-center flex-column" @click="makePhoneCall">
				<view class="iconfont icon-shouhou my-icon"></view>
				<view>售后</view>
			</view>
		</view>
		<view class="mt-10">
			<uni-list>
			    <uni-list-item title="联系客服" @click="makePhoneCall"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				provider:'',
				myuserInfo:{},
				loginRes:'',
			}
		},
		onLoad(){
			if(getApp().globalData.token){
				if(getApp().globalData.userInfo.is_auth==1){
					return this.myuserInfo=getApp().globalData.userInfo
				}else{
					return this.getInfo();
				}
			}
		},
		methods: {
			//用户回调
			userInfo(e){
				if(getApp().globalData.token){
					if(getApp().globalData.userInfo.is_auth!=1){
						uni.navigateTo({
							url:'../personal/personal'
						})
					}
					return;
				}
				if(e.detail.errMsg=="getUserInfo:fail auth deny") return;
				// this.myuserInfo=e.detail.userInfo;
				uni.showLoading({title:"加载中..."});
				uni.login({
				    provider: this.provider,
				    success: (loginRes) => {
						this.loginRes=loginRes;
						this.getOpenId(e.detail);
				    }
				});
			},
			//获取token
			getOpenId(data){
				this.request(this.baseURL+'/api/login/login',{
					code:this.loginRes.code,
					iv:data.iv,
					encryptedData:data.encryptedData
				},{method:'POST'}).then(res=>{
					getApp().globalData.token=res.token;
					this.getInfo();
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,image:'../../static/image/error.png'});
				})
			},
			//获取详细信息
			getInfo(){
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/personal/getUserInfo",{
					
				},{method:'GET'}).then(res=>{
					uni.hideLoading();
					this.myuserInfo=res;
					getApp().globalData.userInfo=res;
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,image:'../../static/image/error.png'});
				})
			},
			//拨打电话
			makePhoneCall(){
				const phone="18502319565";
				uni.showModal({
				    title: '客服电话',
				    content: phone,
					confirmText:'立即拨打',
				    success:(res) => {
				        if (res.confirm) {
				            uni.makePhoneCall({
				            	phoneNumber:phone
				            })
				        }
				    }
				});
			},
			//认证
			toPersonal(){
				if(getApp().globalData.token){
					uni.navigateTo({
						url:'../personal/personal'
					})
				}else{
					uni.showToast({title: "请先登录！",image:'../../static/image/error.png'});
				}
			},
			//跳转订单
			toOrder(pageNum=0){
				uni.navigateTo({
					url:'../order/order?pageNum='+pageNum
				})
			},
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
		background-color: #6C5C3B;
		border-radius: 8px;
		height: 170px;
		margin-top: -120px;
		position: relative;
		overflow: hidden;
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
		border: 2px solid #B79650;
	}
	.authorization{
		color: #D2B85B;
		line-height: 65px;
		font-size: 13px;
		width: 65px;
		height: 65px;
		border-radius: 50%;
		border: 2px solid #B79650;
	}
	.user-button{
		border: none !important;
	}
	.morn{
		position: absolute;
		right: 0;
		top: 10px;
		background-color: rgba(22,18,15,.8);
		color: #D2B85B;
		border-top-left-radius: 14px;
		border-bottom-left-radius: 14px;
		width: 30px;
		height: 30px;
		text-indent: 6px;
	}
	.v{
		position: absolute;
		bottom: 0;
		width: 60px;
		height: 15px;
		line-height: 15px;
		left: 47px;
		background-color: rgba(86,71,38,.8);
		font-size: 10px;
		border-radius: 15px;
		color: #D2B85B;
	}
	.v-text{
		width: 15px;
		height: 15px;
		line-height: 15px;
		border-radius: 15px;
		background-color: #FFFFFF;
		color: #757575;
		text-align: center;
		margin-right: 5px;
	}
	.order{
		height: 95px;
		background-color: #fff;
		border-bottom: 1px solid #e0e0e0;
	}
	.cras-back{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
	.my-icon{
		font-size: 22px;
		color: #EEBD5E;
		margin-bottom: 3px;
	}
	.icon-v{
		font-size: 10px;
	}
</style>

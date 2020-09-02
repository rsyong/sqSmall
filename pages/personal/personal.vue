<template>
	<view>
		<uni-nav-bar @clickLeft="goBack" title="个人资料" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#E7A40D"></uni-nav-bar>
		<view class="my-list shadow-1">
			<uni-list>
			    <uni-list-item title="用户头像" @click="getUserImg">
					<template v-slot:right="">
						<image class="user-img" :src="myuserInfo.avatar" mode="aspectFill"></image>
					</template>
				</uni-list-item>
			    <uni-list-item title="用户名" :show-arrow="false">
					<template v-slot:right="">
						<input type="text" v-model="myuserInfo.wechat_name" class="my-input" />
					</template>
				</uni-list-item>
				<uni-list-item title="绑定手机号" :show-arrow="false">
					<template v-slot:right="">
						<!-- <input type="number" v-model="myuserInfo.mobile" class="my-input" /> -->
						<text v-if="myuserInfo.mobile" style="line-height: 22px;">{{myuserInfo.mobile}}</text>
						<button v-else class="get-phone" open-type="getPhoneNumber" @getphonenumber="getphonenumber">点击获取手机号</button>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		
		<!-- <view style="height: 10px;"></view> -->
		<view class="my-list shadow-1">
			<uni-list>
			    <uni-list-item title="店铺名" :show-arrow="false">
					<template v-slot:right="">
						<input type="text" placeholder="请录入" v-model="myuserInfo.shop_name" class="my-input" maxlength="20" />
					</template>
				</uni-list-item>
			    <uni-list-item title="店铺联系人" :show-arrow="false">
					<template v-slot:right="">
						<input type="text" placeholder="请录入" v-model="myuserInfo.shop_nickname" class="my-input" maxlength="10" />
					</template>
				</uni-list-item>
				<uni-list-item title="联系人手机号" :show-arrow="false">
					<template v-slot:right="">
						<input type="number" placeholder="请录入" v-model="myuserInfo.shop_mobile" class="my-input" maxlength="11" />
					</template>
				</uni-list-item>
				<uni-list-item title="店铺地址" :show-arrow="false">
					<template v-slot:right="">
						<picker @change="box" mode="region">
							<view>{{myuserInfo.shop_city || '选择城市'}}</view>
						</picker>
						<!-- <view class="my-input">{{myuserInfo.name || '选择地址'}}</view> -->
					</template>
				</uni-list-item>
				<textarea  v-model="myuserInfo.shop_address" class="textarea" placeholder="请输入店铺详细地址" maxlength="80"></textarea>
			</uni-list>
		</view>
		<button class="my-buttom-s" @click="toCertification">{{myuserInfo.is_auth==1 ? '更新资料' :'提交认证'}}</button>
		<!-- <view class="my-buttom">
			<view class="my-buttom-view flex just-center">
				<button class="my-buttom-s" @click="goHome">进入商场</button>
				<button class="my-buttom-s" @click="toCertification">{{myuserInfo.is_auth==1 ? '更新资料' :'马上认证'}}</button>
			</view>
		</view> -->
	</view>
</template>

<script>
	import {rqusetFile} from '../../common/js/request.js'
	export default {
		data() {
			return {
				myuserInfo:{
					shop_city:'',
					mobile:''
				},
				oldMyuserInfo:{},
				data: '',
				provider:'',
				loginRes:''
			}
		},
		onLoad(){
			this.getInfo();
			this.getProvider()
		},
		methods: {
			box: function(e) {
				this.data = e.target.value.join('')
				this.myuserInfo.shop_city=this.data;
			},
			//获取设备信息
			getProvider(){
				uni.getProvider({
				    service: 'oauth',
				    success:(res) => {
						this.provider=res.provider[0];
				    }
				});
			},
			//选择头像
			getUserImg(){
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: (res) => {
						this.uploadImage(res.tempFilePaths[0])
				    }
				});
			},
			//上传头像
			uploadImage(filePath){
				uni.showLoading({title:"加载中..."});
				rqusetFile(this.baseURL+'/api/upload/image',{
					filePath
				}).then(res=>{
					uni.hideLoading();
					this.myuserInfo.avatar=res.path;
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,icon:'none'});
				})
			},
			//获取手机号
			getphonenumber(e){
				if(e.detail.errMsg=="getPhoneNumber:fail user deny") return;
				this.login(e.detail);
			},
			login(data){
				uni.login({
				    provider: this.provider,
				    success: (loginRes) => {
						this.loginRes=loginRes;
						this.getToken(data);
				    }
				});
			},
			//获取token
			getToken(data){
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+'/api/personal/storePhone',{
					code:this.loginRes.code,
					iv:data.iv,
					encryptedData:data.encryptedData
				},{method:'POST'}).then(res=>{
					this.myuserInfo.mobile=res.phone
					uni.hideLoading();
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err});
				})
			},
			//认证
			toCertification(){
				let isphone=/^1(3|4|5|6|7|8|9)\d{9}$/;
				if(!this.myuserInfo.wechat_name){
					return uni.showToast({title: '请输用户名',icon:'none'});
				}
				if(!this.myuserInfo.mobile){
					return uni.showToast({title: '请输手机号',icon:'none'});
				}
				if(!isphone.test(this.myuserInfo.mobile)){
					return uni.showToast({title: '手机号有误',icon:'none'});
				}
				if(!this.myuserInfo.mobile){
					return uni.showToast({title: '请输手机号',icon:'none'});
				}
				if(!this.myuserInfo.shop_name){
					return uni.showToast({title: '请输入店铺',icon:'none'});
				}
				if(!this.myuserInfo.shop_nickname){
					return uni.showToast({title: '请输联系人',icon:'none'});
				}
				if(!this.myuserInfo.shop_mobile){
					return uni.showToast({title: '请输手机号',icon:'none'});
				}
				if(!isphone.test(this.myuserInfo.shop_mobile)){
					return uni.showToast({title: '手机号有误',icon:'none'});
				}
				if(!this.myuserInfo.shop_city){
					return uni.showToast({title: '请选择城市',icon:'none'});
				}
				if(!this.myuserInfo.shop_address){
					return uni.showToast({title: '请输详细地址',icon:'none'});
				}
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/personal/updateMessage",this.myuserInfo,{method:'POST'}).then(res=>{
					uni.hideLoading();
					if(this.myuserInfo.avatar!=this.oldMyuserInfo.avatar){
						const pages = getCurrentPages()
						const perpage = pages[pages.length - 2]
						if (perpage == undefined || perpage == null) return;
						getApp().globalData.userInfo.is_auth=0;
						perpage.onLoad();
						getApp().globalData.userInfo.is_auth=1;
					}
					if(this.myuserInfo.is_auth!=1){
						uni.navigateTo({
							url:"certification/certification"
						})
					}else{
						uni.showToast({
							title:res
						})
					}
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,icon:'none'});
				})
			},
			//获取详细信息
			getInfo(){
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/personal/getUserInfo",{
					
				},{method:'GET'}).then(res=>{
					uni.hideLoading();
					this.myuserInfo=res;
					this.oldMyuserInfo={...res};
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,icon:'none'});
				})
			},
			//进入商场
			goHome(){
				uni.switchTab({
					url:'../home/home'
				})
			}
		}
	}
</script>

<style>
	.user-img{
		width: 40px;
		height: 40px !important;
		border-radius: 50%;
	}
	.my-input{
		text-align: right;
	}
	.textarea{
		height: 80px;
		width: 100%;
		padding: 10px 30rpx;
		box-sizing: border-box;
	}
	.my-buttom{
		height: 50px;
	}
	.my-buttom-view{
		position: fixed;
		width: 100%;
		height: 50px;
		bottom: 0;
		left: 0;
		background-color: #fff;
		border-top: 1px solid #F4F4F4;
	}
	.my-buttom-s{
		height: 50px;
		line-height: 50px;
		text-align: center;
		margin: 12px;
		border-radius: 6px;
		background-color: #E7A40D;
		color: #fff;
		margin-top: 26px;
	}
	.rz{
		color: #fff;
	}
	button::after{
		border: none;
	}
	.get-phone{
		font-size: 14px;
		background-color: #fff;
		padding-right: 0;
	}
	.my-list{
		margin: 12px;
		border-radius: 8px;
		overflow: hidden;
	}
</style>

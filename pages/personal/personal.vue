<template>
	<view>
		<uni-nav-bar @clickLeft="goBack" title="个人信息" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<uni-list>
		    <uni-list-item title="头像" @click="getUserImg">
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
					<input type="number" v-model="myuserInfo.mobile" class="my-input" />
				</template>
			</uni-list-item>
		</uni-list>
		<view style="height: 10px;"></view>
		<uni-list>
		    <uni-list-item title="店铺名称" :show-arrow="false">
				<template v-slot:right="">
					<input type="text" placeholder="请录入" v-model="myuserInfo.shop_name" class="my-input" maxlength="20" />
				</template>
			</uni-list-item>
		    <uni-list-item title="联系人" :show-arrow="false">
				<template v-slot:right="">
					<input type="text" placeholder="请录入" v-model="myuserInfo.shop_nickname" class="my-input" maxlength="10" />
				</template>
			</uni-list-item>
			<uni-list-item title="联系人手机号" :show-arrow="false">
				<template v-slot:right="">
					<input type="number" placeholder="请录入" v-model="myuserInfo.shop_mobile" class="my-input" maxlength="11" />
				</template>
			</uni-list-item>
			<uni-list-item title="选择城市" :show-arrow="false">
				<template v-slot:right="">
					<picker @change="box" mode="region">
						<view>{{myuserInfo.shop_city || '选择城市'}}</view>
					</picker>
					<!-- <view class="my-input">{{myuserInfo.name || '选择地址'}}</view> -->
				</template>
			</uni-list-item>
			<textarea  v-model="myuserInfo.shop_address" class="textarea" placeholder="店铺详细地址如街道、门牌号、小区等" maxlength="80"></textarea>
		</uni-list>
		<view class="my-buttom">
			<view class="my-buttom-view flex just-between">
				<button class="my-buttom-s" @click="goHome">进入商场</button>
				<button class="my-buttom-s rz" @click="toCertification">{{myuserInfo.is_auth==1 ? '更新资料' :'马上认证'}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {rqusetFile} from '../../common/js/request.js'
	export default {
		data() {
			return {
				myuserInfo:{
					shop_city:''
				},
				oldMyuserInfo:{},
				data: ''
			}
		},
		onLoad(){
			this.getInfo();
		},
		methods: {
			box: function(e) {
				this.data = e.target.value.join('')
				this.myuserInfo.shop_city=this.data;
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
					uni.showToast({title: err,image:'../../static/image/error.png'});
				})
			},
			//改变地址
			changeAdess(){
				uni.chooseLocation({
				    success: (res)=> {
						let myuserInfo={
							...this.myuserInfo,
							name:res.name,
							shop_address:res.address+res.name,
						}
						this.myuserInfo=myuserInfo;
				    }
				});
			},
			//认证
			toCertification(){
				let isphone=/^1(3|4|5|6|7|8|9)\d{9}$/;
				if(!this.myuserInfo.wechat_name){
					return uni.showToast({title: '请输入用户名',image:'../../static/image/error.png'});
				}
				if(!this.myuserInfo.mobile){
					return uni.showToast({title: '请输入绑定手机号',image:'../../static/image/error.png'});
				}
				if(!isphone.test(this.myuserInfo.mobile)){
					return uni.showToast({title: '绑定手机号格式有误',image:'../../static/image/error.png'});
				}
				if(!this.myuserInfo.mobile){
					return uni.showToast({title: '请输入绑定手机号',image:'../../static/image/error.png'});
				}
				if(!this.myuserInfo.shop_name){
					return uni.showToast({title: '请输入店铺名称',image:'../../static/image/error.png'});
				}
				if(!this.myuserInfo.shop_nickname){
					return uni.showToast({title: '请输入联系人',image:'../../static/image/error.png'});
				}
				if(!this.myuserInfo.shop_mobile){
					return uni.showToast({title: '请输入联系人手机号',image:'../../static/image/error.png'});
				}
				if(!isphone.test(this.myuserInfo.shop_mobile)){
					return uni.showToast({title: '绑定手机号格式有误',image:'../../static/image/error.png'});
				}
				if(!this.myuserInfo.shop_city){
					return uni.showToast({title: '请选择城市',image:'../../static/image/error.png'});
				}
				if(!this.myuserInfo.shop_address){
					return uni.showToast({title: '请输入详细地址',image:'../../static/image/error.png'});
				}
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/personal/updateMessage",this.myuserInfo,{method:'POST'}).then(res=>{
					uni.hideLoading();
					if(this.myuserInfo.is_auth!=1){
						uni.navigateTo({
							url:"certification/certification"
						})
					}
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
					this.oldMyuserInfo={...res};
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,image:'../../static/image/error.png'});
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
		flex: 1;
		height: 50px;
		line-height: 50px;
		text-align: center;
		border-radius: 0;
	}
	.rz{
		background-color: #ECB129;
		color: #fff;
	}
	button::after{
		border: none;
	}
</style>

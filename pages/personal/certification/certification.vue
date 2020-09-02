<template>
	<view>
		<uni-nav-bar @clickLeft="goBack" title="店铺认证" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#E7A40D"></uni-nav-bar>
		<view class="my-list shadow-1">
			<uni-list>
			    <uni-list-item title="邀请码" :show-arrow="false">
					<template v-slot:right="">
						<input type="text" placeholder="请输入邀请码" v-model="Alldata.code" class="my-input" maxlength="6" />
					</template>
				</uni-list-item>
			    <uni-list-item title="上传门头照片" :show-arrow="false" @click="getUserImg(1)">
					<template v-slot:right="">
						<view class="my-camera flex just-center align-center">
							<image :class="{defalut:Alldata.topImg.indexOf('http')==-1}" :src="Alldata.topImg" mode="aspectFill"></image>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item title="上传店内照片" :show-arrow="false" @click="getUserImg(2)">
					<template v-slot:right="">
						<view class="my-camera flex just-center align-center">
							<image :class="{defalut:Alldata.bottomImg.indexOf('http')==-1}" :src="Alldata.bottomImg" mode="aspectFill"></image>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<view  class="my-list shadow-1">
			<uni-list>
			    <uni-list-item title="公司名称" :show-arrow="false">
					<template v-slot:right="">
						<input type="text" placeholder="选填" v-model="Alldata.name" class="my-input" maxlength="20" />
					</template>
				</uni-list-item>
			    <uni-list-item title="法人" :show-arrow="false">
					<template v-slot:right="">
						<input type="text" placeholder="选填" v-model="Alldata.nickname" class="my-input" maxlength="20" />
					</template>
				</uni-list-item>
				<uni-list-item title="营业执照号" :show-arrow="false">
					<template v-slot:right="">
						<input type="text" placeholder="选填" v-model="Alldata.number" class="my-input" maxlength="20" />
					</template>
				</uni-list-item>
				<uni-list-item title="选择地址" :show-arrow="false" @click="changeAdess">
					<template v-slot:right="">
						<view class="flex1" style="max-width: 500rpx;">{{Alldata.address || '请选择地址'}}</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<button class="my-buttom-s" @click="toCertification">提交认证</button>
		<!-- <view class="my-buttom">
			<view class="my-buttom-view flex just-between">
				<button class="my-buttom-s rz" @click="toCertification">提交认证</button>
			</view>
		</view> -->
	</view>
</template>

<script>
	import {rqusetFile} from '../../../common/js/request.js';
	const topImg="/static/image/camera_full.png";
	const bottomImg="/static/image/camera_full.png";
	export default {
		data() {
			return {
				Alldata:{
					topImg:topImg,
					bottomImg:bottomImg,
					address:''
				}
			}
		},
		onLoad(){
			
		},
		methods: {
			changeAdess(){
				uni.chooseLocation({
				    success: (res)=> {
						this.Alldata.address=res.address+res.name
				    }
				});
			},
			//上传图片
			getUserImg(num){
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: (res) => {
						this.uploadImage(res.tempFilePaths[0],num)
				    }
				});
			},
			//上传头像
			uploadImage(filePath,num){
				uni.showLoading({title:"加载中..."});
				rqusetFile(this.baseURL+'/api/upload/image',{
					filePath
				}).then(res=>{
					uni.hideLoading();
					if(num==1){
						this.Alldata.topImg=res.path;
					}else{
						this.Alldata.bottomImg=res.path;
					}
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,icon:'none'});
				})
			},
			//提交认证
			toCertification(){
				let Alldata={...this.Alldata};
				if(!Alldata.code) return  uni.showToast({title: "请输入邀请码",icon:'none'});
				if(Alldata.topImg==topImg) return uni.showToast({title: "请上传门头照片",icon:'none'});
				if(Alldata.bottomImg==bottomImg) return uni.showToast({title: "请上传店内照片",icon:'none'});
				Alldata.image=Alldata.topImg;
				Alldata.images=[Alldata.bottomImg];
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/personal/authMerchant",Alldata,{method:'POST'}).then(res=>{
					uni.hideLoading();
					getApp().userInfo={
						is_auth:1
					}
					uni.showModal({
					    title: '提示',
					    content: '认证成功',
						showCancel:false,
					    success: function (res) {
					        uni.switchTab({
					            url: '../../my/my',
					            success: function(e) {
					                var page = getCurrentPages().pop();
					                if (page == undefined || page == null) return;
					                page.onLoad();
					            }
					        });
					    }
					});
					
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,icon:'none'});
				})
			}
		}
	}
</script>

<style>
	.my-input{
		text-align: right;
		max-width: 500rpx;
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
		background-color: #ECB129;
		color: #fff;
	}
	button::after{
		border: none;
	}
	.my-camera{
		width: 80px;
		height: 80px;
		border-radius: 8px;
		background-color: #f2f2f2;
		overflow: hidden;
	}
	.my-camera .defalut{
		width: 30px;
		height: 30px;
	}
	.my-list{
		margin: 12px;
		border-radius: 8px;
		overflow: hidden;
	}
</style>

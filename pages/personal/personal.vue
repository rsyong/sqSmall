<template>
	<view>
		<uni-nav-bar @clickLeft="goBack" title="个人信息" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<uni-list>
		    <uni-list-item title="头像" @click="getUserImg">
				<template v-slot:right="">
					<image class="user-img" :src="myuserInfo.avatarUrl" mode="widthFix"></image>
				</template>
			</uni-list-item>
		    <uni-list-item title="用户名" :show-arrow="false">
				<template v-slot:right="">
					<input type="text" :value="myuserInfo.nickName" class="my-input" />
				</template>
			</uni-list-item>
			<uni-list-item title="绑定手机号" :show-arrow="false">
				<template v-slot:right="">
					<input type="text" value="13594284610" class="my-input" />
				</template>
			</uni-list-item>
		</uni-list>
		<view style="height: 10px;"></view>
		<uni-list>
		    <uni-list-item title="店铺名称" :show-arrow="false">
				<template v-slot:right="">
					<input type="text" placeholder="请录入" class="my-input" maxlength="20" />
				</template>
			</uni-list-item>
		    <uni-list-item title="联系人" :show-arrow="false">
				<template v-slot:right="">
					<input type="text" placeholder="请录入" class="my-input" maxlength="10" />
				</template>
			</uni-list-item>
			<uni-list-item title="联系人手机号" :show-arrow="false">
				<template v-slot:right="">
					<input type="number" placeholder="请录入" class="my-input" maxlength="11" />
				</template>
			</uni-list-item>
			<uni-list-item title="选择地址" :show-arrow="false" @click="changeAdess">
				<template v-slot:right="">
					<view class="my-input">{{myuserInfo.name || '请选择地址'}}</view>
				</template>
			</uni-list-item>
			<textarea :value="myuserInfo.address" class="textarea" placeholder="店铺详细地址如街道、门牌号、小区等" maxlength="80"></textarea>
		</uni-list>
		<view class="my-buttom">
			<view class="my-buttom-view flex just-between">
				<button class="my-buttom-s">进入商场</button>
				<button class="my-buttom-s rz">马上认证</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myuserInfo:{}
			}
		},
		onLoad(){
			let {avatarUrl,nickName} = getApp().globalData.myuserInfo;
			let myuserInfo={
				avatarUrl,
				nickName
			}
			this.myuserInfo=myuserInfo;
			console.log(this.myuserInfo)
		},
		methods: {
			getUserImg(){
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: (res) => {
						this.myuserInfo.avatarUrl=[res.tempFilePaths];
				    }
				});
			},
			changeAdess(){
				uni.chooseLocation({
				    success: (res)=> {
						let myuserInfo={
							...this.myuserInfo,
							name:res.name,
							address:res.address+res.name,
						}
						this.myuserInfo=myuserInfo;
				    }
				});
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
		padding: 10px;
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

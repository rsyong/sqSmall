<template>
	<view>
		<uni-nav-bar @clickLeft="goBack" title="店铺认证" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<uni-list>
		    <uni-list-item title="邀请码" :show-arrow="false">
				<template v-slot:right="">
					<input type="number" placeholder="请输入邀请码" class="my-input" maxlength="6" />
				</template>
			</uni-list-item>
		    <uni-list-item title="上传门头照片" :show-arrow="false">
				<template v-slot:right="">
					<view class="my-camera flex just-center align-center">
						<image class="defalut" src="/static/image/camera_full.png"></image>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item title="上传店内照片" :show-arrow="false">
				<template v-slot:right="">
					<view class="my-camera flex just-center align-center">
						<image class="defalut" src="/static/image/camera_full.png"></image>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<view style="height: 10px;"></view>
		<uni-list>
		    <uni-list-item title="公司名称" :show-arrow="false">
				<template v-slot:right="">
					<input type="text" placeholder="选填" class="my-input" maxlength="20" />
				</template>
			</uni-list-item>
		    <uni-list-item title="法人" :show-arrow="false">
				<template v-slot:right="">
					<input type="text" placeholder="选填" class="my-input" maxlength="20" />
				</template>
			</uni-list-item>
			<uni-list-item title="营业执照号" :show-arrow="false">
				<template v-slot:right="">
					<input type="text" placeholder="选填" class="my-input" maxlength="20" />
				</template>
			</uni-list-item>
			<uni-list-item title="选择地址" :show-arrow="false" @click="changeAdess">
				<template v-slot:right="">
					<view class="flex1" style="max-width: 500rpx;">{{adress || '请选择地址'}}</view>
				</template>
			</uni-list-item>
		</uni-list>
		<view class="my-buttom">
			<view class="my-buttom-view flex just-between">
				<button class="my-buttom-s rz">提交认证</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				adress:''
			}
		},
		onLoad(){
			
		},
		methods: {
			changeAdess(){
				uni.chooseLocation({
				    success: (res)=> {
						this.adress=res.address+res.name;
				    }
				});
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
</style>

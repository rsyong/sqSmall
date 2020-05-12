<template>
	<view>
		<view class="sp-list flex just-between">
			<view class="sp-list-img">
				<image :src="imgUrl"></image>
			</view>
			<view>
				<view>我是标题我是博爱提我赛欧加上沙口路基础课</view>
				<view class="sp-list-weight">约13斤</view>
				<view class="flex just-between">
					<view>***</view>
				</view>
				<view>标国精选</view>
			</view>
		</view>
		<view class="sp-list flex just-between">
			<view class="sp-list-img">
				<image :src="imgUrl"></image>
			</view>
			<view>
				<view>我是标题我是博爱提我赛欧加上沙口路基础课</view>
				<view class="sp-list-weight">约13斤</view>
				<view class="flex just-between">
					<view>***</view>
				</view>
				<view>标国精选</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:'http://img3.imgtn.bdimg.com/it/u=372372667,1126179944&fm=26&gp=0.jpg'
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.sp-list{
		background-color: #FFFFFF;
		border-radius: 6px;
		padding: 10px;
		margin-top: 10px;
	}
</style>

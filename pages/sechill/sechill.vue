<template>
	<view>
		<uni-nav-bar @clickLeft="goBack" status-bar background-color="#000" fixed>
		    <view class="my-nav">精品秒杀</view>
		</uni-nav-bar>
		<view class="content">
			<view class="sp-list flex just-between">
				<view class="sp-list-img">
					<image :src="imgUrl"></image>
				</view>
				<view>
					<view>我是标题我是博爱提我赛欧加上沙口路基础课</view>
					<view class="sp-list-weight">约13斤</view>
					<view class="sp-list-time">距离结束 <text>03:40:50</text></view>
					<view class="flex just-between">
						<view>***</view>
						<button type="default">抢购</button>
					</view>
				</view>
			</view>
			<view class="sp-list flex just-between">
				<view class="sp-list-img">
					<image :src="imgUrl"></image>
				</view>
				<view>
					<view>我是标题我是博爱提我赛欧加上沙口路基础课</view>
					<view class="sp-list-weight">约13斤</view>
					<view class="sp-list-time">距离结束 <text>03:40:50</text></view>
					<view class="flex just-between">
						<view>***</view>
						<button type="default">抢购</button>
					</view>
				</view>
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
	.content{
		margin: 10px;
	}
	.sp-list{
		background-color: #FFFFFF;
		border-radius: 6px;
		padding: 10px;
		margin-bottom: 10px;
	}
	.sp-list-img image{
		width: 100px;
		height: 100px;
		border-radius: 6px;
		margin-right: 10px;
	}
</style>

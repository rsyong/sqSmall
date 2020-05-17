<template>
	<view>
		<!-- <uni-nav-bar @clickLeft="goBack" status-bar background-color="#000" fixed>
		    <view class="my-nav">精品秒杀</view>
		</uni-nav-bar> -->
		<uni-nav-bar @clickLeft="goBack" title="精品秒杀" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<view class="content">
			<view class="sp-list flex just-between">
				<view class="sp-list-img">
					<image :src="imgUrl"></image>
				</view>
				<view>
					<view>我是标题我是博爱提我赛欧加上沙口路基础课</view>
					<view class="sp-list-weight">约13斤</view>
					<view class="sp-list-time">距离结束 <text>03:40:50</text></view>
					<view class="flex just-between sp-bottom">
						<view class="flex1 stars"><stars /></view>
						<button class="sp-my-bottom" type="default">
							抢购
							<view class="progress">
								<progress percent="20" show-info stroke-width="3" border-radius="10" font-size="8" activeColor="#FEFFF7" backgroundColor="#F9B6A3" active />
							</view>
						</button>
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
					<view class="flex just-between sp-bottom">
						<view class="flex1 stars"><stars /></view>
						<button class="sp-my-bottom" type="default">
							抢购
							<view class="progress">
								<progress percent="20" show-info stroke-width="3" border-radius="5" font-size="8" activeColor="#FEFFF7" backgroundColor="#F9B6A3" active />
							</view>
						</button>
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
	.sp-bottom{
		align-items: flex-end;
	}
	button.sp-my-bottom{
		background-color: #F9663D;
		width: 100px;
		height: 45px;
		color: #fff;
		font-size: 12px;
	}
	.stars{
		margin-bottom: 20px;
	}
	.progress{
		margin-top: -8px;
	}
</style>

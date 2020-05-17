<template>
	<view>
		<uni-nav-bar @clickLeft="goBack" title="我的订单" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<van-tabs :active="active" @change="onChange" color="#F9BC2D" swipe-threshold="5" animated sticky swipeable>
			<van-tab :title="item.content" v-for="(item,index) in info" :key="index">
				<view class="content">
					<view class="sp-list flex just-between align-center" @click="gotoDetails">
						<view class="sp-list-detiles flex just-between">
							<view class="sp-list-img">
								<image :src="imgUrl"></image>
							</view>
							<view class="flex flex-column just-between">
								<view class="flex1 only-line-2">我是标题我是博爱提我赛欧加上沙口路基础课爱提我赛欧加上沙口路基础课</view>
								<view class="flex sp-list-weight align-center">约13斤</view>
								<view class="flex just-between align-center">
									<stars />
								</view>
							</view>
						</view>
					</view>
				</view>
			</van-tab>
		</van-tabs>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:0,
				info: [{
					content: '全部'
				}, {
					content: '待确认'
				}, {
					content: '待收货'
				}, {
					content: '已完成'
				}, {
					content: '已取消'
				}],
				imgUrl:'http://img3.imgtn.bdimg.com/it/u=372372667,1126179944&fm=26&gp=0.jpg',
			}
		},
		onLoad(option) {
			this.active=Number(option.pageNum);
		},
		methods: {
			onChange(){
				
			},
			gotoDetails(){
				uni.navigateTo({
					url:"../shoppingDetails/shoppingDetails"
				})
			}
		}
	}
</script>

<style>
	.content{
		padding: 10px;
		background-color: #fff;
		box-sizing: border-box;
	}
	.sp-list{
		margin-bottom: 10px;
	}
</style>

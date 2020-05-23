<template>
	<view>
		<!-- <uni-nav-bar @clickLeft="goBack" status-bar background-color="#000" fixed>
		    <view class="my-nav">精品秒杀</view>
		</uni-nav-bar> -->
		<uni-nav-bar @clickLeft="goBack" title="精品秒杀" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<view class="content">
			<view class="sp-list flex just-between" v-for="(item,index) in shoppingList" :key="index">
				<view class="sp-list-img">
					<image :src="item.image"></image>
				</view>
				<view class="flex1">
					<view>{{item.name}}</view>
					<view class="sp-list-weight">约{{item.sale_num}}斤</view>
					<view class="sp-list-weight">距离结束 <text>03:40:50</text></view>
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
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1,
				size:10,
				shoppingList:[],
				imgUrl:'http://img3.imgtn.bdimg.com/it/u=372372667,1126179944&fm=26&gp=0.jpg'
			}
		},
		onLoad(){
			this.getShoppingList();
		},
		methods: {
			//获取商品列表
			getShoppingList(){
				this.request(this.baseURL+"/api/goods/getKillGoods",{
					page:this.page,
					size:this.size
				},{method:'GET'}).then(res=>{
					this.shoppingList=res
					uni.hideLoading();
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err});
				})
			}
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
	.sp-bottom{
		align-items: flex-end;
		margin-top: 3px;
	}
	button.sp-my-bottom{
		background-color: #F9663D;
		width: 100px;
		height: 42px;
		color: #fff;
		font-size: 12px;
	}
	button::after{
		border: none;
	}
	.stars{
		margin-bottom: 20px;
	}
	.progress{
		margin-top: -10px;
	}
</style>

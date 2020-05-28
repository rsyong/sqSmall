<template>
	<view>
		<uni-nav-bar @clickLeft="goBack" title="我的订单" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<van-tabs :active="active" @change="onChange" color="#F9BC2D" swipe-threshold="5" animated sticky swipeable>
			<van-tab :title="item.content" v-for="(item,index) in info" :key="index">
				
			</van-tab>
		</van-tabs>
		<view class="content">
			<view class="sp-list flex just-between align-center" v-for="(item,index) in shoppingList" :key="index" @click="gotoDetails">
				<view class="sp-list-detiles flex just-between">
					<view class="sp-list-img">
						<image :src="item.goods[0].goods_data.image"></image>
					</view>
					<view class="flex flex-column just-between">
						<view class="flex1 only-line-2">{{item.goods[0].goods_data.name}}</view>
						<view class="flex sp-list-weight align-center">{{item.goods[0].goods_data.type_note}}</view>
						<view class="flex just-between align-center">
							<stars :starNumber="item.goods[0].goods_data.star" />
						</view>
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
				page:1,
				size:10,
				type:0, //类型（0全部，1待确认，2待收货，3已完成，4已取消）
				shoppingList:[],
			}
		},
		onLoad(option) {
			this.active=Number(option.pageNum);
			this.type=this.active;
			this.getShoppingList();
		},
		methods: {
			onChange(event){
				this.page=1;
				this.shoppingList=[];
				this.type=event.detail.index;
				this.getShoppingList();
			},
			gotoDetails(){
				uni.navigateTo({
					url:"../shoppingDetails/shoppingDetails"
				})
			},
			//获取商品列表
			getShoppingList(){
				this.request(this.baseURL+"/api/order/myOrder",{
					page:this.page,
					size:this.size,
					type:this.type
				},{method:'GET'}).then(res=>{
					this.shoppingList=this.shoppingList.concat(res)
					uni.hideLoading();
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err});
				})
			},
			//下拉加载更多
			onReachBottom(){
				this.page++;
				uni.showLoading({title:"加载中..."});
				this.getShoppingList();
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

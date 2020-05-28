<template>
	<view>
		<uni-nav-bar title="常购清单" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<view>
			<view class="content">
				<view class="sp-list flex just-between align-center" v-for="(item,index) in goodsList" :key="index" @click="gotoDetails(item)">
					<view class="sp-list-detiles flex just-between">
						<view class="sp-list-img">
							<image :src="item.goods_data.image" mode="aspectFill"></image>
						</view>
						<view class="flex flex-column">
							<view class="only-line-2 mb-5">{{item.goods_data.name}}</view>
							<view class="sp-list-weight align-center mb-5">{{item.goods_data.type_note}}</view>
							<view class="just-between align-center mb-5">
								<stars :starNumber="item.goods_data.star" />
							</view>
							<view class="sp-list-weight" style="color: #ED5758;">
								￥:<text style="font-weight: 600;">{{item.goods_data.price}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="nav-tuijan flex just-center">
				<view>为您推荐</view>
			</view>
			<shoppingList :dataList="shoppingList" @onPress="gotoDetails" />
		</view>
	</view>
</template>

<script>
	import shoppingList from '../../wxcomponents/shoppingList.vue';
	export default {
		components:{shoppingList},
		data() {
			return {
				imgUrl:'http://img3.imgtn.bdimg.com/it/u=372372667,1126179944&fm=26&gp=0.jpg',
				page:1,
				size:10,
				goodsList:[],
				shoppingList:[]
			}
		},
		onLoad() {
			this.getShoppingList();
			this.getRecommendList();
		},
		methods: {
			gotoDetails(item){
				uni.navigateTo({
					url:"../shoppingDetails/shoppingDetails?id="+item.id
				})
			},
			//获取商品列表
			getShoppingList(noConcat){
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/personal/myBuy",{
					page:this.page,
					size:this.size
				},{method:'GET'}).then(res=>{
					uni.hideLoading();
					this.goodsList=this.goodsList.concat(res);
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err});
				})
			},
			//获取商品列表
			getRecommendList(){
				let url='/api/goods/getRecommendList';
				this.request(this.baseURL+url,{
					page:this.page,
					size:this.size
				},{method:'GET'}).then(res=>{
					this.shoppingList=this.shoppingList.concat(res);
					uni.hideLoading();
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err});
				})
			},
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

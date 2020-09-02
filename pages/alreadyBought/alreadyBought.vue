<template>
	<view>
		<uni-nav-bar title="常购清单" status-bar color="#fff" fixed :shadow="fasle" background-color="#E7A40D"></uni-nav-bar>
		<view>
			<view class="content">
				<view class="sp-list flex just-between align-center shadow-1" v-for="(item,index) in goodsList" :key="index" @click="gotoDetails(item.goods_data)">
					<view class="sp-list-detiles flex just-between">
						<view class="sp-list-img">
							<image :src="item.goods_data.image" mode="aspectFill" class="shadow"></image>
						</view>
						<view class="flex flex-column">
							<view class="only-line-2 mb-5">{{item.goods_data.name}}</view>
							<view class="sp-list-weight align-center mb-5">{{item.goods_data.type_note}}</view>
							<view class="just-between align-center mb-5">
								<stars :starNumber="item.goods_data.star" />
							</view>
							<view class="price">
								￥:<text class="price-monye">{{item.goods_data.price}}</text>
							</view>
						</view>
					</view>
				</view>
				<myNull v-if="goodsList.length==0" />
			</view>
			<view class="nav-tuijan flex just-center align-center" v-if="shoppingList.length>0">
				<view class="dots-2"></view>
				<view class="dots-2"></view>
				<view class="dots-2"></view>
				<view class="nav-tuijan-title">为您推荐</view>
				<view class="dots-2"></view>
				<view class="dots-2"></view>
				<view class="dots-2"></view>
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
				size:5,
				goodsList:[],
				shoppingList:[],
				is_auth:0
			}
		},
		onLoad() {
			if(!getApp().globalData.token){
				return uni.showModal({
				    title: '提示',
				    content: '请先登录',
				    success: function (res) {
				        if (res.confirm) {
				            uni.switchTab({
				            	url:'../my/my'
				            })
				        } 
				    }
				});
			}
		},
		onShow() {
			if(this.is_auth!=1){
				if(getApp().globalData.userInfo.is_auth==1){
					this.is_auth=1;
					this.getRecommendList();
					this.getShoppingList();
				}
			}
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
					uni.stopPullDownRefresh()
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,icon:'none'});
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
					uni.showToast({title: err,icon:'none'});
				})
			},
			//下拉刷新
			onPullDownRefresh(){
				if(!getApp().globalData.token){
					return uni.showToast({title: '请先登录',icon:'none'});
				}
				this.goodsList=[];
				this.getShoppingList();
			}
		}
	}
</script>

<style>
	.content{
		padding: 10px;
		box-sizing: border-box;
		padding-top: 15px;
	}
	.sp-list{
		margin-bottom: 10px;
		padding: 10px;
		box-sizing: border-box;
		border-radius: 10px;
		background-color: #fff;
	}
</style>

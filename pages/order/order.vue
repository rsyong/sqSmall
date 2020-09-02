<template>
	<view>
		<uni-nav-bar @clickLeft="goBack" title="我的订单" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#E7A40D"></uni-nav-bar>
		<van-tabs :active="active" @change="onChange" color="#F9BC2D" swipe-threshold="5" animated sticky swipeable>
			<van-tab :title="item.content" v-for="(item,index) in info" :key="index">
				
			</van-tab>
		</van-tabs>
		<view class="content">
			<view class="sp-list shadow-1" v-for="(item,index) in shoppingList" :key="index">
				<view v-if="item.goods.length==1" class="sp-list-detiles flex just-between mb-10" v-for="(item2,index2) in item.goods" @click.stop="gotoDetails(item2.goods_data)" :key="index2">
					<view class="sp-list-img">
						<image :src="item2.goods_data.image" mode="aspectFill" class="shadow"></image>
					</view>
					<view class="flex flex-column">
						<view class="only-line-2">{{item2.goods_data.name}}</view>
						<view class="sp-list-weight mb">{{item2.goods_data.type_note}}</view>
						<view class="mb">
							<stars :starNumber="item2.goods_data.star" />
						</view>
						<view class="sp-list-weight mb" v-if="item2.num">数量: x{{item2.goods_data.num || 0}}</view>
						<view class="price mb">￥{{item2.goods_data.price || 0}}</view>
					</view>
				</view>
				<scroll-view v-if="item.goods.length>1" scroll-x enable-flex class="flex mt-10 scroll-view">
					<view v-for="(item2,index2) in item.goods" @click="gotoDetails(item2.goods_data)" :key="index2">
						<view class="sp-list-img mb">
							<image :src="item2.goods_data.image" mode="aspectFill" class="shadow"></image>
						</view>
						<view class="only-line-1 morn-title">{{item2.goods_data.name}}</view>
						<view class="sp-list-weight mb">{{item2.goods_data.type_note}}</view>
						<view class="sp-list-weight mb" v-if="item2.num">数量: x{{item2.goods_data.num || 0}}</view>
						<view class="price">￥{{item2.goods_data.price || 0}}</view>
						<view style="height: 20rpx;"></view>
					</view>
				</scroll-view>
				<view class="flex align-center" style="justify-content: flex-end;">
					<button v-if="[0,1].includes(item.status)" size="mini" class="my-button my-button2 shadow" @click.stop="cancel(item)">取消订单</button>
					<button v-if="[2].includes(item.status)" size="mini" class="my-background my-button shadow" @click.stop="play(item)">支付</button>
					<text v-if="[3].includes(item.status)" class="my-status my-status-active">已完成</text>
					<text v-if="[-1].includes(item.status)" class="my-status">已取消</text>
					<button size="mini" class="my-background my-button shadow mr" @click.stop="toDetails(item)">订单详情</button>
				</view>
			</view>
			<myNull v-if="shoppingList.length==0" />
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
				provider:'',
				isBottom:false,
			}
		},
		onLoad(option) {
			this.active=Number(option.pageNum);
			this.type=this.active;
			if(this.type==0){
				this.getShoppingList();
			}
			//获取设备商
			this.getProvider();
		},
		methods: {
			getProvider(){
				uni.getProvider({
					service:'payment',
					success: (res) => {
						this.provider=res.provider[0];
					}
				})
			},
			onChange(event){
				this.page=1;
				this.shoppingList=[];
				this.type=event.detail.index;
				this.getShoppingList();
			},
			gotoDetails(item){
				uni.navigateTo({
					url:"../shoppingDetails/shoppingDetails?id="+item.id
				})
			},
			toDetails(item){
				uni.navigateTo({
					url:"orderDetails/orderDetails?id="+item.id
				})
			},
			//获取商品列表
			getShoppingList(){
				if(!getApp().globalData.token){
					return uni.showModal({
					    title: '提示',
					    content: '请先登录',
					    success: function (res) {
					        if (res.confirm) {
					            uni.switchTab({
					            	url:'../my/my'
					            })
					        }else{
								uni.navigateBack({})
							}
					    }
					});
				}
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/order/myOrder",{
					page:this.page,
					size:this.size,
					type:this.type
				},{method:'GET'}).then(res=>{
					this.shoppingList=this.shoppingList.concat(res);
					this.isBottom=res.length==0;
					uni.hideLoading();
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,icon:'none'});
				})
			},
			//下拉加载更多
			onReachBottom(){
				if(this.isBottom) return;
				this.page++;
				this.getShoppingList();
			},
			//取消订单
			cancel(item){
				uni.showModal({
				    title: '提示',
				    content: '确定要取消吗？',
					confirmColor:'red',
				    success: (res) => {
				        if (res.confirm) {
							uni.showLoading({title:"取消中..."});
							this.request(this.baseURL+"/api/order/cancel",{
								id:item.id,
							},{method:'POST'}).then(res=>{
								item.status=-1;
								uni.hideLoading();
								uni.showToast({title: "取消成功"});
							}).catch(err=>{
								uni.hideLoading();
								uni.showToast({title: err,icon:'none'});
							})
				        } 
				    }
				});
			},
			//支付
			play(item){
				uni.showLoading({title:"支付中..."});
				this.request(this.baseURL+"/api/order/orderPay",{
					id:item.id,
				},{method:'POST'}).then(res=>{
					uni.hideLoading();
					uni.requestPayment({
						provider:this.provider,
						orderInfo:item.goods[0].goods_data.name,
						timeStamp:res.timeStamp,
						nonceStr:res.nonceStr,
						package:res.package,
						signType:res.signType,
						paySign:res.paySign,
						success: (res2) => {
							item.status=3;
							uni.showToast({title: "支付成功"});
						},
						fail: (err) => {
							uni.showToast({title: err,icon:'none'});
						},
						complete: () => {
							uni.hideLoading();
						}
					})
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,icon:'none'});
				})
			},
		}
	}
</script>

<style>
	.content{
		padding: 10px;
		box-sizing: border-box;
	}
	.sp-list{
		margin-bottom: 10px;
		background-color: #fff;
		border-radius: 10px;
		padding: 10px;
		box-sizing: border-box;
	}
	.my-button{
		color: #fff;
		border-radius: 25px;
		font-size: 14px;
		margin: 0 10px;
	}
	.my-button2{
		color: #666;
	}
	.my-status{
		font-size: 12px;
		color: #888;
		line-height: 2;
		width: 58px;
		text-align: center;
		margin-right: 10px;
	}
	.my-status-active{
		color: #F9BC2D;
	}
	.mb{
		margin-bottom: 3px;
	}
	.scroll-view{
		max-height: 380rpx;
		margin-bottom: 10px;
	}
	.morn-title{
		font-size: 12px;
		width: 227rpx;
	}
</style>

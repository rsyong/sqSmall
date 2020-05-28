<template>
	<view>
		<uni-nav-bar @clickLeft="goBack" title="我的订单" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<van-tabs :active="active" @change="onChange" color="#F9BC2D" swipe-threshold="5" animated sticky swipeable>
			<van-tab :title="item.content" v-for="(item,index) in info" :key="index">
				
			</van-tab>
		</van-tabs>
		<view class="content">
			<view class="sp-list flex just-between align-center" v-for="(item,index) in shoppingList" :key="index" @click.stop="gotoDetails(item)">
				<view class="sp-list-detiles flex just-between">
					<view class="sp-list-img">
						<image :src="item.goods[0].goods_data.image" mode="aspectFill"></image>
					</view>
					<view class="flex flex-column just-between">
						<view class="flex1 only-line-2">{{item.goods[0].goods_data.name}}</view>
						<view class="flex sp-list-weight align-center">{{item.goods[0].goods_data.type_note}}</view>
						<view class="flex just-between align-center">
							<stars :starNumber="item.goods[0].goods_data.star" />
						</view>
						<view class="flex align-center" style="justify-content: flex-end;">
							<button v-if="[0,1].includes(item.status)" size="mini" class="my-bottom" plain @click.stop="cancel(item)">取消订单</button>
							<button v-if="[2].includes(item.status)" size="mini" class="my-bottom play" plain @click.stop="play(item)">支付</button>
							<text v-if="[3].includes(item.status)" class="my-status my-status-active">已完成</text>
							<text v-if="[-1].includes(item.status)" class="my-status">已取消</text>
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
				provider:'',
			}
		},
		onLoad(option) {
			this.active=Number(option.pageNum);
			this.type=this.active;
			this.getShoppingList();
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
			//获取商品列表
			getShoppingList(){
				uni.showLoading({title:"加载中..."});
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
				this.getShoppingList();
			},
			//取消订单
			cancel(item){
				uni.showLoading({title:"取消中..."});
				this.request(this.baseURL+"/api/order/cancel",{
					id:item.id,
				},{method:'POST'}).then(res=>{
					item.status=-1;
					uni.hideLoading();
					uni.showToast({title: "取消成功"});
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err});
				})
			},
			//支付
			play(item){
				uni.showLoading({title:"支付中..."});
				this.request(this.baseURL+"/api/order/orderPay",{
					id:item.id,
				},{method:'POST'}).then(res=>{
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
							uni.showToast({title: "支付失败"});
						},
						complete: () => {
							uni.hideLoading();
						}
					})
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
	button.my-bottom{
		margin: 0;
		margin-right: 10px;
		border-radius: 25px;
		border: 1px solid #e0e0e0;
		line-height: 2;
		font-size: 12px;
	}
	button.play{
		background-color: #F9BC2D;
		color: #fff;
		border: 1px solid #F9BC2D;
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
</style>

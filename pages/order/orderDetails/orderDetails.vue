<template>
	<view>
		<uni-nav-bar @clickLeft="goBack" title="订单详情" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<view class="my-adress flex align-center">
			<view class="mr-10">
				<view class="iconfont icon-daishouhuo my-adress-icon"></view>
			</view>
			<view class="flex1">
				<view>{{Alldata.shop_city || ''}}{{Alldata.shop_address || ''}}</view>
				<view class="flex just-between pople">
					<view>{{Alldata.shop_nickname || ''}}</view>
					<view>{{Alldata.wechat_name || ''}} {{Alldata.shop_mobile || ''}}</view>
				</view>
			</view>
		</view>
		<view class="content flex just-between mt-10">
			<view>支付方式</view>
			<view>货到付款</view>
		</view>
		<view class="content mt-10">
			<view>配送日期：{{Alldata.delivery_date}}</view>
			<view class="sp-list-detiles flex just-between mt-10" v-for="(item2,index2) in Alldata.goods_list" @click.stop="gotoDetails(item2.goods_data)" :key="index2">
				<view class="sp-list-img">
					<image :src="item2.goods_data.image" mode="aspectFill"></image>
				</view>
				<view class="flex flex-column">
					<view class="only-line-2">{{item2.goods_data.name}}</view>
					<view class="sp-list-weight mb">{{item2.goods_data.type_note}}</view>
					<view class="mb">
						<stars :starNumber="item2.goods_data.star" />
					</view>
					<view class="sp-list-weight mb" v-if="item2.num">数量: x{{item2.goods_data.num || 0}}</view>
					<view class="price mb">支付价格: ￥{{item2.goods_data.price || 0}}</view>
				</view>
			</view>
			<view class="mt-10">
				<view class="flex just-between list">
					<view>带货费</view>
					<view class="monye my-color" v-if="Alldata.freight">{{Alldata.freight}}</view>
					<view v-else style="color: #888;font-size: 12px;">待发货可见</view>
				</view>
				<!-- <view class="flex just-between list">
					<view>筐押金</view>
					<view class="monye my-color">￥193.64</view>
				</view>
				<view class="flex just-between list">
					<view>退筐抵扣</view>
					<view class="monye my-color">-￥0.00</view>
				</view> -->
				<view class="flex just-between list">
					<view>订单状态</view>
					<text v-if="[0,1].includes(Alldata.status)" class="my-status">待确认</text>
					<text v-if="[1].includes(Alldata.status)" class="my-status">已称重</text>
					<text v-if="[2].includes(Alldata.status)" class="my-status">已发货</text>
					<text v-if="[3].includes(Alldata.status)" class="my-status my-status-active">已完成</text>
					<text v-if="[-1].includes(Alldata.status)" class="my-status">已取消</text>
				</view>
				<view class="flex just-between list">
					<view>合计</view>
					<view class="monye my-color">￥{{Alldata.price}}</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Alldata:{}
			}
		},
		onLoad() {
			this.getInfo()
		},
		methods: {
			getInfo(){
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/order/detail",{
					id:'14'
				},{method:'GET'}).then(res=>{
					uni.hideLoading();
					this.Alldata=res;
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,image:'../../../static/image/error.png'});
				})
			},
			gotoDetails(item){
				uni.navigateTo({
					url:"../../shoppingDetails/shoppingDetails?id="+item.id
				})
			},
		}
	}
</script>

<style>
	.content{
		padding: 10px;
		box-sizing: border-box;
		background-color: #fff;
	}
	.my-adress{
		padding: 15px 10px;
		background-color: #fff;
	}
	.my-adress-icon{
		font-size: 20px;
		color: #EBAC1F;
	}
	.pople{
		font-size: 12px;
		color: #A6A6A6;
		margin-top: 15px;
	}
	.monye{
		font-weight: 600;
	}
	.list{
		height: 33px;
		line-height: 33px;
	}
	.my-bottoms{
		height: 50px;
	}
	.my-bottom-ceontent{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		border-top: 1px solid #ECECEC;
	}
	.my-bottoms .monye{
		font-size: 18px;
	}
	.small-font{
		font-size: 12px;
		color: #888;
	}
	.font-lg{
		font-size: 15px;
	}
	.my-status{
		font-size: 12px;
		color: #888;
	}
	.my-status-active{
		color: #F9BC2D;
	}
</style>
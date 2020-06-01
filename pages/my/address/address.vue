<template>
	<view>
		<uni-nav-bar @clickLeft="goBack" title="提交订单" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<view class="my-adress flex">
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
			<view>配送日期：5月29日</view>
			<view class="flex just-between align-center mt-10 mb-10">
				<view class="sp-list-img">
					<image v-if="Alldata.goods_list.length>0" :src="Alldata.goods_list[0].image" mode="aspectFill"></image>
				</view>
				<view>
					<text class="mr-10">共{{Alldata.goods_list.length}}种</text>
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</view>
			<view>
				<view class="flex just-between list">
					<view >商品价格</view>
					<view class="monye my-color">￥193.64</view>
				</view>
				<view class="flex just-between list">
					<view>带货费</view>
					<view class="monye my-color" v-if="Alldata.freight">{{Alldata.freight}}</view>
					<view v-else style="color: #888;">待发货可见</view>
				</view>
				<view class="flex just-between list">
					<view>筐押金</view>
					<view class="monye my-color">￥193.64</view>
				</view>
				<view class="flex just-between list">
					<view>退筐抵扣</view>
					<view class="monye my-color">-￥0.00</view>
				</view>
				<view class="flex just-between list">
					<view>合计</view>
					<view class="monye my-color">￥{{Alldata.total_price}}</view>
				</view>
			</view>
		</view>
		<view class="my-bottoms">
			<view class="my-bottom-ceontent content flex just-between align-center">
				<view class="my-color">
					￥<text class="monye">{{Alldata.total_price}}</text>
				</view>
				<view>
					<button class="my-background my-button">提交订单</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataInfo:[],
				Alldata:{
					goods_list:[]
				}
			}
		},
		onLoad() {
			this.dataInfo=getApp().globalData.orderInfo;
			if(!this.dataInfo instanceof Array || this.dataInfo.length==0){
				return uni.showToast({title: '商品列表为空',image:'../../../static/image/error.png'});
			}else{
				this.getInfo()
			}
		},
		methods: {
			getInfo(){
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/order/placeOrderMessage",{
					cart:this.dataInfo
				},{method:'POST'}).then(res=>{
					uni.hideLoading();
					this.Alldata=res;
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,image:'../../../static/image/error.png'});
				})
			}
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
</style>

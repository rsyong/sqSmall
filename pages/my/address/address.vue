<template>
	<view>
		<uni-nav-bar @clickLeft="goBack" title="提交订单" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#E7A40D"></uni-nav-bar>
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
			<scroll-view scroll-x enable-flex class="flex mt-10 scroll-view">
				<view v-for="(item,index) in Alldata.goods_list" @click="gotoDetails(item)" :key="index">
					<view class="sp-list-img">
						<image :src="item.image" mode="aspectFill" class="shadow"></image>
					</view>
					<view class="mt-10 small-font">价格:<text class="my-color font-lg">￥{{item.price}}</text></view>
					<view class="small-font">数量: <text class="my-color font-lg" style="margin-left: 2px;"> x{{item.num}}</text></view>
					<view class="small-font discount" v-if="item.is_full_dec==1"><text class="my-color font-lg-14">满{{item.events.condition_amount}}减{{item.events.amount}}</text></view>
				</view>
			</scroll-view>
			<view class="mt-10">
				<view class="flex just-between list">
					<view>优惠券</view>
					<view v-if="Alldata.coupon_list.length>0" class="monye" style="color: red;min-width: 100px;text-align: right;" @click="openCash">
						<text v-if="activeItem.coupon_data.amount>0">￥{{activeItem.coupon_data.amount}}</text>
						<text v-else>{{activeItem.coupon_data.amount}}</text>
					</view>
					<view v-else  class="monye" style="color: #888;font-size: 12px;">无可用优惠券</view>
				</view>
				<view class="flex just-between list">
					<view>带货费</view>
					<view class="monye my-color" v-if="Alldata.freight">￥{{Alldata.freight}}</view>
					<view v-else style="color: #888;font-size: 12px;">待发货可见</view>
				</view>
				<view class="flex just-between list">
					<view>押筐费</view>
					<view class="monye my-color" v-if="Alldata.press_frame">￥{{Alldata.press_frame}}</view>
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
					<button class="my-background my-button shadow" @click="bugsGoods">提交订单</button>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="cash-content">
				<view class="cash-list shadow-1" v-for="(item,index) in Alldata.coupon_list" :key="index"  @click="checkCash(item)">
					<view class="flex just-between cash-list-top align-center">
						<view class="flex align-center">
							<view style="margin-right: 10px;">
								<myRadio color="#F0B426" :checked="item.checked"/>
							</view>
							<view>
								<view>{{item.coupon_data.name}}</view>
								<view class="mt-10 cash-replace">{{item.coupon_data.amount}}元代金券</view>
							</view>
						</view>
						<view>
							<view style="color: red;text-align: right;"><text style="font-size: 50px;">{{item.coupon_data.amount}}</text>元</view>
							<view class="sp-list-weight" style="text-align: right;">{{item.use_start_time | newTime}} - {{item.use_end_time | newTime}}</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import myRadio from '../../../wxcomponents/my-radio/my-radio.vue'
	import {timestampToTime} from '../../../common/js/untils.js';
	export default {
		components:{myRadio},
		data() {
			return {
				dataInfo:[],
				Alldata:{
					goods_list:[],
					coupon_list:[]
				},
				activeItem:{
					coupon_data:{
						amount:'选择优惠券'
					}
				}
			}
		},
		onLoad() {
			this.dataInfo=getApp().globalData.orderInfo;
			if(!this.dataInfo instanceof Array || this.dataInfo.length==0){
				return uni.showToast({title: '商品列表为空',icon:'none'});
			}else{
				this.getInfo()
			}
		},
		filters:{
			newTime(value){
				return timestampToTime(value);
			}
		},
		methods: {
			getInfo(){
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/order/placeOrderMessage",{
					cart:this.dataInfo,
				},{method:'POST'}).then(res=>{
					uni.hideLoading();
					res.coupon_list.forEach(item=>{
						item.checked=false;
					})
					this.Alldata=res;
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,icon:'none'});
				})
			},
			//现在结算
			bugsGoods(){
				if(this.dataInfo.length==0){
					return uni.showToast({title: '请选择商品',icon:'none'});
				}
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/order/placeOrder",{
					cart:this.dataInfo,
					coupon_id:this.activeItem.id || ''
				},{method:'POST'}).then(res=>{
					uni.hideLoading();
					uni.showToast({title: '下单成功'});
					setTimeout(()=>{
						uni.navigateBack({});
					},1000)
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,icon:'none'});
				})
			},
			gotoDetails(item){
				uni.navigateTo({
					url:"../../shoppingDetails/shoppingDetails?id="+item.id
				})
			},
			//打开优惠券
			openCash(){
				this.$refs.popup.open();
			},
			//选择优惠券
			checkCash(item){
				let onwTime=new Date().getTime()/1000;
				if(item.use_end_time<onwTime){
					return uni.showToast({title: '当前优惠券已过期',icon:'none'});
				}
				if(item.use_start_time>onwTime){
					return uni.showToast({title: '优惠券时间还未到',icon:'none'});
				}
				this.Alldata.coupon_list.forEach(item2=>{
					item2.checked=item2==item;
				})
				this.activeItem=item;
				this.Alldata.total_price=this.Alldata.total_price-item.coupon_data.amount;
				this.$refs.popup.close();
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
	.small-font{
		font-size: 12px;
		color: #888;
	}
	.font-lg{
		font-size: 15px;
	}
	.scroll-view{
		max-height: 430rpx;
		border-bottom: 1px solid #ECECEC;
		padding-bottom: 10px;
	}
	.discount{
		width: 227rpx;
	}
	.font-lg-14{
		font-size: 14px;
	}
	.cash-content{
		background-color: #fff;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		padding: 10px 0;
	}
	.cash-list{
		border-bottom: 1px dashed  #e0e0e0;
		border-radius: 10px;
		margin: 10px;
		margin-bottom: 0;
	}
	.cash-list-top{
		padding: 10px;
		
	}
	.cash-replace{
		color: #888;
	}
	.integral{
		font-weight: 600;
	}
</style>

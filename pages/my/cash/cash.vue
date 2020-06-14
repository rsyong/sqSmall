<template>
	<view>
		<uni-nav-bar @clickLeft="goBack" title="积分兑换" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#FBD449"></uni-nav-bar>
		<view class="flex just-center cash-money align-center shadow-1">
			<view class="cash-content">
				<view style="font-size: 30px;text-align: center;">{{integral || 0}}</view>
				<view>当前积分</view>
			</view>
		</view>
		<van-tabs :active="active" @change="onChange" color="#F9BC2D" swipe-threshold="5" animated sticky swipeable>
			<van-tab title="积分兑换">
				<view class="cash-list shadow-1" v-for="(item,index) in cashList" :key="index">
					<view class="flex just-between cash-list-top align-center">
						<view>
							<view>{{item.name}}</view>
							<view class="mt-10 cash-replace">{{item.amount || 0}}元代金券</view>
						</view>
						<view style="color: red;"><text style="font-size: 50px;">{{item.amount || 0}}</text>元</view>
					</view>
					<view class="sp-list-weight cash-list-top" style="padding-top: 0;">{{item.receive_start_time}} - {{item.receive_end_time}}</view>
					<view class="cash-list-bottom flex align-center just-between">
						<view class="integral">{{item.integral || 0}}积分</view>
						<view>
							<button size="mini" :disabled="item.merchant_is_receive==1" class="my-button my-background" @click="draw(item)">{{item.merchant_is_receive==1?'已领取':'立即兑换'}}</button>
						</view>
					</view>
				</view>
			</van-tab>
			<van-tab title="我的兑换">
				<view class="cash-list shadow-1" v-for="(item,index) in cashList2" :key="index">
					<view class="flex just-between cash-list-top align-center">
						<view>
							<view>{{item.coupon_data.name}}</view>
							<view class="mt-10 cash-replace">{{item.coupon_data.amount || 0}}元代金券</view>
						</view>
						<view style="color: red;"><text style="font-size: 50px;">{{item.coupon_data.amount || 0}}</text>元</view>
					</view>
					<view class="cash-list-bottom flex align-center just-between">
						<view class="sp-list-weight">{{item.use_start_time | newTime}} - {{item.use_end_time | newTime}}</view>
						<view class="sp-list-weight">{{item.status | myCahsStatus}}</view>
					</view>
				</view>
			</van-tab>
		</van-tabs>
		
	</view>
</template>

<script>
	import {timestampToTime} from '../../../common/js/untils.js';
	export default {
		data() {
			return {
				page:1,
				page2:1,
				size:10,
				isBottom:false,
				cashList:[],
				cashList2:[],
				integral:0,
				active:0
			}
		},
		onLoad(){
			this.getCashList();
		},
		filters:{
			newTime(value){
				return timestampToTime(value);
			},
			myCahsStatus(value){
				switch (value){
					case 1:
						return "待使用";
						break;
					case 2:
						return "已使用";
						break;
					case 3:
						return "已过期";
						break;
					default:
					case 3:
						return "";
						break;
				}
			}
		},
		methods: {
			onChange(event){
				this.active=event.detail.index;
				if(this.active==1){
					this.getMyCashList();
				}
			},
			//提示登录
			goLogin(){
				uni.showModal({
				    title: '提示',
				    content: '请先登录',
				    success: function (res) {
				        uni.navigateBack({})
				    }
				});
			},
			//优惠券列表
			getCashList(morn){
				if(!getApp().globalData.token){
					return this.goLogin();
				}
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/coupon/getList",{
					page:this.page,
					size:this.size
				},{method:'GET'}).then(res=>{
					uni.hideLoading();
					this.integral=res.integral;
					if(morn){
						this.cashList=this.cashList.concat(res.list)
					}else{
						this.cashList=res.list;
					}
					this.isBottom=res.list.length==0;
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,icon:'none'});
				})
			},
			//我的优惠券列表
			getMyCashList(morn){
				if(!getApp().globalData.token){
					return this.goLogin();
				}
				if(this.cashList2.length==0){
					uni.showLoading({title:"加载中..."});
				}
				this.request(this.baseURL+"/api/personal/myCoupon",{
					page:this.page2,
					size:this.size
				},{method:'GET'}).then(res=>{
					uni.hideLoading();
					if(morn){
						this.cashList2=this.cashList2.concat(res)
					}else{
						this.cashList2=res;
					}
					this.isBottom=res.length==0;
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,icon:'none'});
				})
			},
			onReachBottom(){
				if(this.isBottom) return;
				if(this.active==1){
					this.page2++;
				}else{
					this.page++;
				}
				this.getCashList(true);
			},
			//领取优惠券
			draw(item){
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/coupon/receiveCoupon",{
					id:item.id
				},{method:'POST'}).then(res=>{
					uni.hideLoading();
					uni.showToast({
						title:'领取成功!'
					})
					this.getCashList();
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,icon:'none'});
				})
			}
		}
	}
</script>

<style>
	.uni-navbar--border{
		border-bottom: none !important;
	}
	.cash-money{
		height: 100px;
		background-color: #FBD449;
		color: #fff;
	}
	.cash-content{
		margin-top: -20px;
	}
	.cash-list{
		margin: 10px 10px;
		background-color: #fff;;
		border-radius: 10px;
	}
	.cash-list-top{
		padding: 10px;
	}
	.cash-list-bottom{
		height: 50px;
		padding: 0 10px;
		border-top: 1px dashed  #e0e0e0;
	}
	.cash-replace{
		color: #888;
	}
	.integral{
		font-weight: 600;
	}
</style>

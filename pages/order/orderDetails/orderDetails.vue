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
					<image :src="item2.goods_data.image" mode="aspectFill" class="shadow-1"></image>
				</view>
				<view class="flex1">
					<view class="flex just-between mb">
						<view class="only-line-2 flex1">{{item2.goods_data.name}}</view>
						<view style="width: 70px;text-align: right;">
							<view>￥{{item2.goods_data.price || 0}}/箱</view>
							<view class="sp-list-weight" v-if="item2.num">x{{item2.num || 0}}</view>
						</view>
					</view>
					<view class="sp-list-weight mb">
						<text class="mr-10">{{item2.goods_data.type_note}}</text>
						<text class="mr-10" :style="{'text-decoration':Alldata.status>0?'line-through;':'none' }">￥{{item2.goods_data.unit_price}}/斤</text>
						<text class="my-color" v-if="Alldata.status>0">￥{{item2.price}}/斤</text>
					</view>
					<view class="flex mr-10">
						<view class="sp-list-weight mb">
							<text class="mr-10">预计{{item2.goods_data.hair}}斤</text>
						</view>
						<view class="sp-list-time mb">
							<text>实际</text>
							<text v-if="Alldata.status>0">{{item2.weight}}斤</text>
							<text v-else style="margin-left: 5px;">(待商品称重)</text>
						</view>
					</view>
					<view class="price mb" v-if="item2.amount>0">优惠: <text>满￥{{item2.condition_amount}} - ￥{{item2.amount}}</text></view>
					<view class="flex" style="justify-content: flex-end;">
						<view class="sp-list-time">
							<text class="mr-5">应付:</text>
							<text class="my-color" v-if="Alldata.status>0">￥<text class="font-lg">{{item2 | nowPrice}}</text></text>
							<text v-else class="sp-list-weight">待称重</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content mt-10">
			<view class="flex just-between list my-color-hui" v-if="Alldata.status>0">
				<view>优惠券</view>
				<view class="monye" style="color: red;">-￥{{Alldata.coupon_amount}}</view>
			</view>
			<view class="flex just-between list my-color-hui">
				<view>商品价格</view>
				<view class="monye">￥{{Alldata.price}} <text v-if="Alldata.status<1" class="sp-list-weight no-weight"> (待称重结算价格)</text></view>
			</view>
			<view class="flex just-between list my-color-hui">
				<view>带货费</view>
				<view class="monye" v-if="Alldata.freight">+￥{{Alldata.freight}}</view>
				<view v-else style="color: #888;font-size: 12px;">待称重可见</view>
			</view>
			<view class="flex just-between list my-color-hui">
				<view>押筐费</view>
				<view class="monye" v-if="Alldata.press_frame">+￥{{Alldata.press_frame}}</view>
				<view v-else style="color: #888;font-size: 12px;">待称重可见</view>
			</view>
			<view class="flex just-between list">
				<view class="my-color-hui">实付(货到付款)</view>
				<view class="monye my-color" v-if="Alldata.status>0">￥{{Alldata | allPrice}}</view>
				<view v-else style="color: #888;font-size: 12px;">待称重可见</view>
			</view>
		</view>
		<view class="content mt-10">
			<view class="flex just-between list">
				<view>订单状态</view>
				<text v-if="[0].includes(Alldata.status)" class="my-status">待商家确认</text>
				<text v-if="[1].includes(Alldata.status)" class="my-status">待发货</text>
				<text v-if="[2].includes(Alldata.status)" class="my-status">已发货</text>
				<text v-if="[3].includes(Alldata.status)" class="my-status my-status-active">已完成</text>
				<text v-if="[-1].includes(Alldata.status)" class="my-status">已取消</text>
			</view>
			<view class="flex just-between list">
				<view>订单编号 <text style="margin-left: 5px;" class="my-status my-status-active" selectable>{{Alldata.number}}</text></view>
				<view class="my-status my-status-active" style="font-weight: 600;" @click="copy(Alldata.number)">复制</view>
			</view>
		</view>
	</view>
</template>

<script>
	function isNumber(num){
		if(num && !isNaN(num)){
			return num;
		}else{
			return 0;
		}
	}
	export default {
		data() {
			return {
				Alldata:{},
				id:''
			}
		},
		onLoad(option) {
			this.id=option.id;
			this.getInfo()
		},
		filters:{
			//当前价格
			nowPrice(item){
				let num=isNumber(item.num);
				let weight=isNumber(item.weight);
				let price=isNumber(item.price);
				let condition_amount=isNumber(item.condition_amount); //满多少
				let amount=isNumber(item.amount); //减多少
				let noepice=Number(weight)*Number(price)*Number(num);
				if(noepice>=condition_amount){
					noepice-=amount;
				}
				return noepice.toFixed(2);
			},
			//总共价格
			allPrice(item){
				let price=isNumber(item.price);
				let freight=isNumber(item.freight);
				let press_frame=isNumber(item.press_frame);
				let noepice=Number(price)+Number(freight)+Number(press_frame);
				return noepice.toFixed(2);
			}
		},
		methods: {
			getInfo(){
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/order/detail",{
					id:this.id
				},{method:'GET'}).then(res=>{
					uni.hideLoading();
					this.Alldata=res;
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
			copy(data){
				uni.setClipboardData({
					data:data,
					success: () => {
						uni.showToast({title: "复制成功"});
					}
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
	.mb{
		margin-bottom: 3px;
	}
	.no-weight{
		margin-left: 5px;
	}
	.my-color-hui{
		color: #606060;
	}
</style>
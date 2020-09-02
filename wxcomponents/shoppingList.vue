<template>
	<view class="container">
		<!-- <view class="left">
			<view class="list shadow" v-for="(item,key) in leftData" :key="key" @click="onPress(item)">
				<view class="atric" v-if="item.is_business==1">商家直供</view>
				<view class="full-des" v-if="item.events">满{{item.events.condition_amount}}减{{item.events.amount}}</view>
				<view class="list-img">
					<image :src="item.image" mode="aspectFill"></image>
					<view class="many-jin" v-if="item.unit_price">￥{{item.unit_price}}/斤</view>
				</view>
				<view class="list-text">
					<view class="list-title only-line-2">{{item.name}}</view>
					<view class="list-subtitle only-line-2">{{item.note}}</view>
					<view class="list-subtitle" v-if="item.type_note">{{item.type_note}}</view>
					<view v-if="item.price" class="flex just-between align-center">
						<view class="price">￥<text class="price-monye">{{item.price}}</text></view>
						<view class="my-sp-buttom" hover-class="hove-bg8" hover-stay-time="50" @click.stop="addNum(item)">
							<uni-icons type="plus-filled" size="23" color="#F0B426"></uni-icons>
						</view>
					</view>
					<view class="list-slogo" v-if="item.is_business==1"><text class="business">商家直供</text> 万家果品</view>
				</view>
			</view>
		</view>
		<view class="right">
			<view class="list shadow" v-for="(item,key) in rightData" :key="key" @click="onPress(item)">
				<view class="atric" v-if="item.is_business==1">商家直供</view>
				<view class="full-des" v-if="item.events">满{{item.events.condition_amount}}减{{item.events.amount}}</view>
				<view class="list-img">
					<image :src="item.image" mode="aspectFill"></image>
					<view class="many-jin" v-if="item.unit_price">￥{{item.unit_price}}/斤</view>
				</view>
				<view class="list-text">
					<view class="list-title only-line-2">{{item.name}}</view>
					<view class="list-subtitle only-line-2">{{item.note}}</view>
					<view class="list-subtitle" v-if="item.type_note">{{item.type_note}}</view>
					<view v-if="item.price" class="flex just-between align-center">
						<view class="price">￥<text class="price-monye">{{item.price}}</text></view>
						<view class="my-sp-buttom" hover-class="hove-bg8" hover-stay-time="50" @click.stop="addNum(item)">
							<uni-icons type="plus-filled" size="23" color="#F0B426"></uni-icons>
						</view>
					</view>
					<view class="list-slogo" v-if="item.is_business==1"><text class="business">商家直供</text> 万家果品</view>
				</view>
			</view>
		</view> -->
		<view class="list flex shadow" v-for="(item,key) in leftData" :key="key" @click="onPress(item)">
			<view class="list-img">
				<view class="full-des" v-if="item.events">满{{item.events.condition_amount}}减{{item.events.amount}}</view>
				<image :src="item.image" mode="aspectFill"></image>
				<view class="many-jin" v-if="item.unit_price">￥{{item.unit_price}}/斤</view>
			</view>
			<view class="list-text">
				<view class="list-title only-line-2">{{item.name}}</view>
				<view class="list-subtitle only-line-2">{{item.note}}</view>
				<view class="list-subtitle" v-if="item.type_note">{{item.type_note}}</view>
				<view class="list-subtitle">
					<text class="sales">已售<text class="has-sales">{{item.sale_num}}</text>件，仅剩<text class="has-sales">{{item.stock}}</text>件</text>
				</view>
				<view v-if="item.price" class="flex just-between align-center">
					<view class="price">￥<text style="font-size: 23px;">{{item.price}}</text></view>
					<view class="my-sp-buttom" hover-class="hove-bg8" hover-stay-time="50" @click.stop="addNum(item)">
						<uni-icons type="plus-filled" size="23" color="#F0B426"></uni-icons>
					</view>
				</view>
				<view v-else class="list-subtitle mt-10">
					<text class="price">认证后可见价格</text>
				</view>
				<!-- <view class="list-slogo" v-if="item.is_business==1"><text class="business">商家直供</text> 万家果品</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:["dataList"],
		data() {
			return {
				mydata:this.dataList,
				leftData:[],
				rightData:[],
				baseURLImg:this.baseURLImg,
			}
		},
		watch:{
			dataList(newVal){
				this.leftData=[];
				this.rightData=[];
				newVal.forEach((item,key)=>{
					this.leftData.push(item);
					// if(key%2==0){
					// 	this.leftData.push(item);
					// }else{
					// 	this.rightData.push(item);
					// }
				})
			}
		},
		methods: {
			onPress(item){
				this.$emit("onPress",item);
			},
			addNum(item){
				if(!getApp().globalData.token){
					uni.showToast({title: "请登录!",icon:'none'});
					uni.switchTab({
						url:'../my/my'
					})
					return;
				}
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/goods/addCart",{
					id:item.id,
					num:1
				},{method:'POST'}).then(res=>{
					uni.hideLoading();
					getApp().globalData.goodsAllNum++;
					uni.showToast({
						title:'加入成功'
					})
					this.setTabBarBadge()
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,icon:'none'});
				})
			},
			setTabBarBadge(){
				if(getApp().globalData.goodsAllNum==0) {
					uni.removeTabBarBadge({
						index:2
					})
					return
				};
				uni.setTabBarBadge({
					index:2,
					text:getApp().globalData.goodsAllNum+''
				})
			},
		}
	}
</script>

<style>
	.container{
		background-color: #f2f2f2;
		padding: 0 10px;
	}
	.list{
		border-radius: 6px;
		overflow: hidden;
		background-color: #fff;
		margin: 10px 0;
		position: relative;
		padding: 10px;
		box-sizing: border-box;
	}
	.left{
		padding-left: 10px;
		padding-right: 5px;
	}
	.right{
		padding-right: 10px;
		padding-left: 5px;
	}
	.atric{
		position: absolute;
		left: 0;
		top: 0;
		background-color: #ff7a01;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		font-size: 10px;
		color: #fff;
		text-align: center;
		z-index: 10;
		padding: 2px 5px;
	}
	.list-text{
		padding: 0 10px;
		flex: 1;
	}
	.list-img{
		position: relative;
		width: 220rpx;
		height: 220rpx;
	}
	.list-img image{
		width: 220rpx;
		height: 220rpx;
		border-radius: 6px;
	}
	.list-subtitle{
		font-size: 12px;
		color: #888;
		margin-bottom: 5px;
	}
	.list-slogo{
		font-size: 10px;
		color: #424242;
	}
	.list-title{
		margin-bottom: 5px;
	}
	.full-des{
		position: absolute;
		right: 0;
		top: 0;
		background-color: rgba(236,177,41,.7);
		font-size: 10px;
		color: #fff;
		text-align: right;
		padding: 3px 10px;
		height: 20px;
		line-height: 20px;
		z-index: 2;
	}
	.many-jin{
		position: absolute;
		bottom: 0;
		left: 0;
		background-color: rgba(252,97,59,.9);
		font-size: 10px;
		color: #fff;
		text-align: center;
		padding: 3px;
		padding-right: 8px;
		border-top-right-radius: 10px;
		z-index: 10;
		font-size: 10px;
	}
	.my-sp-buttom{
		border-radius: 50%;
	}
	.sales{
		color: #A2A2A2;
	}
	.has-sales{
		color: #DC3136;
		margin: 0 2px;
	}
</style>

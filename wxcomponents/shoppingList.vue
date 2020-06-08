<template>
	<view class="flex just-between container">
		<view class="left">
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
					if(key%2==0){
						this.leftData.push(item);
					}else{
						this.rightData.push(item);
					}
				})
			}
		},
		methods: {
			onPress(item){
				this.$emit("onPress",item);
			},
			addNum(item){
				if(!getApp().globalData.token){
					uni.showToast({title: "请登录!",image:'../../static/image/error.png'});
					uni.switchTab({
						url:'../my/my'
					})
					return;
				}
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/cart/updateCart",{
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
					uni.showToast({title: err,image:'../../static/image/error.png'});
				})
			},
			setTabBarBadge(){
				if(getApp().globalData.goodsAllNum==0) {
					uni.removeTabBarBadge({
						index:3
					})
					return
				};
				uni.setTabBarBadge({
					index:3,
					text:getApp().globalData.goodsAllNum+''
				})
			},
		}
	}
</script>

<style>
	.container{
		background-color: #f2f2f2;
	}
	.list{
		border-radius: 6px;
		overflow: hidden;
		width: 345rpx;
		background-color: #fff;
		margin: 10px 0;
		position: relative;
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
		left: 10px;
		top: 0;
		width: 25px;
		background-color: #ff7a01;
		border-bottom-left-radius: 14px;
		border-bottom-right-radius: 14px;
		font-size: 10px;
		color: #fff;
		text-align: center;
		padding-bottom: 6px;
		z-index: 10;
	}
	.list-text{
		padding: 10px;
	}
	.list-img{
		position: relative;
	}
	.list-img image{
		width: 100%;
		height: 170px;
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
		text-align: center;
		padding: 3px 10px;
	}
	.many-jin{
		position: absolute;
		bottom: 3px;
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
</style>

<template>
	<view style="padding-top: 10px;">
		<view class="sp-list flex just-between" v-for="(item,index) in mydata" :key="index" @click="onPress(item)">
			<!-- <view class="atric" v-if="item.is_business==1">商家直供</view> -->
			<view class="full-des" v-if="item.events">满{{item.events.condition_amount}}减{{item.events.amount}}</view>
			<view class="sp-list-img">
				<image :src="item.image" mode="aspectFill" class="shadow-1"></image>
			</view>
			<view class="flex1">
				<view class="only-line-1">{{item.name}}</view>
				<view class="sp-list-weight only-line-2">{{item.note}}</view>
				<view class="sp-list-weight">{{item.type_note}}</view>
				<view class="flex just-between">
					<stars :starNumber="item.star" />
				</view>
				<view v-if="item.price" class="price">￥<text class="price-monye">{{item.price}}</text></view>
				<view class="list-slogo" v-if="item.is_business==1"><text class="business">商家只供</text> 万家果品</view>
			</view>
		</view>
		<myNull v-if="mydata.length==0" />
	</view>
</template>

<script>
	export default {
		props:["dataList"],
		data() {
			return {
				mydata:this.dataList,
				imgUrl:'http://img3.imgtn.bdimg.com/it/u=372372667,1126179944&fm=26&gp=0.jpg'
			}
		},
		watch:{
			dataList(newVal){
				this.mydata=newVal;
			}
		},
		methods: {
			onPress(item){
				this.$emit("onPress",item);
			}
		}
	}
</script>

<style>
	.sp-list{
		background-color: #FFFFFF;
		border-radius: 6px;
		margin-top: 10px;
		position: relative;
		margin-bottom: 10px;
	}
	.list-slogo{
		font-size: 10px;
		color: #424242;
	}
	.sp-list-weight{
		margin: 3px 0;
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
		padding: 2px 5px;
	}
	.full-des{
		position: absolute;
		left: 0;
		bottom: 3px;
		background-color: rgba(236,177,41,.9);
		font-size: 10px;
		color: #fff;
		text-align: center;
		padding: 3px 10px;
	}
</style>

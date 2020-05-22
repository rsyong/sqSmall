<template>
	<view class="flex just-between container">
		<view class="left">
			<view class="list" v-for="(item,key) in leftData" :key="key" @click="onPress(item)">
				<view class="atric">商家直供</view>
				<view class="list-img">
					<image :src="baseURLImg+item.image"></image>
				</view>
				<view class="list-text">
					<view class="list-title only-line-2">{{item.name}}</view>
					<view class="list-subtitle only-line-2">{{item.note}}</view>
					<view class="list-slogo"><text class="business">商家只供</text> 青阳果业</view>
				</view>
			</view>
		</view>
		<view class="right">
			<view class="list" v-for="(item,key) in rightData" :key="key" @click="onPress(item)">
				<view class="atric">商家直供</view>
				<view class="list-img">
					<image :src="baseURLImg+item.image"></image>
				</view>
				<view class="list-text">
					<view class="list-title only-line-2">{{item.name}}</view>
					<view class="list-subtitle only-line-2">{{item.note}}</view>
					<view class="list-slogo"><text class="business">商家只供</text> 青阳果业</view>
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
			}
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
	}
	.list-text{
		padding: 10px;
	}
	.list-img image{
		width: 100%;
		height: 170px;
	}
	.list-subtitle{
		font-size: 12px;
		color: #888;
		-webkit-line-clamp: 3; /** 显示的行数 **/
		margin-bottom: 5px;
	}
	.list-slogo{
		font-size: 10px;
		color: #424242;
	}
	.list-title{
		margin-bottom: 5px;
	}
	
</style>

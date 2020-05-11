<template>
	<view class="flex just-between container">
		<view class="left">
			<view class="list" v-for="(item,key) in leftData" :key="key">
				<view class="atric">商家直供</view>
				<view class="list-img">
					<image :src="imgUrl"></image>
				</view>
				<view class="list-text">
					<view class="list-title">水果很好</view>
					<view class="list-subtitle">水果很好水果很好水果很好水果很好</view>
					<view class="list-slogo">商家只供 青阳果业</view>
				</view>
			</view>
		</view>
		<view class="right">
			<view class="list" v-for="(item,key) in rightData" :key="key">
				<view class="atric">商家直供</view>
				<view class="list-img">
					<image :src="imgUrl"></image>
				</view>
				<view class="list-text">
					<view class="list-title">水果很好</view>
					<view class="list-subtitle">水果很好水果很好水果很好水果很好</view>
					<view class="list-slogo">商家只供 青阳果业</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:["data"],
		data() {
			return {
				mydata:this.data,
				leftData:[],
				rightData:[],
				imgUrl:'http://img3.imgtn.bdimg.com/it/u=372372667,1126179944&fm=26&gp=0.jpg'
			}
		},
		created(){
			this.mydata.forEach((item,key)=>{
				if(key%2==0){
					this.leftData.push(item);
				}else{
					this.rightData.push(item);
				}
			})
		},
		methods: {
			
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
		background-color: #ff5500;
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
		height: 150px;
	}
	.list-subtitle{
		font-size: 12px;
		color: #888;
	}
	.list-slogo{
		font-size: 10px;
	}
</style>

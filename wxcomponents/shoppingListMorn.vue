<template>
	<view>
		<view class="sp-list flex just-between" v-for="(item,index) in mydata" :key="index">
			<view class="sp-list-img">
				<image :src="item.image"></image>
			</view>
			<view class="flex1">
				<view>{{item.name}}</view>
				<view class="sp-list-weight">{{item.note}}</view>
				<view class="sp-list-weight">{{item.type_note}}</view>
				<view class="flex just-between">
					<stars :starNumber="item.star" />
				</view>
				<view class="list-slogo" v-if="item.is_business==1"><text class="business">商家只供</text> 万家果品</view>
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
				imgUrl:'http://img3.imgtn.bdimg.com/it/u=372372667,1126179944&fm=26&gp=0.jpg'
			}
		},
		watch:{
			dataList(newVal){
				this.mydata=newVal;
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.sp-list{
		background-color: #FFFFFF;
		border-radius: 6px;
		padding: 10px;
		margin-top: 10px;
		position: relative;
	}
	.list-slogo{
		font-size: 10px;
		color: #424242;
		position: absolute;
		bottom: 13px;
	}
	.sp-list-weight{
		margin: 3px 0;
	}
</style>

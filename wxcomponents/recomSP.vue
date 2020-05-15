<template>
	<uni-swiper-dot :info="info" :current="current" field="content" mode="indexes">
	    <swiper class="swiper-box" @change="change">
	        <swiper-item v-for="(item ,index) in info" :key="index">
	            <view class="swiper-item">
	    			<view class="flex swiper-item-list just-between">
	    				<view class="list" v-for="(item,key) in info2" :key="key">
	    					<view class="atric">商家直供</view>
	    					<view class="list-img">
	    						<image :src="imgUrl"></image>
	    					</view>
	    					<view class="list-text">
	    						<view class="list-title only-line-2">水果很好水果很好水果很好水果很好水果很好水果很好</view>
	    						<view class="list-subtitle only-line-2">约17斤</view>
	    						<view class="list-slogo"><text class="business">商家只供</text> 青阳果业</view>
	    					</view>
	    				</view>
	    			</view>
	            </view>
	        </swiper-item>
	    </swiper>
	</uni-swiper-dot>
</template>

<script>
	export default{
		data(){
			return {
				info:[1,2,3],
				info2:[1,2,3,4,5,6],
				imgUrl:'http://img3.imgtn.bdimg.com/it/u=372372667,1126179944&fm=26&gp=0.jpg',
				current:0
			}
		},
		methods:{
			change(e) {
				this.current = e.detail.current;
			},
		}
	}
</script>

<style>
	.swiper-box{
		height: 440px;
	}
	.swiper-item{
		flex: 1;
	}
	.swiper-item-list{
		flex-wrap: wrap;
	}
	.list{
		border-radius: 6px;
		overflow: hidden;
		width: 220rpx;
		background-color: #fff;
		position: relative;
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
		width: 220rpx;
		height: 220rpx;
		border-radius: 6px;
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

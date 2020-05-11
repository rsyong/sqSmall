<template>
	<view class="container">
		<!-- <uni-nav-bar title="导航栏组件" left-text="返回" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar> -->
		<uni-nav-bar status-bar background-color="#000">
		    <view class="my-nav"></view>
		    <!-- <view slot="default" class="my-nav">left</view> -->
		</uni-nav-bar>
		<view class="back-qiu"></view>
		<uni-swiper-dot :info="info" :current="current" field="content">
		    <swiper class="swiper-box" @change="change" circular>
		        <swiper-item v-for="(item ,index) in info" :key="index">
		            <view class="swiper-item">
		                <image src="http://img3.imgtn.bdimg.com/it/u=372372667,1126179944&fm=26&gp=0.jpg"></image>
		            </view>
		        </swiper-item>
		    </swiper>
		</uni-swiper-dot>
		<view class="nav-bar flex just-between pad-center-10 align-center">
			<view>1</view>
			<view>2</view>
		</view>
		<view class="seckill mag-center-10">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: [{
					content: '内容 A'
				}, {
					content: '内容 B'
				}, {
					content: '内容 C'
				}],
				current: 0,
			}
		},
		methods: {
			change(e) {
				this.current = e.detail.current;
			}
		}
	}
</script>

<style>
	.uni-navbar--border{
		border-bottom-color: #000 !important;
	}
	.back-qiu{
		width: 150%;
		height: 300px;
		border-radius: 60%;
		background-color: #000;
		position: absolute;
		top: -100px;
		left: -25%;
		z-index: -1;
	}
	.swiper-box{
		overflow: hidden;
	}
	.swiper-item{
		flex: 1;
		padding: 0 10px;
	}
	.swiper-item image{
		width: 100%;
		height: 150px;
		border-radius: 6px;
		overflow: hidden;
		will-change: transform;
	}
	.my-nav{
		width: 750rpx;
		height: 100%;
		margin-left: -12px;
		padding: 0 10px;
		color: #fff;
	}
	.nav-bar{
		height: 45px;
	}
	.seckill{
		height: 250px;
		background-color: #fff;
		border-radius: 5px;
	}
</style>

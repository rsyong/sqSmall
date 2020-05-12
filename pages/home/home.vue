<template>
	<view class="container">
		<!-- <uni-nav-bar title="导航栏组件" left-text="返回" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar> -->
		<uni-nav-bar status-bar background-color="#000" fixed>
			<view slot="left">
				<view style="font-weight: 20px;color: #FFA200;">标果工厂</view>
			</view>
		    <view class="my-nav just-center flex">
				<view @click="toSerach">搜索</view>
			</view>
			<view solt="right">22</view>
		</uni-nav-bar>
		<view class="back-view"><view class="back-qiu"></view></view>
		<view style="margin-top: -120px;"></view>
		<uni-swiper-dot :info="info" :current="current" field="content">
		    <swiper class="swiper-box" @change="change" circular>
		        <swiper-item v-for="(item ,index) in info" :key="index">
		            <view class="swiper-item">
		                <image :src="imgUrl"></image>
		            </view>
		        </swiper-item>
		    </swiper>
		</uni-swiper-dot>
		<!-- 标题 -->
		<view class="nav-bar flex just-between pad-center-10 align-center">
			<view style="font-weight: bold;font-size: 18px;">限时秒杀</view>
			<navigator url="../sechill/sechill"  hover-class="navigator-hover">
				<view style="font-size: 14px;color: #888;">更多好货疯抢</view>
			</navigator>
		</view>
		<!-- 限时秒杀 -->
		<view class="seckill mag-center-10">
			<view class="sp-list">
				<view class="sp-list-img">
					<image :src="imgUrl"></image>
				</view>
				<view class="sp-list-name">【爆品】《肖月宣》海南25号小事按实际卢卡斯加克拉斯</view>
				<view class="flex just-between">
					<text class="sp-list-weight">约17斤</text>
					<text class="sp-list-time">09:39:51</text>
				</view>
			</view>
		</view>
		<view class="sp-types">
			<view class="sp-types-scrro pad-center-10">
				<scroll-view scroll-x="true" show-scrollbar="true" scroll-left="0">
					<view class="sp-types-content flex">
						<navigator url="../shoppingList/shoppingList"  hover-class="navigator-hover">
							<view class="sp-types-scrro-list active">今日推荐</view>
						</navigator>
						
						<view class="sp-types-scrro-list">今日推荐</view>
						<view class="sp-types-scrro-list">今日推荐</view>
						<view class="sp-types-scrro-list">今日推荐</view>
						<view class="sp-types-scrro-list">今日推荐</view>
						<view class="sp-types-scrro-list">今日推荐</view>
						<view class="sp-types-scrro-list">今日推荐</view>
						<view class="sp-types-scrro-list">今日推荐</view>
						<view class="sp-types-scrro-list">今日推荐</view>
						<view class="sp-types-scrro-list">今日推荐</view>
						<view class="sp-types-scrro-list">今日推荐</view>
					</view>
				</scroll-view>
			</view>
			<shoppingList :data="[1,2,3]" />
		</view>
	</view>
</template>

<script>
	import shoppingList from '../../wxcomponents/shoppingList.vue'
	export default {
		components:{shoppingList},
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
				imgUrl:'http://img3.imgtn.bdimg.com/it/u=372372667,1126179944&fm=26&gp=0.jpg'
			}
		},
		methods: {
			//跳转搜索
			toSerach(){
				uni.navigateTo({
				    url: '../serach/serach'
				});
			},
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
	.back-view{
		width: 100%;
		overflow: hidden;
	}
	.back-qiu{
		width: 150%;
		height: 300px;
		border-radius: 60%;
		background-color: #000;
		position: relative;
		margin-top: -170px;
		margin-left: -25%;
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
		height: 100%;
		color: #fff;
	}
	.nav-bar{
		height: 45px;
	}
	.seckill{
		background-color: #fff;
		border-radius: 8px;
		padding-top: 10px;
		padding-bottom: 25px;
	}
	.sp-list{
		width: 233rpx;
		margin: 0 10px;
	}
	.sp-list-img image{
		width: 233rpx;
		height: 233rpx;
		border-radius: 5px;
	}
	.sp-list-name{
		font-size: 16px;
		display: -webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-colamp:2;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		height: 40px;
		margin-bottom: 10px;
	}
	.sp-types{
		background-color: #fff;
		margin-top: 10px;
	}
	.sp-types-scrro{
		height: 45px;
		line-height: 45px;
	}
	.sp-types-content{
		width: 1000px;
	}
	.sp-types-scrro-list{
		margin: 0 10px;
	}
</style>

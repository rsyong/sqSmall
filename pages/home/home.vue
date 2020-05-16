<template>
	<view class="container">
		<!-- <uni-nav-bar title="导航栏组件" left-text="返回" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar> -->
		<uni-nav-bar status-bar background-color="rgba(0,0,0,1)" fixed>
			<view slot="left">
				<view>
					<image class="logo" src="/static/image/logo.jpg"></image>
				</view>
			</view>
		    <view class="my-nav just-center flex align-center">
				<view @click="toSerach" class="serach">
					<uni-icons type="search" size="16" color="#84785D"></uni-icons>
					<text style="margin-left: 8px;">搜索</text>
				</view>
			</view>
			<view solt="right">22</view>
		</uni-nav-bar>
		<view class="back-view"><view class="back-qiu"></view></view>
		<view style="margin-top: -120px;"></view>
		<uni-swiper-dot :info="info" mode="round" :current="current" field="content" border="rgba(255, 255, 255, .3)" selectedBackgroundColor="#fff">
		    <swiper class="swiper-box" @change="change" circular autoplay easing-function="easeOutCubic">
		        <swiper-item v-for="(item ,index) in info" :key="index" @click="gotoDetails">
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
				<view style="font-size: 14px;color: #888;" class="flex align-center">
					更多好货疯抢
					<view class="arrow"><uni-icons type="arrowright" size="12" color="#fff"></uni-icons></view>
				</view>
			</navigator>
		</view>
		<!-- 限时秒杀 -->
		<view class="seckill mag-center-10">
			<swiper class="swiper-box-miao" circular autoplay interval="4000" display-multiple-items="2" next-margin="170rpx">
			    <swiper-item v-for="(item ,index) in info" :key="index">
			        <view class="swiper-item-miao">
			            <view class="sp-list">
			            	<view class="sp-list-img">
			            		<image :src="imgUrl"></image>
			            	</view>
			            	<view class="sp-list-name only-line-2">【爆品】《肖月宣》海南25号小事按实际卢卡斯加克拉斯</view>
			            	<view class="flex just-between align-center">
			            		<text class="sp-list-weight max-lenth only-line-1">约179808斤</text>
			            		<van-count-down use-slot :time="30 * 60 * 60 * 1000" @change="timeonChange">
			            		  <text class="item">{{ timeData.hours }}</text>
			            		  <text class="item-dost">:</text>
			            		  <text class="item">{{ timeData.minutes }}:</text>
			            		  <text class="item-dost">:</text>
			            		  <text class="item">{{ timeData.seconds }}</text>
			            		</van-count-down>
			            	</view>
			            </view>
			        </view>
			    </swiper-item>
			</swiper>
		</view>
		<!-- 分类 -->
		<van-tabs :active="active" @change="onChange" color="#F9BC2D">
			<van-tab :title="item.content" v-for="(item,index) in info" :key="index"></van-tab>
		</van-tabs>
		<shoppingList :dataList="[1,2,3,4,5]" />
	</view>
</template>

<script>
	import shoppingList from '../../wxcomponents/shoppingList.vue'
	export default {
		components:{shoppingList},
		data() {
			return {
				info: [{
					content: '今日推荐'
				}, {
					content: '内容 B'
				}, {
					content: '内容 C'
				}, {
					content: '内容 C'
				}, {
					content: '内容 C'
				}, {
					content: '内容 C'
				}],
				current: 0,
				imgUrl:'http://img3.imgtn.bdimg.com/it/u=372372667,1126179944&fm=26&gp=0.jpg',
				active:0,
				timeData: {},
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
			},
			onChange(event){
				console.log(event.detail.index)
			},
			timeonChange(e){
				this.timeData=e.detail
			},
			gotoDetails(){
				uni.navigateTo({
					url:"../shoppingDetails/shoppingDetails"
				})
			}
		}
	}
</script>

<style>
	.logo{
		width: 40px;
		height: 40px;
		margin-left: 5px;
		margin-top: 17px;
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
	.swiper-box-miao{
		overflow: hidden;
		height: 200px;
		margin: 0 10px;
	}
	.swiper-item{
		flex: 1;
		padding: 0 10px;
	}
	.swiper-item-miao{
		flex: 1;
		padding-right: 10px;
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
		height: 50px;
	}
	.seckill{
		background-color: #fff;
		border-radius: 8px;
		padding-top: 10px;
		padding-bottom: 25px;
		margin-bottom: 10px;
	}
	.sp-list{
		width: 233rpx;
	}
	.sp-list-img image{
		width: 233rpx;
		height: 233rpx;
		border-radius: 5px;
	}
	.sp-list-name{
		margin-bottom: 5px;
	}
	.serach{
		width: 275rpx;
		height: 52rpx;
		line-height: 52rpx;
		border-radius: 25px;
		border: 1px solid #84785D;
		color: #84785D;
		font-size: 14px;
		padding-left: 10px;
	}
	.item {
	  display: inline-block;
	  width: 18px;
	  color: #ED5758;
	  font-size: 10px;
	  text-align: center;
	  background-color: #FDEDE3;
	  border-radius: 4px;
	}
	.item-dost{
		color: #ED5758;
		margin: 0 2px;
	}
	.max-lenth{
		max-width: 86rpx;
	}
	.arrow{
		width: 15px;
		height: 15px;
		background-color: #F66139;
		text-align: center;
		line-height: 15px;
		border-radius: 50%;
		margin-left: 6px;
	}
</style>

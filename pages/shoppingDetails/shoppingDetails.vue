<template>
	<view>
		<uni-nav-bar @clickLeft="goBack" title="商品详情" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<uni-swiper-dot :info="info" :current="current" field="content" mode="indexes">
		    <swiper class="swiper-box" @change="change">
		        <swiper-item v-for="(item ,index) in info" :key="index">
		            <view class="swiper-item">
		                <image :src="imgUrl"></image>
		            </view>
		        </swiper-item>
		    </swiper>
		</uni-swiper-dot>
		<view class="content">
			<view>***</view>
			<view class="sp-title mb-5">我是标题我是标题我是标题我是标题我是标题我是标题我是标题</view>
			<view class="sp-list-weight mb-5">我是副标题我是副标题我是副标题我是副标题我是副标题我是副标题</view>
			<view class="sp-list-weight mb-5">约27斤</view>
			<view class="flex just-between">
				<view class="mao-weight">毛重</view>
				<view class="mao-weight">实收斤数结算</view>
			</view>
			<view class="list-slogo"><text class="business">商家只供</text> 青阳果业</view>
		</view>
		<view class="content">
			<view class="sp-details-list flex">
				<view class="sp-details-left">免赔情况</view>
				<view>--</view>
			</view>
			<view class="sp-details-list flex">
				<view class="sp-details-left">免赔情况</view>
				<view>--</view>
			</view>
		</view>
		<view class="content">
			<recomSP />
		</view>
		<view class="content">
			<view class="my-title">
				购买须知
				<view class="my-title-line"></view>
			</view>
			<view class="notice-list flex" v-for="(item,index) in noticeList" :key="index">
				<view class="incons">i</view>
				<view class="flex1">
					<view class="notice-list-title">{{item.title}}</view>
					<view class="notice-list-subtitle">{{item.subtitle}}</view>
				</view>
			</view>
		</view>
		<view class="buy-buttom">
			<view class="buy-buttom-content">
				<view class="flex just-between align-center">
					<view></view>
					<view></view>
					<button class="go-buys">加入购物车</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import recomSP from '../../wxcomponents/recomSP.vue';
	export default {
		components:{recomSP},
		data() {
			return {
				info: [{
					content: '今日推荐'
				}, {
					content: '内容 B'
				}, {
					content: '内容 C'
				}],
				imgUrl:'http://img3.imgtn.bdimg.com/it/u=372372667,1126179944&fm=26&gp=0.jpg',
				current:0,
				noticeList:[{
					title:'产品等级 | A级最好',
					subtitle:'标果根据产品口感、颜色、果形、外观等优劣综合评判，将产品分为A/B/C/D四个级别，等级越高，产品的综合品质越好、价格越高；等级与单果规格无关；'
				},{
					title:'属性星级 | 五星最好',
					subtitle:'产品口感、颜色、果形、外观四个属性的好坏程度用以星级表示、星级越高、表示属性越好，例如：“口感星级5”或者“标果5星”表示口感最好；'
				},{
					title:'好货保障 | 可赔可换',
					subtitle:'每个产品详情均有不良率、售后范围、不可售后范围等说明，请仔细阅读；由于农产品特性，不良率以内的货损、不可售后范围中的情况、超出售后时效均不支持售后；'
				},{
					title:'客服支持 | 有问必答',
					subtitle:'如有任何关于商品及平台的问题，请联系您的专属销售人员或客服，客服电话：028-86337508'
				}]
			}
		},
		methods: {
			change(e) {
				this.current = e.detail.current;
			},
		}
	}
</script>

<style>
	.swiper-box{
		height: 746rpx;
	}
	.swiper-item{
		flex: 1;
		height: 746rpx;
	}
	.swiper-item image{
		width: 100%;
		height: 746rpx;
		will-change: transform;
	}
	.content{
		padding: 10px;
		margin-bottom: 10px;
		background-color: #fff;
	}
	.sp-title{
		font-size: 16px;
	}
	.mao-weight{
		font-size: 13px;
	}
	.list-slogo{
		font-size: 10px;
		color: #424242;
		margin-top: 2px;
	}
	.sp-details-left{
		width: 70px;
		margin-right: 10px;
		color: #B3B3B3;
	}
	.sp-details-list{
		margin-bottom: 10px;
	}
	.my-title{
		font-size: 18px;
		font-weight: 600;
	}
	.my-title-line{
		width: 80rpx;
		height: 8rpx;
		background-color: #F8BB23;
		border-radius: 4px;
		margin-top: 3px;
	}
	.incons{
		width: 25px;
		margin-left: 10px;
	}
	.notice-list{
		margin-top: 15px;
	}
	.notice-list-title{
		font-size: 14px;
		font-weight: 600;
	}
	.notice-list-subtitle{
		font-size: 12px;
		color: #878787;
		margin-top: 6px;
	}
	.buy-buttom{
		height: 50px;
	}
	.buy-buttom-content{
		position: fixed;
		width: 100%;
		height: 50px;
		bottom: 0;
		left: 0;
		background-color: #fff;
		border-top: 1px solid #F4F4F4;
	}
	.go-buys{
		width: 330rpx;
		height: 50px;
		line-height: 50px;
		text-align: center;
		border-radius: 0;
	}
	button::after{
		border: none;
	}
</style>

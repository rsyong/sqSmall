<template>
	<view>
		<uni-nav-bar title="购物车" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<view class="content">
			<view class="sp-list flex just-between align-center">
				<view>单选</view>
				<view class="sp-list-detiles flex just-between">
					<view class="sp-list-img">
						<image :src="imgUrl"></image>
					</view>
					<view class="flex flex-column just-between">
						<view class="flex1">我是标题我是博爱提我赛欧加上沙口路基础课</view>
						<view class="flex sp-list-weight align-center">约13斤</view>
						<view class="flex just-between align-center">
							<view>***</view>
							<view>-1+</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view>
			<view class="nav-tuijan flex just-center">
				<view>为您推荐</view>
			</view>
			<shoppingList :dataList="[1,2,3]" />
		</view>
		<view class="nav-bottom">
			<view class="flex just-between cart pad-center-10 align-center">
				<view class="flex align-center">
					<view>
						O 全选
					</view>
					<view class="all-monye">
						<view><text class="all-monye-text">合计</text>:￥0.00</view>
						<view class="small-font">仅为商品费用</view>
					</view>
				</view>
				<view>
					<button>现在结算</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import shoppingList from '../../wxcomponents/shoppingList.vue'
	export default {
		components:{shoppingList},
		data() {
			return {
				imgUrl:'http://img3.imgtn.bdimg.com/it/u=372372667,1126179944&fm=26&gp=0.jpg'
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.content{
		padding: 10px;
		background-color: #fff;
		padding-bottom: 15px;
	}
	.sp-list{
		margin-top: 15px;
	}
	.nav-bottom{
		height: 55px;
	}
	.cart{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 55px;
		background-color: #FFFFFF;
		border-top: 1rpx solid #e0e0e0;
		z-index: 100;
		box-sizing: border-box;
	}
	.all-monye{
		margin-left: 20px;
	}
	.small-font{
		font-size: 10px;
		color: #888;
	}
	.all-monye-text{
		font-weight: bold;
	}
</style>

<template>
	<view>
		<uni-nav-bar @clickLeft="goBack" title="积分兑换" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#FBD449"></uni-nav-bar>
		<view class="flex just-center cash-money align-center shadow-1">
			<view class="cash-content">
				<view style="font-size: 30px;text-align: center;">99</view>
				<view>当前积分</view>
			</view>
		</view>
		<view class="mt-10">
			<view class="cash-list shadow-1">
				<view class="flex just-between cash-list-top align-center">
					<view>
						<view>水果商城</view>
						<view class="mt-10 cash-replace">5元代金券</view>
					</view>
					<view style="color: red;"><text style="font-size: 50px;">5</text>元</view>
				</view>
				<view class="cash-list-bottom flex align-center just-between">
					<view class="integral">50积分</view>
					<view>
						<button size="mini" class="my-button my-background">立即兑换</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.uni-navbar--border{
		border-bottom: none !important;
	}
	.cash-money{
		height: 100px;
		background-color: #FBD449;
		color: #fff;
	}
	.cash-content{
		margin-top: -20px;
	}
	.cash-list{
		margin: 0 10px;
		background-color: #fff;;
		border-radius: 10px;
		margin-bottom: 10px;
	}
	.cash-list-top{
		padding: 10px;
		border-bottom: 1px dashed  #e0e0e0;
	}
	.cash-list-bottom{
		height: 50px;
		padding: 0 10px;
	}
	.cash-replace{
		color: #888;
	}
	.integral{
		font-weight: 600;
	}
</style>

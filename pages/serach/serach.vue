<template>
	<view>
		<uni-nav-bar title="商品搜索" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<view class="content">
			<uni-search-bar />
			<view class="hot-serach">
				<view>热门搜索</view>
				<view class="serach-tars flex">
					<view class="serach-tars-list" v-for="(item,index) in tasData" :key="index">芒果</view>
				</view>
			</view>
			<shoppingListMorn />
		</view>
	</view>
</template>

<script>
	import shoppingListMorn from '../../wxcomponents/shoppingListMorn.vue'
	export default {
		components:{shoppingListMorn},
		data() {
			return {
				tasData:[1,2,3,4,5,6,7,8,9]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.content{
		padding: 10px;
	}
	.hot-serach{
		margin-top: 20px;
	}
	.serach-tars{
		flex-wrap: wrap;
	}
	.serach-tars-list{
		padding: 3px 10px;
		border-radius: 15px;
		background-color: #f2f2f2;
		font-size: 12px;
		margin-right: 10px;
		margin-top: 10px;
	}
</style>

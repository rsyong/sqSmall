<template>
	<view>
		<uni-nav-bar @clickLeft="goBack" title="商品搜索" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<view class="content">
			<uni-search-bar :radius="100" @confirm="search" @input="searchinput" @cancel="cancel"></uni-search-bar>
			<view class="hot-serach" v-if="showHot">
				<view class="flex align-center"><view class="iconfont icon-ai-hot my-icon"></view> <text class="hot-text">热门搜索</text></view>
				<view class="serach-tars flex">
					<view class="serach-tars-list" v-for="(item,index) in tasData" :key="index">芒果</view>
				</view>
			</view>
			<shoppingListMorn v-else />
		</view>
	</view>
</template>

<script>
	import shoppingListMorn from '../../wxcomponents/shoppingListMorn.vue'
	export default {
		components:{shoppingListMorn},
		data() {
			return {
				tasData:[1,2,3,4,5,6,7,8,9],
				showHot:true,//显示热门搜索
			}
		},
		methods: {
			cancel(){
				this.showHot=true;
			},
			search(e){
				if(!e.value) return this.showHot=true;
				this.showHot=false;
			},
			searchinput(e){
				if(!e.value) return this.showHot=true;
			}
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
		padding: 5px 13px;
		border-radius: 15px;
		background-color: #f2f2f2;
		font-size: 12px;
		margin-right: 10px;
		margin-top: 10px;
	}
	.sp-list{
		margin-top: 0px !important;
	}
	.my-icon{
		color: #F4B135;
		margin: 0 3px;
		font-size: 15px;
	}
	.hot-text{
		font-size: 15px;
		font-weight: 600;
		margin-left: 5px;
	}
</style>

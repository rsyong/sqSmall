<template>
	<view>
		<uni-nav-bar @clickLeft="goBack" title="商品搜索" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<view class="content">
			<uni-search-bar :radius="100" @confirm="search" @input="searchinput" @cancel="cancel" :value="name"></uni-search-bar>
			<view class="hot-serach" v-if="showHot">
				<view class="flex align-center"><view class="iconfont icon-ai-hot my-icon"></view> <text class="hot-text">热门搜索</text></view>
				<view class="serach-tars flex">
					<view class="serach-tars-list" @click="toSerach(item)" v-for="(item,index) in serachList" :key="index">{{item}}</view>
				</view>
			</view>
			<shoppingListMorn v-else  :dataList="shoppingList" @onPress="gotoDetails" />
		</view>
	</view>
</template>

<script>
	import shoppingListMorn from '../../wxcomponents/shoppingListMorn.vue'
	export default {
		components:{shoppingListMorn},
		data() {
			return {
				serachList:[],
				showHot:true,//显示热门搜索
				page:1,
				size:10,
				shoppingList:[],
				name:''
			}
		},
		onLoad(){
			this.getSerachList();
		},
		methods: {
			cancel(){
				this.showHot=true;
			},
			search(e){
				if(!e.value) return this.showHot=true;
				this.page=1;
				this.shoppingList=[];
				this.name=e.value;
				this.showHot=false;
				this.getShoppingList();
				this.serachList.push(this.name);
			},
			searchinput(e){
				if(!e.value) return this.showHot=true;
			},
			toSerach(item){
				this.page=1;
				this.shoppingList=[];
				this.name=item;
				this.showHot=false;
				this.getShoppingList();
			},
			//获取搜索列表
			getSerachList(){
				this.request(this.baseURL+"/api/search/getMessage",{},{method:'GET'}).then(res=>{
					this.serachList=res
					uni.hideLoading();
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err});
				})
			},
			//获取商品列表
			getShoppingList(){
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/goods/getList",{
					page:this.page,
					size:this.size,
					name:this.name
				},{method:'GET'}).then(res=>{
					this.shoppingList=this.shoppingList.concat(res)
					uni.hideLoading();
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err});
				})
			},
			//下拉加载更多
			onReachBottom(){
				this.page++;
				uni.showLoading({title:"加载中..."});
				this.getShoppingList();
			},
			gotoDetails(item){
				console.log(item,66)
				uni.navigateTo({
					url:"../shoppingDetails/shoppingDetails?id="+item.id
				})
			},
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

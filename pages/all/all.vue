<template>
	<view>
		<uni-nav-bar title="商品分类" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<view class="serach-bar">
			<view @click="toSerach" class="serach">
				<uni-icons type="search" size="16" color="#424242"></uni-icons>
				搜索
			</view>
		</view>
		<view class="sp-content flex">
			<scroll-view scroll-y class="sp-left-scroll sp-left">
				<view class="sp-left-list" @click="navClick(item,index)" :class="{active:activeNum==index}" v-for="(item,index) in leftData" :key="index">{{item.name}}</view>
			</scroll-view>
			<view class="sp-right flex1">
				<scroll-view scroll-y class="sp-left-scroll" @scrolltolower="toBottom">
					<view class="sp-list flex" @click="gotoDetails(item)" v-for="(item,index) in rightData" :key="index">
						<view class="atric" v-if="item.is_business==1">商家直供</view>
						<view class="full-des" v-if="item.events">满{{item.events.condition_amount}}减{{item.events.amount}}</view>
						<view class="sp-list-img">
							<image :src="item.image" mode="aspectFill" class="shadow-1"></image>
						</view>
						<view>
							<view class="only-line-1">{{item.name}}</view>
							<view class="sp-list-weight only-line-1" :class="{'only-line-2':!item.price}">{{item.note}}</view>
							<view class="sp-list-weight">{{item.type_note}}</view>
							<view class="flex just-between">
								<view class="starating">
									<stars :starNumber="item.star" />
								</view>
							</view>
							<view v-if="item.price" class="price">￥<text class="price-monye">{{item.price}}</text></view>
							<view class="list-slogo" v-if="item.is_business==1"><text class="business">商家直供</text> 万家果品</view>
						</view>
					</view>
					<myNull v-if="rightData.length==0" />
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeNum:0,
				leftData:['商家直供','标果精选','近期上新','畅销产品','进口水果','网红小货','标果小件','本地专供'],
				rightData:[],
				page:1,
				size:10,
				type:''
			}
		},
		onLoad(){
			this.getShoppingList();
		},
		methods: {
			navClick(item,index){
				this.activeNum=index;
				this.page=0;
				this.type=item.id;
				this.rightData=[];
				this.toBottom();
			},
			//跳转搜索
			toSerach(){
				uni.navigateTo({
				    url: '../serach/serach'
				});
			},
			gotoDetails(item){
				uni.navigateTo({
					url:"../shoppingDetails/shoppingDetails?id="+item.id
				})
			},
			//获取商品列表
			getShoppingList(){
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/goods/getAllList",{
					
				},{method:'GET'}).then(res=>{
					uni.hideLoading();
					this.leftData=res;
					if(res.length>0){
						this.rightData=res[0].goods;
						this.type=res[0].id;
					}
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,image:'../../static/image/error.png'});
				})
			},
			//下拉加载更多
			toBottom(){
				this.page++;
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+'/api/goods/getList',{
					page:this.page,
					size:this.size,
					type:this.type
				},{method:'GET'}).then(res=>{
					this.rightData=this.rightData.concat(res);
					uni.hideLoading();
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,image:'../../static/image/error.png'});
				})
			}
		}
	}
</script>

<style>
	page{
		overflow: hidden;
	}
	.sp-left-scroll{
		height: calc(100vh - 120px);
	}
	.sp-left{
		width: 160rpx;
	}
	.sp-left-list{
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 12px;
		width: 160rpx;
		text-align: center;
	}
	.sp-right{
		background-color: #fff;
	}
	.sp-list{
		margin-top: 15px;
		position: relative;
		margin-left: 10px;
		position: relative;
	}
	.selected{
		font-size: 12px;
	}
	.active{
		color: #EFBB24;
		background-color: #fff;
		font-weight: bold;
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
	.list-slogo{
		font-size: 10px;
		color: #424242;
		position: absolute;
		bottom: 3px;
	}
	.serach-bar{
		margin: 10px;
	}
	.serach{
		width: 100%;
		height: 36px;
		line-height: 36px;
		border-radius: 25px;
		color: #A0A0A0;
		background-color: #F8F8F8;
		font-size: 14px;
		text-align: center;
	}
	.sp-list-weight{
		margin: 3px 0;
	}
	.full-des{
		position: absolute;
		left: 0;
		bottom: 3px;
		background-color: rgba(236,177,41,.9);
		font-size: 10px;
		color: #fff;
		text-align: center;
		padding: 3px 10px;
		border-bottom-left-radius: 6px;
	}
</style>

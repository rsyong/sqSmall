<template>
	<view>
		<uni-nav-bar title="商品分类" status-bar color="#fff" fixed :shadow="fasle" background-color="#E7A40D"></uni-nav-bar>
		<view class="serach-bar">
			<view @click="toSerach" class="serach">
				<uni-icons type="search" size="16" color="#424242"></uni-icons>
				搜索
			</view>
		</view>
		<view class="sp-content flex">
			<scroll-view scroll-y class="sp-left-scroll sp-left">
				<view class="sp-left-list flex align-center just-center" @click="navClick(item,index)" :class="{active:activeNum==index}" v-for="(item,index) in leftData" :key="index">{{item.name}}</view>
			</scroll-view>
			<view class="sp-right flex1">
				<scroll-view scroll-y class="sp-left-scroll" @scrolltolower="toBottom">
					<view class="sp-list flex" @click="gotoDetails(item)" v-for="(item,index) in rightData" :key="index">
						<!-- <view class="atric" v-if="item.is_business==1">商家直供</view> -->
						<view class="full-des" v-if="item.events">满{{item.events.condition_amount}}减{{item.events.amount}}</view>
						<view class="sp-list-img">
							<image :src="item.image" mode="aspectFill" class="shadow-1"></image>
							<view class="many-jin" v-if="item.unit_price">￥{{item.unit_price}}/斤</view>
						</view>
						<view class="flex1">
							<view class="only-line-1">{{item.name}}</view>
							<view class="sp-list-weight only-line-1" :class="{'only-line-2':!item.price}">{{item.note}}</view>
							<view class="sp-list-weight">{{item.type_note}}</view>
							<view class="flex just-between">
								<view class="starating">
									<stars :starNumber="item.star" />
								</view>
							</view>
							<view v-if="item.price" class="flex just-between align-center mt-10">
								<view v-if="item.price" class="price">￥<text style="font-size: 23px;">{{item.price}}</text></view>
								<view class="my-sp-buttom" hover-class="hove-bg8" hover-stay-time="50" @click.stop="addNum(item)">
									<uni-icons type="plus-filled" size="23" color="#F0B426"></uni-icons>
								</view>
							</view>
							<!-- <view class="list-slogo" v-if="item.is_business==1"><text class="business">商家直供</text> 万家果品</view> -->
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
				leftData:[],
				rightData:[],
				page:1,
				size:10,
				type:'',
				is_auth:getApp().globalData.userInfo.is_auth
			}
		},
		onLoad(){
			this.getShoppingList();
		},
		onShow() {
			this.setTabBarBadge();
			if(this.is_auth!=1){
				if(getApp().globalData.userInfo.is_auth==1){
					this.is_auth=1;
					this.getShoppingList();
				}
			}
		},
		methods: {
			setTabBarBadge(){
				if(getApp().globalData.goodsAllNum==0) {
					uni.removeTabBarBadge({
						index:2
					})
					return;
				};
				uni.setTabBarBadge({
					index:2,
					text:getApp().globalData.goodsAllNum+''
				})
			},
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
					uni.showToast({title: err,icon:'none'});
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
					uni.showToast({title: err,icon:'none'});
				})
			},
			addNum(item){
				if(!getApp().globalData.token){
					uni.showToast({title: "请登录!",icon:'none'});
					uni.switchTab({
						url:'../my/my'
					})
					return;
				}
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/cart/updateCart",{
					id:item.id,
					num:1
				},{method:'POST'}).then(res=>{
					uni.hideLoading();
					getApp().globalData.goodsAllNum++;
					uni.showToast({
						title:'加入成功'
					})
					this.setTabBarBadge()
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,icon:'none'});
				})
			},
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
		text-align: center;
		font-size: 12px;
		width: 160rpx;
		text-align: center;
		overflow: hidden;
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
		left: 0;
		top: 0;
		background-color: #ff7a01;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		border-top-left-radius: 6px;
		font-size: 10px;
		color: #fff;
		text-align: center;
		padding: 2px 5px;
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
	.my-sp-buttom{
		border-radius: 50%;
		margin-right: 10px;
	}
	.sp-list-img{
		position: relative;
		height: 227rpx;
	}
	.many-jin{
		position: absolute;
		bottom: 0;
		left: 0;
		background-color: rgba(252,97,59,.9);
		font-size: 10px;
		color: #fff;
		text-align: center;
		padding: 3px;
		padding-right: 8px;
		border-top-right-radius: 10px;
		z-index: 10;
		font-size: 10px;
	}
</style>

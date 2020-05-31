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
			<view solt="right"><view style="width: 20px;"></view></view>
		</uni-nav-bar>
		<view class="back-view"><view class="back-qiu"></view></view>
		<view style="margin-top: -120px;"></view>
		<uni-swiper-dot :info="bannerList" mode="round" :current="current" field="content" border="rgba(255, 255, 255, .3)" selectedBackgroundColor="#fff">
		    <swiper class="swiper-box" @change="change" circular autoplay easing-function="easeOutCubic">
		        <swiper-item v-for="(item ,index) in bannerList" :key="index" @click="gotoDetails(item)">
		            <view class="swiper-item">
		                <image :src="item.image" mode="aspectFill"></image>
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
			<swiper  v-if="miaoshaList.length>0" class="swiper-box-miao" circular autoplay interval="4000" :display-multiple-items="miaoshaList.length>1 ? 2 : 1" next-margin="170rpx">
			    <swiper-item v-for="(item ,index) in miaoshaList" :key="index">
			        <view class="swiper-item-miao" @click="gotoDetails(item)">
			            <view class="sp-list">
			            	<view class="sp-list-img">
			            		<image :src="item.image" mode="aspectFill"></image>
			            	</view>
			            	<view class="sp-list-name only-line-2">{{item.name}}</view>
			            	<view class="flex just-between align-center">
			            		<text class="sp-list-weight max-lenth only-line-1">{{item.type_note}}</text>
								<van-count-down :time="item.end_time" />
			            	</view>
			            </view>
			        </view>
			    </swiper-item>
			</swiper>
			<myNull v-if="miaoshaList.length==0" />
		</view>
		<!-- 分类 -->
		<van-tabs :active="active" @change="onChange" color="#F9BC2D">
			<van-tab :title="item.name" v-for="(item,index) in typeList" :key="index"></van-tab>
		</van-tabs>
		<shoppingList :dataList="shoppingList" @onPress="gotoDetails" />
		<myNull v-if="shoppingList.length==0" />
	</view>
</template>

<script>
	import shoppingList from '../../wxcomponents/shoppingList.vue'
	export default {
		components:{shoppingList},
		data() {
			return {
				bannerList:[], //banner列表
				baseURLImg:this.baseURLImg,
				shoppingList:[],
				miaoshaList:[],
				typeList:[],
				current: 0,
				active:0,
				timeData: {},
				page:1,
				size:10,
				tabIndex:0,
				isBottom:false
			}
		},
		onLoad(){
			this.getHome();
			this.getRecommendList(0);
		},
		onShow() {
			this.setTabBarBadge();
		},
		methods: {
			setTabBarBadge(){
				if(getApp().globalData.goodsAllNum==0) {
					uni.removeTabBarBadge({
						index:3
					})
					return
				};
				uni.setTabBarBadge({
					index:3,
					text:getApp().globalData.goodsAllNum+''
				})
			},
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
				this.page=1;
				this.shoppingList=[];
				this.tabIndex=event.detail.index;
				this.isBottom=false;
				this.getRecommendList();
			},
			timeonChange(e){
				this.timeData=e.detail
			},
			gotoDetails(item){
				if(item.type){
					if(item.type==1){
						item.id=item.goods_id
					}else{
						//跳转webview
						return;
					}
				}
				uni.navigateTo({
					url:"../shoppingDetails/shoppingDetails?id="+item.id
				})
			},
			//首页接口
			getHome(){
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+'/api/index/index',{},{method:'GET'}).then(res=>{
					uni.hideLoading();
					this.bannerList=res.rotation_list; //轮播数据
					//秒杀
					this.miaoshaList=res.kill_list;
					if(res.category_list.length>0 && res.category_list[0].name!="推荐"){
						res.category_list.unshift({name:'推荐'});
					}
					this.typeList=res.category_list;
					uni.stopPullDownRefresh()
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,image:'../../static/image/error.png'});
				})
			},
			//获取商品列表
			getRecommendList(){
				let url='/api/goods/getRecommendList';
				let type='';
				if(this.tabIndex>0){
					url="/api/goods/getList";
					type=this.typeList[this.tabIndex].id;
				}
				this.request(this.baseURL+url,{
					page:this.page,
					size:this.size,
					type:type
				},{method:'GET'}).then(res=>{
					if(res.length==0){
						this.isBottom=true;
					}
					this.shoppingList=this.shoppingList.concat(res);
					uni.hideLoading();
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,image:'../../static/image/error.png'});
				})
			},
			//下拉加载更多
			onReachBottom(){
				if(this.isBottom) return;
				this.page++;
				uni.showLoading({title:"加载中..."});
				this.getRecommendList();
			},
			//下拉刷新
			onPullDownRefresh(){
				this.getHome();
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

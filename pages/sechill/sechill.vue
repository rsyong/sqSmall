<template>
	<view>
		<!-- <uni-nav-bar @clickLeft="goBack" status-bar background-color="#000" fixed>
		    <view class="my-nav">精品秒杀</view>
		</uni-nav-bar> -->
		<uni-nav-bar @clickLeft="goBack" title="精品秒杀" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<view class="content">
			<view class="sp-list flex just-between" v-for="(item,index) in shoppingList" :key="index" @click.stop="gotoDetails(item)">
				<view class="sp-list-img">
					<image :src="item.image" mode="aspectFill"></image>
				</view>
				<view class="flex1">
					<view>{{item.name}}</view>
					<view class="sp-list-weight">{{item.type_note}}</view>
					<view class="sp-list-weight">距离结束 <van-count-down :time="item.end_time - item.start_time" /></view>
					<view class="flex just-between sp-bottom">
						<view class="flex1 stars"><stars :starNumber="item.star" /></view>
						<button class="sp-my-bottom" type="default" @click.stop="goBuy(item)">
							抢购
							<view class="progress">
								<progress :percent="item.sale_num/item.num.toFixed(1)*100" show-info stroke-width="3" border-radius="10" font-size="8" activeColor="#FEFFF7" backgroundColor="#F9B6A3" active />
							</view>
						</button>
					</view>
				</view>
			</view>
			<myNull v-if="shoppingList.length==0" />
		</view>
		<view class="fi-cart">
			<view class="iconfont icon-cart_icon my-icon"></view>
			<view class="badge">
				<uni-badge :text="goodsAllNum" type="error" size='small'></uni-badge>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1,
				size:10,
				shoppingList:[],
				goodsAllNum:getApp().globalData.goodsAllNum
			}
		},
		onLoad(){
			this.getShoppingList();
		},
		methods: {
			//获取商品列表
			getShoppingList(){
				this.request(this.baseURL+"/api/goods/getKillGoods",{
					page:this.page,
					size:this.size
				},{method:'GET'}).then(res=>{
					this.shoppingList=this.shoppingList.concat(res);
					uni.hideLoading();
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,image:'../../static/image/error.png'});
				})
			},
			//跳转
			gotoDetails(item){
				uni.navigateTo({
					url:"../shoppingDetails/shoppingDetails?id="+item.id
				})
			},
			goBuy(item){
				if(getApp().globalData.userInfo.is_auth!=1){
					uni.showToast({title: "请先认证!",image:'../../static/image/error.png'});
					uni.switchTab({
						url:'../my/my'
					})
					return;
				}
				if(item.sale_num==item.num){
					return uni.showToast({title: "当前已被抢完!",image:'../../static/image/error.png'});
				}
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/goods/addCart",{
					id:item.id,
					num:1
				},{method:'POST'}).then(res=>{
					uni.hideLoading();
					getApp().globalData.goodsAllNum++;
					this.goodsAllNum=getApp().globalData.goodsAllNum;
					uni.showToast({title: res});
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,image:'../../static/image/error.png'});
				})
			},
			onReachBottom(){
				this.page++;
				uni.showLoading({title:"加载中..."});
				this.getShoppingList();
			}
		}
	}
</script>

<style>
	.content{
		margin: 10px;
	}
	.sp-list{
		background-color: #FFFFFF;
		border-radius: 6px;
		padding: 10px;
		margin-bottom: 10px;
	}
	.sp-bottom{
		align-items: flex-end;
		margin-top: 3px;
	}
	button.sp-my-bottom{
		background-color: #F9663D;
		width: 100px;
		height: 42px;
		color: #fff;
		font-size: 12px;
	}
	button::after{
		border: none;
	}
	.stars{
		margin-bottom: 20px;
	}
	.progress{
		margin-top: -10px;
	}
	.sp-list-weight{
		margin: 3px 0;
	}
	.fi-cart{
		position: fixed;
		left: 30px;
		bottom: 100px;
		width: 40px;
		height: 40px;
		background-color: rgba(0,0,0,.2);
		border-radius: 50%;
		text-align: center;
		line-height: 40px;
		z-index: 1000;
	}
	.my-icon{
		font-size: 20px;
		color: #fff;
	}
	.badge{
		position: absolute;
		top: 0;
		right: 0;
	}
</style>

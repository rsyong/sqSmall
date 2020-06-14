<template>
	<view>
		<!-- <uni-nav-bar @clickLeft="goBack" status-bar background-color="#000" fixed>
		    <view class="my-nav">精品秒杀</view>
		</uni-nav-bar> -->
		<uni-nav-bar @clickLeft="goBack" title="精品秒杀" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<view class="content">
			<view class="sp-list flex just-between shadow-1" v-for="(item,index) in shoppingList" :key="index" @click.stop="gotoDetails(item)">
				<view class="atric" v-if="item.is_business==1">商家直供</view>
				<view class="sp-list-img">
					<image :src="item.image" mode="aspectFill" class="shadow-1"></image>
					<view class="full-des" v-if="item.events">满{{item.events.condition_amount}}减{{item.events.amount}}</view>
				</view>
				<view class="flex1">
					<view class="only-line-1">{{item.name}}</view>
					<view class="sp-list-weight only-line-1">{{item.type_note}}</view>
					<view class="sp-list-weight flex align-center"><text class="mr-10">距离结束:</text>
						<CountDown :endTime="item.end_time" :startTime="item.start_time" />
						<!-- <van-count-down :time="item.end_time" /> -->
					</view>
					<view v-if="item.price" class="price">￥<text class="price-monye">{{item.price}}</text></view>
					<view class="flex just-between sp-bottom">
						<view class="flex1 stars"><stars :starNumber="item.star" /></view>
						<button class="sp-my-bottom shadow" type="default" @click.stop="goBuy(item)">
							抢购
							<view class="progress">
								<progress :percent="item | myprogress" show-info stroke-width="3" border-radius="10" font-size="8" activeColor="#FEFFF7" backgroundColor="#F9B6A3" active />
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
	import CountDown from '../../wxcomponents/CountDown/CountDown.vue'
	export default {
		components:{CountDown},
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
		filters:{
			myprogress(item){
				let num=((item.sale_num/item.num)*100).toFixed(1);
				return num;
			}
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
					uni.showToast({title: err,icon:'none'});
				})
			},
			//跳转
			gotoDetails(item){
				uni.navigateTo({
					url:"../shoppingDetails/shoppingDetails?id="+item.id
				})
			},
			goBuy(item){
				if(!getApp().globalData.token){
					return uni.showModal({
					    title: '提示',
					    content: '请先登录',
					    success: function (res) {
					        if (res.confirm) {
					            uni.switchTab({
					            	url:'../my/my'
					            })
					        } 
					    }
					});
				}
				if(getApp().globalData.userInfo.is_auth!=1){
					return uni.showModal({
					    title: '提示',
					    content: '请先认证',
					    success: function (res) {
					        if (res.confirm) {
								uni.navigateTo({
									url:'../personal/personal'
								})
					        } 
					    }
					});
				}
				let onwTime=new Date().getTime()/1000;
				if(item.start_time>onwTime){
					return uni.showToast({title: '活动未开始',icon:'none'});
				}
				if(item.end_time<onwTime){
					return uni.showToast({title: '活动已结束',icon:'none'});
				}
				if(item.sale_num>=item.num){
					return uni.showToast({title: "当前已被抢完!",icon:'none'});
				}
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/goods/addCart",{
					id:item.id,
					num:1,
					is_rush:1
				},{method:'POST'}).then(res=>{
					uni.hideLoading();
					getApp().globalData.goodsAllNum++;
					item.sale_num++;
					this.goodsAllNum=getApp().globalData.goodsAllNum;
					uni.showToast({title: res});
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,icon:'none'});
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
		position: relative;
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
	.sp-list-img{
		position: relative;
		height: 227rpx;
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
		z-index: 10;
	}
	.full-des{
		position: absolute;
		left: 0;
		bottom: 0;
		background-color: rgba(236,177,41,.9);
		font-size: 10px;
		color: #fff;
		text-align: center;
		padding: 3px 10px;
		border-bottom-left-radius: 6px;
	}
</style>

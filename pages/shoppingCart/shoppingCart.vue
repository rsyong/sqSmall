<template>
	<view>
		<uni-nav-bar title="购物车" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<view class="content">
			<view class="sp-list flex just-between align-center" v-for="(item,index) in goodsList" :key="index">
				<view class="c-radio" @click="radioChange(item)">
					<myRadio color="#F0B426" :checked="item.checked" v-if="item.status==1" />
				</view>
				<view class="sp-list-detiles flex just-between" @click.stop="gotoDetails(item)">
					<view class="sp-list-img">
						<image :src="item.image" mode="aspectFill" class="shadow"></image>
						<view class="full-dess" v-if="item.events">满{{item.events.condition_amount}}减{{item.events.amount}}</view>
					</view>
					<view class="flex flex-column just-between">
						<view class="flex">
							<view class="flex1 only-line-2">{{item.name}}</view>
							<view class="iconfont icon-shanchu my-icon" @click.stop="todetele(item)"></view>
						</view>
						
						<view class="flex sp-list-weight align-center">{{item.type_note}}</view>
						<view class="flex price-monye my-color">￥{{item.price}}</view>
						<view class="flex just-between align-center">
							<view>
								<stars :starNumber="item.star" />
							</view>
							<view v-if="item.goods_suatus==0">
								<view v-if="item.goods_suatus==0" class="flex align-center add-bottoms">
									<text class="sp-list-weight">已下架</text>
								</view>
							</view>
							<view v-else>
								<view class="flex align-center add-bottoms" v-if="item.status==1">
									<view class="my-sp-buttom" hover-class="hove-bg8" hover-stay-time="50" @click.stop="removeNum(item)">
										<uni-icons type="minus-filled" size="23" color="#F0B426"></uni-icons>
									</view>
									<view class="my-sp-number">{{item.num}}</view>
									<view class="my-sp-buttom" hover-class="hove-bg8" hover-stay-time="50" @click.stop="addNum(item)">
										<uni-icons type="plus-filled" size="23" color="#F0B426"></uni-icons>
									</view>
								</view>
								<view v-if="item.status==0" class="flex align-center add-bottoms">
									<text class="sp-list-weight">已失效</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<myNull v-if="goodsList.length==0" />
		</view>
		<view>
			<view class="nav-tuijan flex just-center align-center" v-if="dataList.length>0">
				<view class="dots-1"></view>
				<view class="dots-2"></view>
				<view class="dots-3"></view>
				<view class="nav-tuijan-title">为您推荐</view>
				<view class="dots-3"></view>
				<view class="dots-2"></view>
				<view class="dots-1"></view>
			</view>
			<shoppingList :dataList="dataList" @onPress="gotoDetails" />
		</view>
		<view class="nav-bottom">
			<view class="flex just-between cart pad-center-10 align-center">
				<view class="flex align-center">
					<view class="flex align-center">
						<view  @click="radioAllChange" class="flex align-center">
							<myRadio color="#F0B426" :checked="AllCheck"/> <text style="margin-left: 10px;">全选</text>
						</view>
						<view class="all-monye flex">
							<!-- <view><text class="all-monye-text">合计:</text><text class="all-monye-monye">￥0.00</text></view> -->
							<view class="small-font">仅为商品费用</view>
						</view>
					</view>
				</view>
				<view>
					<button class="my-background my-button shadow" @click="bugsGoods">现在结算</button>
					<!-- <van-button round  color="#F0B426" custom-style="width: 100px;" @click="bugsGoods">现在结算</van-button> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import shoppingList from '../../wxcomponents/shoppingList.vue'
	import myRadio from '../../wxcomponents/my-radio/my-radio.vue'
	import {getAllNum} from '../../common/js/untils'
	export default {
		components:{shoppingList,myRadio},
		data() {
			return {
				AllCheck:false,
				page:1,
				size:10,
				goodsList:[],
				dataList:[],
				isBottom:false
			}
		},
		onLoad() {
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
			uni.showLoading({title:"加载中..."});
		},
		onShow() {
			if(!getApp().globalData.token) return;
			this.page=1;
			this.getShoppingList(true);
		},
		methods: {
			radioChange(item){
				item.checked=!item.checked;
				let list=this.goodsList;
				this.goodsList=[];
				this.goodsList=list;
				let find=this.goodsList.filter(o=>o.checked);
				this.AllCheck=find.length === list.length;
			},
			//全选
			radioAllChange(){
				this.AllCheck=!this.AllCheck;
				let list=this.goodsList;
				list.forEach(item=>{
					item.checked=this.AllCheck;
				})
				this.goodsList=[];
				this.goodsList=list;
			},
			addNum(item){
				this.updateCars(item,2);
			},
			removeNum(item){
				if(item.num==1) return;
				this.updateCars(item,1);
			},
			gotoDetails(item){
				uni.navigateTo({
					url:"../shoppingDetails/shoppingDetails?id="+item.id
				})
			},
			//获取商品列表
			getShoppingList(noConcat){
				this.request(this.baseURL+"/api/cart/getList",{
					page:this.page,
					size:this.size
				},{method:'GET'}).then(res=>{
					uni.hideLoading();
					res.cart_list.forEach(item=>{
						item.checked=this.AllCheck;
					})
					if(noConcat){
						this.goodsList=res.cart_list;
					}else{
						this.goodsList=this.goodsList.concat(res.cart_list);
					}
					this.isBottom=res.cart_list.length==0;
					this.dataList=res.recommend_list;
					getApp().globalData.goodsAllNum=getAllNum(res.cart_list);
					if(getApp().globalData.goodsAllNum==0) {
						uni.removeTabBarBadge({
							index:3
						})
						return;
					};
					uni.setTabBarBadge({
						index:3,
						text:getApp().globalData.goodsAllNum+''
					})
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,icon:'none'});
				})
			},
			//现在结算
			bugsGoods(){
				let obj=[];
				this.goodsList.forEach(item=>{
					if(item.checked){
						obj.push({
							id:item.id,
							num:item.num
						})
					}
				})
				if(obj.length==0){
					return uni.showToast({title: '请选择商品',icon:'none'});
				}
				getApp().globalData.orderInfo=obj;
				uni.navigateTo({
					url:'../my/address/address'
				})
				return;
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/order/placeOrder",{
					cart:obj
				},{method:'POST'}).then(res=>{
					uni.hideLoading();
					uni.showToast({title: '下单成功'});
					this.getShoppingList(true);
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,icon:'none'});
				})
			},
			//更新商品数量
			updateCars(item,status){
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
					num:status==1 ?item.num-1:item.num+1
				},{method:'POST'}).then(res=>{
					uni.hideLoading();
					if(status==1){ //减
						item.num--;
						getApp().globalData.goodsAllNum--;
					}else{
						item.num++;
						getApp().globalData.goodsAllNum++;
					}
					uni.setTabBarBadge({
						index:3,
						text:getApp().globalData.goodsAllNum+''
					})
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,icon:'none'});
				})
			},
			//删除
			todetele(item){
				uni.showModal({
				    title: '提示',
				    content: '确定要删除吗？',
					confirmColor:'red',
				    success: (res) => {
				        if (res.confirm) {
							uni.showLoading({title:"加载中..."});
							this.request(this.baseURL+"/api/cart/updateCart",{
								id:item.id,
								num:0
							},{method:'POST'}).then(res=>{
								uni.hideLoading();
								this.getShoppingList(true);
							}).catch(err=>{
								uni.hideLoading();
								uni.showToast({title: err,icon:'none'});
							})
				        } 
				    }
				});
			},
			//上拉加载更多
			onReachBottom(){
				if(this.isBottom) return;
				this.page++;
				this.getShoppingList();
			},
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
		margin-top: 3px;
	}
	.all-monye-text{
		font-weight: bold;
	}
	.c-radio{
		width: 27px;
		margin-right: 3px;
	}
	.my-sp-buttom{
		border-radius: 50%;
	}
	.my-sp-number{
		margin: 0 10px;
	}
	.add-bottoms{
		justify-content: flex-end;
	}
	.all-monye-monye{
		color: #E4A956;
	}
	.hove-bg8{
		background-color: rgba(0,0,0,.1);
	}
	.my-icon{
		margin-left: 10px;
		color: #A4A4A4;
	}
	.price-monye{
		font-size: 12px;
	}
	.sp-list-img{
		position: relative;
	}
	.full-dess{
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

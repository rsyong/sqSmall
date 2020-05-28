<template>
	<view>
		<uni-nav-bar title="购物车" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<view class="content">
			<view class="sp-list flex just-between align-center" v-for="(item,index) in goodsList" :key="index">
				<view class="c-radio" @click="radioChange(item)">
					<myRadio color="#F0B426" :checked="item.checked" />
				</view>
				<view class="sp-list-detiles flex just-between" @click.stop="gotoDetails(item)">
					<view class="sp-list-img">
						<image :src="item.image"></image>
					</view>
					<view class="flex flex-column just-between">
						<view class="flex1 only-line-2">{{item.name}}</view>
						<view class="flex sp-list-weight align-center">{{item.type_note}}</view>
						<view class="flex just-between align-center">
							<stars :starNumber="item.star" />
							<view class="flex align-center add-bottoms">
								<view class="my-sp-buttom" hover-class="hove-bg8" hover-stay-time="50" @click.stop="removeNum(item)">
									<uni-icons type="minus-filled" size="23" color="#F0B426"></uni-icons>
								</view>
								<view class="my-sp-number">{{item.num}}</view>
								<view class="my-sp-buttom" hover-class="hove-bg8" hover-stay-time="50" @click.stop="addNum(item)">
									<uni-icons type="plus-filled" size="23" color="#F0B426"></uni-icons>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view>
			<view class="nav-tuijan flex just-center">
				<view>为您推荐</view>
			</view>
			<shoppingList :dataList="dataList" />
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
					<van-button round  color="#F0B426" custom-style="width: 100px;" @click="bugsGoods">现在结算</van-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import shoppingList from '../../wxcomponents/shoppingList.vue'
	import myRadio from '../../wxcomponents/my-radio/my-radio.vue'
	export default {
		components:{shoppingList,myRadio},
		data() {
			return {
				AllCheck:false,
				page:1,
				size:10,
				goodsList:[],
				dataList:[]
			}
		},
		onShow() {
			this.goodsList=[];
			this.getShoppingList();
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
				item.num++;
			},
			removeNum(item){
				item.num--;
			},
			gotoDetails(item){
				uni.navigateTo({
					url:"../shoppingDetails/shoppingDetails?id="+item.id
				})
			},
			//获取商品列表
			getShoppingList(){
				this.request(this.baseURL+"/api/cart/getList",{
					page:this.page,
					size:this.size
				},{method:'GET'}).then(res=>{
					this.goodsList=this.goodsList.concat(res.cart_list);
					this.dataList=res.recommend_list;
					uni.hideLoading();
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err});
				})
			},
			//现在结算
			bugsGoods(){
				let obj={};
				this.goodsList.forEach(item=>{
					if(item.checked){
						obj['cart['+item.id+']']=item.num;
					}
				})
				console.log(obj)
				if(JSON.stringify(obj) == "{}"){
					return uni.showToast({title: '请选择商品'});
				}
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/order/placeOrder",obj,{method:'POST'}).then(res=>{
					uni.hideLoading();
					uni.showToast({title: '加入成功'});
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err});
				})
			}
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
</style>

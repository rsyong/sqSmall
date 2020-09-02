<template>
	<view>
		<uni-nav-bar @clickLeft="goBack" title="商品详情" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#E7A40D">
			<view slot="left" v-if="[1007,1008].includes(scene)">
				<view>
					<image class="homeimg" src="/static/image/home.png" mode="aspectFill" @click="goHome"></image>
				</view>
			</view>
		</uni-nav-bar>
		<view class="banner">
			<swiper class="swiper-box" @change="change" autoplay indicator-dots indicator-active-color="#fff" indicator-color="rgba(255,255,255,.6)">
			    <swiper-item v-for="(item ,index) in Alldata.images" :key="index">
			        <view class="swiper-item">
			            <image :src="item" mode="aspectFill" @click="previewImage(index)"></image>
			        </view>
			    </swiper-item>
			</swiper>
			<!-- <view class="atric" v-if="Alldata.is_business==1">商家直供</view> -->
			<view class="share flex just-center align-center">
				<button open-type='share' plain style="border: none;padding-left: 0;padding-right: 0;">
					<uni-icons type="redo" size="20" color="#fff"></uni-icons>
				</button>
			</view>
			<!-- <view class="banner-lables"><text>{{current+1}}</text>/{{Alldata.images.length || 0}}</view> -->
		</view>
		<view class="content">
			<stars :starNumber="Alldata.star" />
			<view class="sp-title mb-5">{{Alldata.name}}</view>
			<view class="sp-list-weight sp-sun-title" style="font-size: 12px;">{{Alldata.note}}</view>
			<view class="sp-list-weight mb-5" v-if="Alldata.unit_price">
				<text class="my-color small-monye"  style="font-size: 17px;margin-left: 0;" >￥{{Alldata.unit_price}}</text>/斤
			</view>
			<view class="full-des mb-5 my-color" v-if="Alldata.events">满{{Alldata.events.condition_amount}}减{{Alldata.events.amount}}</view>
			<view class="flex just-between">
				<view class="mao-weight font-lg-14">毛重约{{Alldata.hair}}斤 净重约{{Alldata.weight}}斤</view>
				<view class="mao-weight font-lg-14">{{Alldata.type}}</view>
			</view>
			<view class="mt-10" style="font-size: 14px;">
				<text style="font-weight: 600;">销量</text>
				<text class="sales">已售<text class="has-sales">{{Alldata.sale_num}}</text>件，仅剩<text class="has-sales">{{Alldata.stock}}</text>件</text>
			</view>
			<view v-if="Alldata.price" class="price mt-10">￥<text class="price-monye" style="font-size: 20px;">{{Alldata.price}}</text></view>
			<!-- <view class="list-slogo"  style="font-size: 14px;" v-if="Alldata.is_business==1"><text class="business">商家直供</text> 万家果品</view> -->
		</view>
		<view class="content">
			<view class="sp-details-list flex">
				<view class="sp-details-left">产品等级</view><view>{{Alldata.grades.name || ''}}</view>
			</view>
			<view class="sp-details-list flex">
				<view class="sp-details-left">产地</view><view>{{Alldata.source}}</view>
			</view>
			<view class="sp-details-list flex">
				<view class="sp-details-left">口感</view><view>{{Alldata.texture_star | mystatus}}</view>
			</view>
			<view class="sp-details-list flex">
				<view class="sp-details-left">颜色</view><view>{{Alldata.color_star | mystatus}}</view>
			</view>
			<view class="sp-details-list flex">
				<view class="sp-details-left">外观包装</view><view>{{Alldata.packing.name || ''}}</view>
			</view>
			<view class="sp-details-list flex">
				<view class="sp-details-left">免赔情况</view><view>{{Alldata.compensate}}</view>
			</view>
			<view class="sp-details-list flex">
				<view class="sp-details-left">可售后情况</view><view>{{Alldata.sale_situation}}</view>
			</view>
			<!-- <view class="sp-details-list flex">
				<view class="sp-details-left">备注</view><view>{{Alldata.remarks}}</view>
			</view> -->
			<!-- <view class="sp-details-list flex">
				<view class="sp-details-left">单个重量</view><view>{{Alldata.weight || 0}}斤</view>
			</view> -->
			
			<!-- <view class="sp-details-list flex">
				<view class="sp-details-left">外观星级</view><view>{{Alldata.exterior_star}}</view>
			</view> -->
			<!-- <view class="sp-details-list flex">
				<view class="sp-details-left">果形星级</view><view>{{Alldata.shape_star}}</view>
			</view> -->
			
			<view class="sp-details-list flex">
				<view class="sp-details-left">售后时效</view><view>{{Alldata.sale_time}}</view>
			</view>
			<view class="sp-details-list flex">
				<view class="sp-details-left">不良率</view><view>{{Alldata.adverse_rate || 0}}%</view>
			</view>
		</view>
		<view class="content">
			<view class="nav-tuijan flex just-center align-center mb-10">
				<view class="dots-2"></view>
				<view class="dots-2"></view>
				<view class="dots-2"></view>
				<view class="nav-tuijan-title">为您推荐</view>
				<view class="dots-2"></view>
				<view class="dots-2"></view>
				<view class="dots-2"></view>
			</view>
			<recomSP @onPress="gotoDetails" />
		</view>
		<view class="content">
			<view class="my-title">
				购买说明
				<view class="my-title-line"></view>
			</view>
			<view class="notice-list flex" v-for="(item,index) in noticeList" :key="index">
				<view class="incons">
					<view class="my-icon"></view>
				</view>
				<view class="flex1">
					<view class="notice-list-title">{{item.title}}</view>
					<view class="notice-list-subtitle">{{item.subtitle}}</view>
				</view>
			</view>
		</view>
		<view class="buy-buttom">
			<view class="buy-buttom-content">
				<view class="flex just-between align-center">
					<view class="carts flex1">
						<view class="iconfont icon-cart_icon" @click="toSP">
							<view class="carts-dost">{{goodsAllNum}}</view>
						</view>
					</view>
					<view>
						<view class="settlement flex align-center">
							<button class="settlement-left" @click="removeNum" :disabled="goodNum<=1">-</button>
							<view class="settlement-number flex1">{{goodNum}}</view>
							<button class="settlement-right" @click="addNum" :disabled="goodNum>=Alldata.stock">+</button>
						</view>
					</view>
					<button class="go-buys my-background" @click="addCars">加入购物车</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import recomSP from '../../wxcomponents/recomSP.vue';
	export default {
		components:{recomSP},
		data() {
			return {
				imgUrl:'http://img3.imgtn.bdimg.com/it/u=372372667,1126179944&fm=26&gp=0.jpg',
				current:0,
				noticeList:[{
					title:'产品等级',
					icon:'icon-dengji',
					subtitle:'万家果品提供的商品根据外观、颜色、口感。品相。分为A/B/C三个等级 、A级为最高规格。'
				},{
					title:'售后保障',
					icon:'icon-techreport-',
					subtitle:'生鲜产品的特殊性。每件商品均有不良率的产生。根据不良率提供售后。理赔退换、不良率多少根据商品详细页面展示。超出理赔时效不予售后。'
				},{
					title:'客服在线',
					icon:'icon-love',
					subtitle:'如遇到任何问题可以先联系各区销售代表或客服客服电话18502319565 '
				}],
				id:"",
				Alldata:'',
				goodNum:1,
				goodsAllNum:getApp().globalData.goodsAllNum,//购物车数量
				scene:getApp().globalData.scene
			}
		},
		filters:{
			mystatus(num){
				switch (num){
					case 1:
						return '一般'
						break;
					case 2:
						return '较好'
						break;
					case 3:
						return '良好'
						break;
					case 4:
						return '优选'
						break;
					case 4:
						return '精选'
						break;
					default:
						return '良选'
						break;
				}
			}
		},
		onLoad(option){
			this.id=option.id;
			this.getGoodsDetail();
		},
		onUnload() {
			getApp().globalData.scene=null;
		},
		onShareAppMessage() {
			return {
				title: this.Alldata.name || '万家果品',
				imageUrl:this.Alldata.images[0] || ''
			}
		},
		methods: {
			change(e) {
				this.current = e.detail.current;
			},
			//获取商品详细
			getGoodsDetail(){
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/goods/detail",{
					id:this.id
				},{method:'GET'}).then(res=>{
					this.Alldata=res;
					uni.hideLoading();
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,icon:'none'});
				})
			},
			//加
			addNum(){
				if(this.goodNum>=this.Alldata.stock){
					uni.showToast({title: "已超出最大库存",icon:'none'});
					return;
				}
				this.goodNum++;
			},
			removeNum(){
				if(this.goodNum==1) return;
				this.goodNum--;
			},
			addCars(){
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
				uni.showLoading({title:"加载中..."});
				this.request(this.baseURL+"/api/goods/addCart",{
					id:this.Alldata.id,
					num:this.goodNum
				},{method:'POST'}).then(res=>{
					uni.hideLoading();
					getApp().globalData.goodsAllNum+=this.goodNum;
					this.goodsAllNum=getApp().globalData.goodsAllNum;
					uni.showToast({title: res});
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({title: err,icon:'none'});
				})
			},
			toSP(){
				uni.switchTab({
					url:'../shoppingCart/shoppingCart'
				})
			},
			gotoDetails(item){
				uni.navigateTo({
					url:"../shoppingDetails/shoppingDetails?id="+item.id
				})
			},
			//预览图片
			previewImage(index){
				uni.previewImage({
					current:index,
					urls: this.Alldata.images,
					indicator:'number'
				});
			},
			goHome(){
				uni.switchTab({
					url:'../home/home'
				})
			}
		}
	}
</script>

<style>
	.swiper-box{
		height: 746rpx;
	}
	.swiper-item{
		flex: 1;
		height: 746rpx;
	}
	.swiper-item image{
		width: 100%;
		height: 746rpx;
		will-change: transform;
	}
	.content{
		padding: 10px;
		margin-bottom: 10px;
		background-color: #fff;
	}
	.sp-title{
		font-size: 17px;
		margin-top: 5px;
		font-weight: 600;
	}
	.sp-sun-title{
		margin-top: 15px;
		margin-bottom: 5px;
	}
	.mao-weight{
		font-size: 12px;
		color: #888;
	}
	.list-slogo{
		font-size: 10px;
		color: #424242;
		margin-top: 2px;
	}
	.sp-details-left{
		width: 70px;
		margin-right: 10px;
		color: #333;
	}
	.sp-details-left+view{
		color: #B3B3B3;
		font-style: italic;
	}
	.sp-details-list{
		margin-bottom: 10px;
	}
	.my-title{
		font-size: 18px;
		font-weight: 600;
	}
	.my-title-line{
		width: 140rpx;
		height: 8rpx;
		background-color: #F8BB23;
		border-radius: 4px;
		margin-top: 3px;
	}
	.incons{
		width: 25px;
		margin-left: 10px;
	}
	.notice-list{
		margin-top: 15px;
	}
	.notice-list-title{
		font-size: 14px;
		font-weight: 600;
	}
	.notice-list-subtitle{
		font-size: 12px;
		color: #878787;
		margin-top: 6px;
	}
	.buy-buttom{
		height: 50px;
	}
	.buy-buttom-content{
		position: fixed;
		width: 100%;
		height: 50px;
		bottom: 0;
		left: 0;
		background-color: #fff;
		border-top: 1px solid #F4F4F4;
	}
	.go-buys{
		width: 330rpx;
		height: 50px;
		line-height: 50px;
		text-align: center;
		border-radius: 0;
		margin-left: 15px;
		color: #fff;
	}
	button::after{
		border: none;
	}
	.banner{
		position: relative;
	}
	.banner-lables{
		min-width: 60rpx;
		height: 40rpx;
		background-color: rgba(0,0,0,.3);
		text-align: center;
		line-height: 40rpx;
		padding: 10px;
		color: #fff;
		font-size: 14px;
		position: absolute;
		bottom: 15px;
		right: 0;
		border-top-left-radius: 55rpx;
		border-bottom-left-radius: 55rpx;
	}
	.banner-lables text{
		font-size: 16px;
	}
	.carts{
		padding-left: 10px;
	}
	.carts .icon-cart_icon{
		font-size: 28px;
		position: relative;
		color: #8C8C8C;
	}
	.settlement{
		border-radius: 25px;
		width: 90px;
		border: 1px solid #ddd;
		overflow: hidden;
	}
	.settlement button{
		width: 25px;
		height: 25px;
		border-radius: 0;
		text-align: center;
		line-height: 25px;
		padding: 0;
		color: #878787;
	}
	.settlement-left{
		border-right: 1px solid #ddd;
	}
	.settlement-right{
		border-left: 1px solid #ddd;
	}
	.settlement-number{
		text-align: center;
		color: #878787;
	}
	.carts-dost{
		height: 15px;
		min-width: 15px;
		background-color: #FF4F55;
		color: #fff;
		text-align: center;
		line-height: 15px;
		position: absolute;
		top: -6px;
		left: 28px;
		border-radius: 15px;
		border-bottom-left-radius: 0;
		font-size: 8px;
	}
	.atric{
		position: absolute;
		left: 0;
		top: 10px;
		background-color: #ff7a01;
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
		font-size: 16px;
		color: #fff;
		text-align: center;
		padding: 5px 12px;
	}
	.my-icon{
		width: 10px;
		height: 10px;
		border-radius: 10px;
		background-color: #F8BF2C;
		margin-top: 5px;
	}
	.share{
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background-color: rgba(0,0,0,.5);
		position: absolute;
		right: 10px;
		top: 10px;
	}
	.small-monye{
		margin-left: 10px;
		font-size: 16px;
	}
	.full-des{
		font-size: 12px;
	}
	.sales{
		color: #A2A2A2;
		margin-left: 10px;
	}
	.has-sales{
		color: #DC3136;
		margin: 0 2px;
	}
	.homeimg{
		height: 20px;
		width: 20px;
		position: relative;
		margin-top: 15px;
		margin-left: 5px;
	}
	.font-lg-14{
		font-size: 14px;
	}
</style>

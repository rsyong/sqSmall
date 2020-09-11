<template>
	<view style="position: relative;">
		<uni-swiper-dot :info="myAlldata" :current="current" field="content"  mode="round" :dotsStyles="dotsStyles" >
		    <swiper class="swiper-box2" @change="change" circular autoplay>
		        <swiper-item v-for="(item ,index) in myAlldata" :key="index">
		            <view class="swiper-item2">
		    			<view class="flex swiper-item-list">
		    				<view :style="{margin:key%3==1 ? '0 20rpx' : 0}" class="list" v-for="(item2,key) in myAlldata[index]" :key="key"  @click="onPress(item2)">
		    					<!-- <view class="atric" v-if="item2.is_business==1">商家直供</view> -->
		    					<view class="list-img">
		    						<image :src="item2.image" mode="aspectFill"></image>
									<view class="full-des" v-if="item.events">满{{item.events.condition_amount}}减{{item.events.amount}}</view>
		    					</view>
		    					<view class="list-text">
		    						<view class="list-title only-line-1">{{item2.name}}</view>
		    						<view class="list-subtitle only-line-2">{{item2.note}}</view>
									<view v-if="item2.price" class="price">￥<text class="price-monye">{{item2.price}}</text></view>
		    						<!-- <view class="list-slogo" v-if="item2.is_business==1"><text class="business">商家直供</text> 万家果品</view> -->
		    					</view>
		    				</view>
		    			</view>
		            </view>
		        </swiper-item>
		    </swiper>
		</uni-swiper-dot>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				current:0,
				dotsStyles:{
					backgroundColor:"#DFDFDF",
					border:"#DFDFDF",
					selectedBackgroundColor:"#F2B500",
					selectedBorder:"#F2B500",
				},
				myAlldata:[]
			}
		},
		mounted() {
			this.getRecommendList();
		},
		methods:{
			change(e) {
				this.current = e.detail.current;
			},
			//获取商品列表
			getRecommendList(){
				let url='/api/goods/getRecommendList';
				this.request(this.baseURL+url,{
					page:1,
					size:24,
				},{method:'GET'}).then(res=>{
					let myarr=[];
					res.forEach((item,index)=>{
						if(myarr[Math.floor(index/3)]){
							myarr[Math.floor(index/3)].push(item);
						}else{
							myarr[Math.floor(index/3)]=[item];
						}
					})
					this.myAlldata=myarr;
				}).catch(err=>{
					uni.showToast({title: err});
				})
			},
			onPress(item){
				this.$emit("onPress",item);
			}
		}
	}
</script>

<style>
	.swiper-box2{
		height: 450rpx;
		min-height: 450rpx;
	}
	.swiper-item2{
		flex: 1;
		height: 450rpx;
	}
	.swiper-item-list{
		flex-wrap: wrap;
	}
	.list{
		border-radius: 6px;
		overflow: hidden;
		width: 220rpx;
		background-color: #fff;
		position: relative;
	}
	.atric{
		position: absolute;
		left: 0;
		top: 0;
		background-color: #ff7a01;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		font-size: 10px;
		color: #fff;
		text-align: center;
		z-index: 10;
		padding: 2px 5px;
	}
	.list-text{
		padding: 10px;
	}
	.list-img{
		position: relative;
	}
	.list-img image{
		width: 220rpx;
		height: 220rpx;
		border-radius: 6px;
	}
	.list-subtitle{
		font-size: 12px;
		color: #888;
		margin-bottom: 5px;
	}
	.list-slogo{
		font-size: 10px;
		color: #424242;
	}
	.list-title{
		margin-bottom: 5px;
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
	}
</style>

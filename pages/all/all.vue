<template>
	<view>
		<uni-nav-bar title="商品分类" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<view class="serach-bar">
			<view @click="toSerach" class="serach">搜索</view>
		</view>
		<view class="sp-content flex just-between">
			<view class="sp-left">
				<view class="sp-left-list" @click="navClick(index)" :class="{active:activeNum==index}" v-for="(item,index) in leftData" :key="index">{{item}}</view>
			</view>
			<view class="sp-right flex1">
				<view class="sp-list flex">
					<view class="atric">商家直供</view>
					<view class="sp-list-img">
						<image :src="imgUrl"></image>
					</view>
					<view>
						<view class="list-title">我是包体数据库垃圾卢卡斯体数据库垃圾卢卡斯数据库垃圾卢卡斯</view>
						<view class="sp-list-weight">商家直供</view>
						<view class="sp-list-weight">约37斤</view>
						<view class="flex just-between">
							<view class="starating">***</view>
						</view>
						<view class="list-slogo"><text class="business">商家只供</text> 青阳果业</view>
					</view>
				</view>
				<view class="sp-list flex">
					<view class="atric">商家直供</view>
					<view class="sp-list-img">
						<image :src="imgUrl"></image>
					</view>
					<view>
						<view class="list-title">我是包体数据库垃圾卢卡斯体数据库垃圾卢卡斯</view>
						<view class="sp-list-weight">商家直供</view>
						<view class="sp-list-weight">约37斤</view>
						<view class="flex just-between">
							<view class="starating">***</view>
						</view>
						<view class="list-slogo"><text class="business">商家只供</text> 青阳果业</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeNum:0,
				imgUrl:'http://img3.imgtn.bdimg.com/it/u=372372667,1126179944&fm=26&gp=0.jpg',
				leftData:['商家直供','标果精选','近期上新','畅销产品','进口水果','网红小货','标果小件','本地专供']
			}
		},
		methods: {
			navClick(index){
				this.activeNum=index;
			},
			//跳转搜索
			toSerach(){
				uni.navigateTo({
				    url: '../serach/serach'
				});
			},
			search(){
				
			}
		}
	}
</script>

<style>
	.sp-left-list{
		height: 45px;
		line-height: 45px;
		text-align: center;
		font-size: 14px;
		padding: 0 15px;
	}
	.sp-right{
		background-color: #fff;
		padding: 0 10px;
		min-height: calc(100vh - 116px);
	}
	.sp-list{
		margin-top: 15px;
		position: relative;
	}
	.selected{
		font-size: 12px;
	}
	.active{
		color: #dc8f1c;
		background-color: #fff;
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
	.list-title{
		overflow: hidden;
		word-break: break-all;  /* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;  /* 超出部分省略号 */
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2; /** 显示的行数 **/
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
</style>

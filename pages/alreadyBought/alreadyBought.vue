<template>
	<view>
		<uni-nav-bar title="常购清单" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<view>
			<view class="content">
				<view class="sp-list flex just-between align-center" @click="gotoDetails">
					<view class="sp-list-detiles flex just-between">
						<view class="sp-list-img">
							<image :src="imgUrl"></image>
						</view>
						<view class="flex flex-column just-between">
							<view class="flex1 only-line-2">我是标题我是博爱提我赛欧加上沙口路基础课爱提我赛欧加上沙口路基础课</view>
							<view class="flex sp-list-weight align-center">约13斤</view>
							<view class="flex just-between align-center">
								<stars />
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="nav-tuijan flex just-center">
				<view>为您推荐</view>
			</view>
			<shoppingList :dataList="[1,2,3]" @onPress="gotoDetails" />
		</view>
	</view>
</template>

<script>
	import shoppingList from '../../wxcomponents/shoppingList.vue';
	export default {
		components:{shoppingList},
		data() {
			return {
				imgUrl:'http://img3.imgtn.bdimg.com/it/u=372372667,1126179944&fm=26&gp=0.jpg',
			}
		},
		methods: {
			gotoDetails(){
				uni.navigateTo({
					url:"../shoppingDetails/shoppingDetails"
				})
			}
		}
	}
</script>

<style>
	.content{
		padding: 10px;
		background-color: #fff;
		box-sizing: border-box;
	}
	.sp-list{
		margin-bottom: 10px;
	}
</style>

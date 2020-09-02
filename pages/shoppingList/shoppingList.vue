<template>
	<view>
		<uni-nav-bar @clickLeft="goBack" title="本地专供|全场95折" left-icon="back" status-bar color="#fff" fixed :shadow="fasle" background-color="#E7A40D"></uni-nav-bar>
		<view class="content">
			<shoppingListMorn />
		</view>
	</view>
</template>

<script>
	import shoppingListMorn from '../../wxcomponents/shoppingListMorn.vue'
	export default {
		components:{shoppingListMorn},
		data() {
			return {
				imgUrl:'http://img3.imgtn.bdimg.com/it/u=372372667,1126179944&fm=26&gp=0.jpg'
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.content{
		margin: 10px;
	}
</style>

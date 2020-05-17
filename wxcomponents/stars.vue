<template>
	<view>
		<view class="flex">
			<view v-for="(item,index) in list" :key="index" class="iconfont icon-xingxing my-icon"></view>
		</view>
	</view>
</template>

<script>
	export default{
		name:"stars",
		data(){
			return {
				list:[1,2,3]
			}
		}
	}
</script>

<style>
	.my-icon{
		font-size: 8px;
	}
</style>

<template>
	<view>
		<view class="flex">
			<view v-for="(item,index) in starNumber" :key="index" class="iconfont icon-xingxing my-icons"></view>
		</view>
	</view>
</template>

<script>
	export default{
		name:"stars",
		props:{
			starNumber:{
				default:0
			}
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style>
	.my-icons{
		font-size: 8px;
		color: #F9663D;
	}
</style>

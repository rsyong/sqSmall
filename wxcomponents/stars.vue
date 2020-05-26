<template>
	<view>
		<view class="flex">
			<view v-for="(item,index) in starNumber" :key="index" class="iconfont icon-xingxing my-icon"></view>
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
	.my-icon{
		font-size: 8px;
		color: #F9663D;
	}
</style>

<template>
	<view>
		<view :class="[checked ? 'my-radio-active' : 'my-radio']"></view>
	</view>
</template>

<script>
	export default {
		props:["checked"],
		data() {
			return {
				
			}
		},
	}
</script>

<style>
	.my-radio{
		border: 1px solid #D2D2D2;
		width: 20px;
		height: 20px;
		border-radius: 50%;
	}
	.my-radio-active{
		border: 1px solid #F0B426;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: #F0B426;
	}
</style>

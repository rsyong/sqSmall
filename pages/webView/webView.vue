<template>
	<view>
		<web-view v-if="url" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles:{
					progress: {
						color: '#E1B12D'
					}
				},
				url:''
			}
		},
		onLoad(option) {
			this.url=option.url;
		},
		methods: {
			
		}
	}
</script>

<style>

</style>

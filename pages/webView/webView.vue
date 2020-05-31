<template>
	<view>
		<web-view src="https://www.baidu.com" :webview-styles="webviewStyles"></web-view>
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
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>

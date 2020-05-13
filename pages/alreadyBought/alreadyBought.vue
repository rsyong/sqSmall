<template>
	<view>
		<uni-nav-bar title="常购清单" status-bar color="#fff" fixed :shadow="fasle" background-color="#000"></uni-nav-bar>
		<view>
			<view class="nav-tuijan flex just-center">
				<view>为您推荐</view>
			</view>
			<shoppingList :dataList="[1,2,3]" />
		</view>
	</view>
</template>

<script>
	import shoppingList from '../../wxcomponents/shoppingList.vue';
	export default {
		components:{shoppingList},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>

<script>
export default {
	globalData:{
		appid:'wx99e7a5d35d7d086d',
		appSecret:'8514346960e863e5748524da781cb984'
	},
	onLaunch: function() {
		//第一次启动
	},
	onShow: function() {
		//打开
	},
	onHide: function() {
		//关闭
	}
};
</script>

<style>
	@import "/wxcomponents/vant/dist/common/index.wxss";
	page{
		font-size: 14px;
		background-color: #f2f2f2;
	}
	.flex{
		display: flex;
		flex: 1;
	}
	.flex1{
		flex: 1;
	}
	.flex-column{
		flex-direction: column;
	}
	.just-between{
		justify-content: space-between;
	}
	.just-around{
		justify-content: space-around;
	}
	.just-center{
		justify-content: center;
	}
	.align-center{
		align-items: center;
	}
	.align-between{
		align-content: space-between;
	}
	.pad-center-10{
		padding: 0 10px;
	}
	.mag-center-10{
		margin: 0 10px;
	}
	.mt-10{
		margin-top: 10px;
	}
	.mb-5{
		margin-bottom: 5px;
	}
	
	.sp-list-weight{
		font-size: 10px;
		color: #888;
	}
	.sp-list-time{
		font-size: 10px;
	}
	.sp-list-img image{
		width: 227rpx;
		height: 227rpx;
		border-radius: 6px;
		margin-right: 10px;
	}
	.nav-tuijan{
		margin-top: 15px;
		font-size: 18px;
		font-weight: bold;
	}
	.starating{
		color: #E1B12D;
	}
	.business{
		color: #35BD13;
		margin-right: 5px;
	}
</style>

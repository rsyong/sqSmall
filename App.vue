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
		// uni.setTabBarBadge({
		// 	index:2,
		// 	text:'9'
		// })
	},
	onHide: function() {
		//关闭
	}
};
</script>

<style>
	@import "/wxcomponents/vant/dist/common/index.wxss";
	@import "/static/iconfont.css";
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
	.only-line-1{
		max-width: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.only-line-2{
		overflow: hidden;
		word-break: break-all;  /* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;  /* 超出部分省略号 */
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2; /** 显示的行数 **/
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

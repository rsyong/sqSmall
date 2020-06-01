<template>
	<view>
		<view v-if="!starts" style="color: #D67062;font-size: 10px;">时间未开始</view>
		<uni-countdown v-else color="#D67062" splitorColor="#D67062" background-color="#FFE8D8" :hour="hour" :minute="minute"
		 :second="second"></uni-countdown>
	</view>
</template>

<script>
	function calculateDiffTime(start_time, end_time) {
		var startTime = 0,
			endTime = 0
		if (start_time < end_time) {
			startTime = start_time
			endTime = end_time
		} else {
			startTime = end_time
			endTime = start_time
		}
		var timeDiff = endTime - startTime
		var hour = Math.floor(timeDiff / 3600);
		timeDiff = timeDiff % 3600;
		var minute = Math.floor(timeDiff / 60);
		timeDiff = timeDiff % 60;
		var second = timeDiff;
		return [hour, minute, second]
	}
	export default {
		props: ["endTime","startTime"],
		data() {
			return {
				myendTime: this.endTime,
				mystartTime:this.startTime,
				hour: 0,
				minute: 0,
				second: 0,
				starts:false
			}
		},
		mounted() {
			let onwTime=new Date().getTime()/1000;
			this.starts=this.startTime<onwTime;
			if(!this.starts) return;
			let myDate = calculateDiffTime(this.myendTime,onwTime)
			this.hour=myDate[0];
			this.minute=myDate[1];
			this.second=myDate[2];
		},
		methods: {

		}
	}
</script>

<style>

</style>

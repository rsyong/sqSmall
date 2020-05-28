export const goBack=()=>{
	uni.navigateBack({
		
	});
}
export const getAllNum=(data)=>{
	let num=0;
	data.forEach(item=>{
		num+=item.num
	})
	return num;
}
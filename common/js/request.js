export const request=(url,data={},params={})=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url: url, //仅为示例，并非真实接口地址。
			method:params?.method || 'POST',
			data: JSON.stringify(data),
			success: (res) => {
				if(res.statusCode==200){
					resolve(res.data);
				}else{
					reject(res.msg || res.errMsg);
				}
			},
			fail:(err)=>{
				reject(err);
			}
		})
	})
}

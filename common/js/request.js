export const request=(url,data={},params={})=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url: url, //仅为示例，并非真实接口地址。
			method:params?.method || 'POST',
			data: params?.method=="GET" ? data : JSON.stringify(data),
			success: (res) => {
				if(res.statusCode==200){
					res=res.data;
					if(res.code==1){
						resolve(res.data);
					}else{
						reject(res.msg);
					}
				}else{
					reject(res.errMsg);
				}
			},
			fail:(err)=>{
				reject(err);
			}
		})
	})
}

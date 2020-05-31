export const request=(url,data={},params={})=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url: url, //仅为示例，并非真实接口地址。
			method:params?.method || 'POST',
			data: params?.method=="GET" ? data : JSON.stringify(data),
			header:{
				"token":getApp().globalData.token || ''
			},
			success: (res) => {
				if(res.statusCode==200){
					res=res.data;
					if(res.code==1){
						resolve(res.data);
					}else{
						reject(res.msg);
					}
				}else{
					reject('服务器出错了');
				}
			},
			fail:(err)=>{
				reject(err);
			}
		})
	})
}
export const rqusetFile=(url,data={})=>{
	return new Promise((resolve,reject)=>{
		uni.uploadFile({
			url:url,
			filePath:data.filePath,
			name:data.name || 'file',
			header:{
				"token":getApp().globalData.token || ''
			},
			success:(res)=>{
				if(res.statusCode==200){
					res=res.data;
					if(typeof res =="string"){
						res=JSON.parse(res);
					}
					if(res.code==1){
						resolve(res.data);
					}else{
						reject(res.msg);
					}
				}else{
					reject(res.errMsg);
				}
				
			}
		})
	})
}
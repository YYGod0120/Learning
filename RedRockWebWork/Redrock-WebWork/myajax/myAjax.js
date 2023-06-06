
export const myAxios = async function (body) {
    let {url} = body
    const {method} = body || "get"
    const {async} = body
    const {data} = body
    const xhr = new XMLHttpRequest()
    if (body.timeout && body.timeout > 0) {
        xhr.timeout = body.timeout
    }
    return new Promise((resolve, reject) => {
        xhr.ontimeout = () => reject && reject("请求超时")
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    // 接口连接成功时对数据的处理
                    // 先将返回的字符串转换为json格式
                    let result = JSON.parse(xhr.responseText)
                    // 如果接口返回有错误信息error则打印出error（对错误信息做处理，可以是提示，这里用的打印）
                    if(result.error) {
                        console.log(result.error)
                    } else {
                        // 如果接口返回没有错误提示而是返回正确数据时，则调用回调函数，返回正确信息，返回的信息也需要
                        resolve && resolve(result)
                    }
                } else {
                    // 接口连接失败时
                    reject && reject('请求失败')
                    console.log("接口连接失败")
                }
            }
        }
        let paramArr = []
        xhr.onerror = err => reject&&reject(err)
        //对data里的数据的处理
        //如果为GET传输方式的时候 需要将数据拼接到url地址后
        if (method === 'get') {
            let encodeData
            if (data instanceof Object) {
                for (let key in data) {
                    // 参数拼接需要通过 encodeURIComponent 进行编码

                    paramArr.push( encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) )
                }
                encodeData = paramArr.join('&')
            }
            // 检测 url 中是否已存在 ? 及其位置
            const index = url.indexOf('?')
            if (index === -1) url += '?'
            else if (index !== url.length -1) url += '&'
            // 拼接 url
            url += encodeData
        }


        xhr.open(method,url,async)
        if (method === "get"){
            xhr.send(null)
        }else{
            // post 方式需要设置请求头
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8')
            xhr.send(JSON.stringify(data))

        }
    })
}


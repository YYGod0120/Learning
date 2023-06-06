//promise



class myPromise{
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';
    constructor(func) {
        this.PromiseResult = null
        this.PromiseState = myPromise.PENDING;
        try{
            func(this.resolve.bind(this),this.reject.bind(this))
        }catch (error){
            this.reject(error)
        }
        this.onFulfilledCallbacks = []; // 保存成功回调
        this.onRejectedCallbacks = []; // 保存失败回调
    }
    resolve(result){
        if (this.PromiseState === myPromise.PENDING){
            this.PromiseState = myPromise.FULFILLED
            this.PromiseResult = result
            this.onFulfilledCallbacks.forEach(callback =>{
                callback(result)
            })
        }
    }
    reject(result){
        if (this.PromiseState === myPromise.PENDING){
            this.PromiseState = myPromise.REJECTED
            this.PromiseResult = result
            this.onRejectedCallbacks.forEach(callback =>{
                callback(result)
            })
        }
    }
    then(onFulfilled,onRejected){

        const promise2 = new myPromise((resolve,reject)=>{
            if (this.PromiseState === myPromise.PENDING) {
                this.onFulfilledCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            if (typeof onFulfilled !== 'function'){
                                resolve(this.PromiseResult)
                            }
                            else{
                                let x = onFulfilled(this.PromiseResult)
                                resolvePromise(promise2,x,resolve,reject)
                            }
                        } catch (e){
                            reject(e)
                        }
                    })
                });
                this.onRejectedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try {
                            if (typeof onRejected !== 'function'){
                                reject(this.PromiseResult)
                            }
                            else{
                                let x = onFulfilled(this.PromiseResult)
                                resolvePromise(promise2,x,resolve,reject)
                            }
                        }catch (e){
                            reject(e)
                        }
                    })
                });
            }


            if (this.PromiseState === myPromise.FULFILLED){
                setTimeout(()=>{
                    try{
                        if (typeof onFulfilled !== 'function'){
                            resolve(this.PromiseResult)
                        }
                        else{
                            let x = onFulfilled(this.PromiseResult)
                            resolvePromise(promise2,x,resolve,reject)
                        }
                    } catch (e){
                        reject(e)
                    }
                })
            }
            if (this.PromiseState === myPromise.REJECTED){
                setTimeout(()=>{
                    try {
                        if (typeof onRejected !== 'function'){
                            reject(this.PromiseResult)
                        }
                        else{
                            let x = onFulfilled(this.PromiseResult)
                            resolvePromise(promise2,x,resolve,reject)
                        }
                    }catch (e){
                        reject(e)
                    }
                })
            }
        })
        return promise2
    }
}
//resolvePromise方法就是实现promiseA+的内容
function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        throw new TypeError('Chaining cycle detected for promise');
    }

    if (x instanceof myPromise) {
        x.then(y => {
            resolvePromise(promise2, y, resolve, reject)
        }, reject);
    } else if (x !== null && ((typeof x === 'object' || (typeof x === 'function')))) {
        try {
            var then = x.then;
        } catch (e) {
            return reject(e);
        }

        if (typeof then === 'function') {
            let called = false;
            try {
                then.call(
                    x,
                    y => {
                        if (called) return;
                        called = true;
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    r => {
                        if (called) return;
                        called = true;
                        reject(r);
                    }
                )
            } catch (e) {
                if (called) return;
                called = true;

                reject(e);
            }
        } else {
            resolve(x);
        }
    } else {
        return resolve(x);
    }
}








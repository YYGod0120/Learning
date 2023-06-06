const mbs = {
    name: '麻不烧',
}
const text = {
    name: 'yy'
} //测试案例
function say(prefix, age) {
    console.log(`${prefix},my name is ${this.name},i am ${age} year old`)
}

Function.prototype.mycall = function(obj,...args){
    obj = obj || window //传入非真值的时候换成全局对象
    const only = Symbol() //ES6中的独一值
    obj[only] = this //改变this的指向,this指的是调用它的函数
    let res = obj[only](...args)
    delete obj[only]
    return res //返回函数的结果
}


say.mycall(text,'hello',16)
Function.prototype.mybind = function (obj,...outargs){
    //前面都一样
    obj = obj || window //传入非真值的时候换成全局对象
    const only = Symbol() //ES6中的独一值
    obj[only] = this //改变this的指向,this指的是调用它的函数
    return function(...innerargs){
        const res = obj[only](...outargs,...innerargs) //把第一次传入和第二次传入的参数再传进函数，属于柯里化，而且用上了闭包的思路
        return res
    }
}


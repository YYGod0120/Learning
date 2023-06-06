//柯里化
function sum(a, b, c) {
    return a + b + c;
}

//柯里化
function sum(a, b, c) {
    return a + b + c;
}

function curry(fn) {
    const funcArgsLength = fn.length //记录参数数目
    return function curried(...args) { //...将参数转化为数组
        if (args.length < 3) { //比较参数数目多少，参数不足的时候返回一个新的函数去接受接下来的参数
            return function (...args1) {
                return curried.apply(this, args.concat(args1)) //fn.apply(this,数组) 将数组内容当作参数传递给this的函数对象
            }
        } else {

            return fn.apply(this, args)
        }
    }

}
let curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3)); // 6，仍然可以被正常调用
console.log(curriedSum(1)(2, 3)); // 6，对第一个参数的柯里化
console.log(curriedSum(1)(2)(3)); // 6，全柯里化



//节流防抖

// 节流
// const throttle = function(fn,wt){
//     let isRunning = false
//     return function(){
//         if(!isRunning){
//
//             fn()
//             isRunning = true
//             setTimeout(()=>{
//                 isRunning = false
//             },wt)
//
//         }
//         else{
//             alert('太快')
//         }
//     }
// }
// document.querySelector('.btn1').addEventListener('click',throttle(
//     ()=>{
//         alert(document.querySelector('input').value)
//     },3000)
// )

// //防抖
// const debounce = function(fn,wt){
//     let timer = null
//     return function(){
//         if(timer){
//             clearTimeout(timer) //重新计时
//         }
//         timer = setTimeout(()=>{
//             fn()
//             timer = null
//         },wt)
//     }
// }
// document.querySelector('.aa').addEventListener('keyup',debounce(()=>{
//     console.log(document.querySelector('.aa').value);
// },500)
// )


//AOP
let func = function () {
    console.log(2);
}

Function.prototype.before = function (fn) {
    fn()
    return this
}
Function.prototype.after = function (fn) {
    this()
    return fn
}
func = func.before((a = 1) => {
    console.log(a)
}).after((b = 3) => {
    console.log(b);
})

func()
//实现func.before()以及func.after()


//map函数
Object.prototype.mapY = function (fn, target) {
    let oldArray = this

    let newArray = []

    for (let e of oldArray) {
        newArray.push(fn(e))
    }

    return newArray

}
const kvArray = [{
        key: 1,
        value: 10
    },
    {
        key: 2,
        value: 20
    },
    {
        key: 3,
        value: 30
    },
];
const reformattedArray = kvArray.mapY(({
    key,
    value
}) => ({
    [key]: value
}));
console.log(reformattedArray);

//filter
Object.prototype.filterY = function (fn) {
    let newArray = []
    let oldArray = this
    for (let e of oldArray) {
        if (fn(e)) {
            newArray.push(e)
        }
    }

    return newArray

}
let text1 = [1, 2, 3, 6]
console.log(text1.filterY((x) => {
    return x > 1
}));








//reduce
Object.prototype.reduce = function (fn) {
    let y = this[0]
    for (let i of this) {
        fn(y, i)
    }
    return y

}
let text2 = [
    [1, 2],
    [3, 4],
    [5, 6]
]
console.log(text2.reduce(
    function (x, y) {
        return x.concat(y)
    }
));
// 题目一
// function sum(a, b, c) {
//     return a + b + c;
// }

// let curriedSum = curry(sum);

// console.log(curriedSum(1, 2, 3)); // 6，仍然可以被正常调用
// console.log(curriedSum(1)(2, 3)); // 6，对第一个参数的柯里化
// console.log(curriedSum(1)(2)(3)); // 6，全柯里化

// //写一个curry函数来实现此功能
function curry(func) {
    const funcArgsLength = func.length; // 原函数长度
    function createCurried(oldArgs = []) { // oldArgs为已记录的函数参数。
        function curried(...newArgs) { // newArgs每次调用时传递的新参数
            // 参数至少需要传递一个，否则就当传递了一个空的参数，函数执行什么都不处理。
            const args = [...oldArgs, ...(newArgs.length ? newArgs : [undefined])]
            // 没有剩余参数，则直接执行 func 并返回结果。
            if (args.length >= funcArgsLength) {
                return func(...args);
            }
            // 有剩余参数，因此返回了一个 “可接受余下的参数” 的新函数，也就是创建 curried
            return createCurried([...args]);
        }
        return curried;
    }
    // 返回被一个被柯里化的函数
    return createCurried();
}

//题目二
// 课件已经把答案写出来了，绑定到输入框上即可

//题目三
//实现func.before()以及func.after()

Function.prototype.before = function (fn) {
    // 谁调用this，this就指向谁，这里的this指向func函数
    let that = this;
    return function () {
        // 这里的this指向window
        // fn就是执行的下方.before中的函数内容
        fn();
        // that就是原函数
        // 展开arguments是为了能够拿到所有参数
        that(...arguments);
    }
}
Function.prototype.after = function (fn) {
    // 谁调用this，this就指向谁，这里的this指向func函数
    let that = this;
    return function () {
        // that就是原函数
        // 展开arguments是为了能够拿到所有参数
        that(...arguments);
        // 这里的this指向window
        // fn就是执行的下方.before中的函数内容
        fn();
    }
}

let func = function(xxx){
    console.log(2);
}


func = func.before((a=1) => {
    console.log(a)
}).after((b=3) => {
    console.log(b);
})

func()


// 题目四  大家手写实现Array.prototype.map
//Array.prototype.filter和Array.prototype.reduce

// let allArr = [1, 2, 3, 4, 5]

// // map 方法
// function map(arr, callback) {
//     //首先检查一下参数
//     let flag = !Array.isArray(arr) || !arr.length || typeof callback !== 'function'
//     if (flag) {
//         return []
//     } else {
//         //每次调用我们都会返回一个新数组
//         let newArr = []
//         for (let i = 0; i < arr.length; i++) {
//             newArr[i] = callback(arr[i], i, arr)
//         }
//         return newArr
//     }
// }
// console.log(map(allArr, (item) => item + 1))

// // filter 方法
// function filter(arr, callback) {
//     let flag = !Array.isArray(arr) || !arr.length || typeof callback !== 'function'
//     if (flag) {
//         return []
//     } else {
//         let newArr = []
//         for (let index = 0; index < arr.length; index++) {
//             if (callback(arr[index], index, arr)) {
//                 newArr.push(arr[index])
//             }

//         }
//         return newArr
//     }

// }
// console.log(filter(allArr, (item) => item > 2))


// // reduce 方法
// function reduce(arr, callback, initValue) {
//     let flag = !Array.isArray(arr) || !arr.length || typeof callback !== 'function'
//     if (flag) {
//         return []
//     } else {
//         //  判断有没有初始值
//         let isValue = initValue === 0 ? (!initValue) : (!!initValue)
//         let reduceValue = isValue ? initValue : arr[0]
//         //  判断其实相加的值
//         for (let index = isValue ? 0 : 1; index < arr.length; index++) {
//             reduceValue = callback(reduceValue, arr[index], index, arr)
//         }
//         return reduceValue
//     }
// }
// console.log(reduce(allArr, (x, y) => x + y))
import {myAxios} from "./myAjax.js";

let data = await myAxios('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
console.log(data)
// let a = async ()=>{
//     let data0 = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
//     let c = await data0.json()
//     console.log(c)
// }
// a()


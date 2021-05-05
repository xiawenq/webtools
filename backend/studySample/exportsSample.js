/*
// sample 1: how to explain the word(exports)
// 这里的A = require，没有指定导出哪个属性或方法
var A = require("./exportsSample");
A.setNum(2);
console.log(A.getNum());
A.pubF(10);
console.log(A.getNum());
A.privateFunc(13);  // 对于没有用exports导出的方法和属性，都会报错
console.log(A.getNum());
*/

var a = 0;
exports.setNum = function (paramA) {
    a = paramA;
}
exports.getNum = function () {
    return a;
}

function privateFunc(paramB) {
    a = paramB;
}
exports.pubF = privateFunc;
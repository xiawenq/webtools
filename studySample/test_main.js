// sample 0: how to explain the word(module.exports)
var ClassB = require("./ClassSample");
var objectB = new ClassB();
objectB.setName("xwq");
objectB.sayHello();
// var f = require("./ClassA").func();  // 导入这个会出现错误

// sample 1: how to explain the word(exports)
var A = require("./exportsSample");
A.setNum(2);
console.log(A.getNum());
A.pubF(10);
console.log(A.getNum());
// A.privateFunc(13);
// console.log(A.getNum());

var netServer = require("./netServerSample");
var com = require("./serialServerSample");
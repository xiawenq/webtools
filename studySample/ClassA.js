/* how to explain the word(module.exports)
// 对于所有的require(jsFile)来说，相当于先执行了一遍jsFile
// 对于module.exports = a，导出类来说，var b = require()相当于C/C++的include，包含头文件，
// 并给module.exports=a中的a在要引入的地方取了一个别名b，后续可以使用这个别名b()来创建对象，相当于用a()来创建对象
var ClassB = require("./ClassA");
var objectB = new ClassB();
objectB.setName("xwq");
objectB.sayHello();
// var f = require("./ClassA").func();
*/

function ClassA() {
    var name;
    this.setName = function (thyName) {
        name = thyName;
    };
    this.sayHello = function () {
        console.log("haha " + name);
    };
};

// 一个js中，不能同时出现module.exports导出方法和exports导出方法，
// 同时出现了，则外部只能导入module.exports对象，导出exports对象时会报错
exports.func = function() {
    console.log("fun called");
}

module.exports = ClassA;
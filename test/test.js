var fs = require("fs");

fs.readFile("package.js", function(err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

var data = fs.readFileSync("package-lock.json");
console.log(data.toString());

console.log("程序执行结束");

var event = require("events");
var emt = new event.EventEmitter();
emt.on("123", function () {
    console.log("123 be called");
})

emt.emit("123");

const hex = Buffer.from('12345678', 'ascii');
console.log(hex.toString('hex'));
console.log(hex.toString('binary'));
console.log(hex.toString('base64'));

// module.exports = fs;
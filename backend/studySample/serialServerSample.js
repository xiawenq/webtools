/* how to use the library(serialport)
   新版本库，列举串口列表方法更改了，需要了解 promise 关键字的用途，可以参考 https://www.jianshu.com/p/e48f76d41532
   一篇使用串口库写的工具文章 https://blog.csdn.net/u012612399/article/details/80421730/
 */
var SerialPort = require('serialport');

// 参考文章 https://www.jianshu.com/p/239ac1315cb2

// 获取串口列表
var list = SerialPort.list();
list.then(
    // 枚举串口成功时回调处理函数
    data => {
        console.log("串口个数: " + data.length);
        for (var i = 0; i < data.length; i++) {
            console.log("\t串口[%d], 名称", i, data[i].path);
        }
        /*
        // 回调函数遍历串口数组
        data.forEach((v, index, a) => {
            console.log("foreach " + v.path + " " + index + " " + a.length);
        });
        */
    },
    // 枚举串口失败时回调处理函数
    error => {
        console.log("失败，error:" + error)
    }
);

// 新建串口对象并打开
let serialPort = new SerialPort('COM1', {baudRate:9600, autoOpen: false});
serialPort.open(error => {
    if (error) {
        console.log("打开串口失败：" + error);
    }
    else {
        console.log("打开串口成功");
/*

        serialPort.on('data', data => {
            console.log("接收串口数据: " + data);
        });

*/
    }
});
serialPort.on('data', data => {
    console.log("com1 recv data: " + data);
});

let serialPort2 = new SerialPort('COM2', {baudRate: 9600, autoOpen: false});
serialPort2.open(error => {
    if (error) {
        console.log("打开串口失败：" + error);
    }
    else {
        console.log("打开串口成功");
/*

        serialPort.on('data', data => {
            console.log("接收串口数据: " + data);
        });
*/
    }
});
serialPort2.on('data', data => {
    console.log("com2 recv data: " + data);
    serialPort2.write("hello this from com2", (error, bytesWritten) => {
        if (error) {
            console.log("com2 发送消息失败, error:" + error);
        }
        else {
            // console.log("com2 发送消息字节数: " + bytesWritten);
        }
    });
});

serialPort.write("hello this is com1 send", (error, bytesWritten) => {
    if (error) {
        console.log("com1 发送消息失败, error:" + error);
    }
    else {
        // console.log("com1 发送消息字节数: " + bytesWritten);
    }
});
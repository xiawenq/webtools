var net = require('net');
var tcpClient = new net.Socket();
tcpClient.connect(15566, 'localhost', () => {
    console.log("已连接到服务器");
    tcpClient.write("hello world");
    setTimeout(() => {
        tcpClient.end('bye');
    }, 10000);
});

tcpClient.on('data', data => {
    console.log("recv from server: " + data);
});

tcpClient.on('error', err => {
    console.log("error: ", err);
    tcpClient.destroy(err);
});

// TODO: 高级实现，制定协议，序列化，反序列化数据
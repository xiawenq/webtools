/* how to create tcp/udp server
   read data and write data.
 */
var net = require('net');
var tcpServer = net.createServer((socket) => {
    console.log("accept a new connection: " + socket.id + " from [" + socket.remoteAddress + ":" + socket.remotePort + "]");

    socket.on('connect', () => {
        console.log("connect: [%s:%d]", socket.remoteAddress, socket.remotePort);
    });

    socket.on('data', (data) => {
        console.log("recv [%s:%d]: data: %s", socket.remoteAddress, socket.remotePort, data.toString());
        socket.write(data, err => {
            if (err) {
                console.log("send dat to client err: " + err);
            }
        });
    });

    socket.on('drain', () => {
        console.log("drain: [%s:%d]", socket.remoteAddress, socket.remotePort);
    });

    socket.on('end', () => {
        console.log("end: [%s:%d]", socket.remoteAddress, socket.remotePort);
    });

    socket.on('error', (err) => {
        console.log("error: [%s:%d]", socket.remoteAddress, socket.remotePort);
    });

    socket.on('lookup', (err, address, family, host) => {
        console.log("lookup: [%s:%d]", socket.remoteAddress, socket.remotePort);
    });

    socket.on('timeout', () => {
        console.log("timeout: [%s:%d]", socket.remoteAddress, socket.remotePort);
    });

    socket.on("close", (had_error) => {
        console.log("[%s:%d] closed: err: %s", socket.remoteAddress, socket.remotePort, had_error.toString());
    });
});

tcpServer.listen(15566, () => {
    console.log("server bound ");
});

////////// simple udp server //////////////////
var dgram = require('dgram');
var udpServer = dgram.createSocket("udp4", (msg, rinfo) => {
    console.log("\nserver got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
    udpServer.send(msg, rinfo.port, rinfo.address, error => {
        if (error) {
            console.log("send %s:%d error:%s", rinfo.address, rinfo.port, error);
        }
    });
});
udpServer.on("listening", () => {
    var address = udpServer.address();
    console.log("udp server listening " + address.address + ":" + address.port);
});
udpServer.bind(15566, () => {
    console.log("bind callback()");
});

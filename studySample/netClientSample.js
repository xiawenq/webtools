var net = require('net');
var tcpClient = net.connect({path: "localhost", port: "3333", localPort:"2222"}, () => {

});
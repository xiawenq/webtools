var express = require("express");
var app = express();
var path = require("path");
var server = require("http").createServer(app);
var wsServer = require("socket.io")(server);

var test = require("./studySample/test_main");

var port = process.env.PORT || 3000;

server.listen(port, () => {
   console.log('Server listening at port %d', port);
});

app.use(express.static(path.join(__dirname, 'client')));

// 当前用户数
let numUsers = 0;
// 当前用户名称列表
let usersName = [];

// 一个新的客户端连接处理流程
wsServer.on('connection', (socket) => {
    let addedUsers = false;
    console.log("got a new connection id " + socket.id);

    // 新来消息请求回调函数
    socket.on('new message', (data)=>{
        console.log(socket.username + " has new message");
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });
    });

    // 客户端加入聊天请求回调函数
    socket.on('add user', (username)=> {
        console.log("connection, add user " + username);

        if (!username) return;
        if (addedUsers) return;

        // 不允许用户名相同
        for(var i = 0; i < usersName.length; i++) {
            if (usersName[i] === username) {
                console.log(username + " is invalid.");
                socket.emit('error', {
                    errorId: -1,
                    details: "name invalid"
                });
                socket.disconnect(true);
                return;
            }
        }
        // 新增用户
        usersName.push(username);
        socket.username = username;
        ++numUsers;
        addedUsers = true;
        // 告诉客户端，当前用户数量
        socket.emit('login', {
            numUsers: numUsers
        });
        // 给所有客户端广播，有新成员加入，当前客户端数量
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
        console.log("add user: now client count " + usersName.length);
    });

    // 客户正在输入提示回调函数
    socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    // 客户停止输入提示回调函数
    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    // 客户断开连接提示回调函数
    socket.on('disconnect', () => {
        if (addedUsers) {
            --numUsers;
            // 删除用户
            for (var i = 0; i < usersName.length; i++) {
                if (usersName[i] === socket.username) {
                    usersName.splice(i, 1);
                }
            }
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
            addedUsers = false;
            console.log("disconnect : now client count " + usersName.length);
        }
    });
});

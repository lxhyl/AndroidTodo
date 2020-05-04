var http = require('http');
var fs = require('fs');
var url = require('url')

var app = http.createServer();

app.on('request', function (req, res) {
    var URL = url.parse(req.url, true);
    var NAME = URL.query.name;

    //注册
    if (URL.pathname == "/logup") {
        let mail = URL.query.mail;
        let password = URL.query.password;
        let json = {
            name: NAME,
            password: password,
            mail: mail,
            star: 0,
            todo: [],
            pet: [],
            thing: [],
        }
        let str = JSON.stringify(json);
        fs.writeFileSync(`./user/${NAME}.json`, str)
        res.writeHead(200, { 'Content-Type': 'text/plain,charset=utf-8' });
        res.end('seccess')
    }
    //登陆
    if (URL.pathname == "/login") {
        let password = URL.query.password;
        let name = URL.query.name;
        fs.readFile(`./user/${name}.json`, function (err, data) {
            if (err) {
                res.writeHead(200, { 'Content-Type': 'text/plain,charset=utf-8' });
                res.end('sb')
            }
            let jsonData = JSON.parse(data.toString());
            if (jsonData.password == password) {
                res.writeHead(200, { 'Content-Type': 'text/plain,charset=utf-8' });
                res.end('succeed')
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain,charset=utf-8' });
                res.end('sb')
            }
        })
    }
    //add todo
    if (URL.pathname == "/addtodo") {
        var buffer = [];
        req.on('data', function (chunk) {
            buffer.push(chunk);
        })
        req.on('end', function () {
            var addData = JSON.parse(buffer.toString());
            let name = addData.name;
            fs.readFile(`./user/${name}.json`, function (err, data) {
                let json = JSON.parse(data.toString());
                json.todo.push(addData);
                let str = JSON.stringify(json);
                fs.writeFileSync(`./user/${name}.json`, str);
                res.writeHead(200, { 'Content-Type': 'text/plain,charset=utf-8' });
                res.end('succeed')
            })

        })
    }
    // 返回json文件
    if (URL.pathname == "/getjson") {
        let name = URL.query.name;
        fs.readFile(`./user/${name}.json`, function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/plain,charset=utf-8' });
            res.end(data)
        })
    }
    //修改todo
    if (URL.pathname == "/changetodo") {
        var buffer = [];
        req.on('data', function (chunk) {
            buffer.push(chunk);
        })
        req.on('end', function () {
            let json = JSON.parse(buffer.toString());
            let name = json.name;
            let id = json.id;
            fs.readFile(`./user/${name}.json`, (err, data) => {
                let jsonData = JSON.parse(data.toString());
                for (let i = 0; i < jsonData.todo.length; i++) {
                    if (id == jsonData.todo[i].id) {
                        jsonData.todo[i] = json;

                    }
                }
                let str = JSON.stringify(jsonData);

                fs.writeFile(`./user/${name}.json`, str, function () {
                    res.writeHead(200, { 'Content-Type': 'text/plain,charset=utf-8' });
                    res.end('succeed')
                });

            })

        })
    }
    // 删除todo
    if (URL.pathname == "/sctd") {
        let name = URL.query.name;
        let id = URL.query.id;
        fs.readFile(`./user/${name}.json`, function (err, data) {
            let jsonData = JSON.parse(data.toString());
            for (let i = 0; i < jsonData.todo.length; i++) {
                if (id == jsonData.todo[i].id) {
                    jsonData.todo.splice(i, 1);
                }
            }
            let str = JSON.stringify(jsonData);
            fs.writeFileSync(`./user/${name}.json`, str);
            res.writeHead(200, { 'Content-Type': 'text/plain,charset=utf-8' });
            res.end('succseed')
        })
    }
    // 完成todo
    if (URL.pathname == '/wctd') {
        let name = URL.query.name;
        let id = URL.query.id;
        fs.readFile(`./user/${name}.json`, function (err, data) {
            let jsonData = JSON.parse(data.toString());
            for (let i = 0; i < jsonData.todo.length; i++) {
                if (id == jsonData.todo[i].id) {
                    jsonData.star += jsonData.todo[i].nd * 20;
                    jsonData.todo.splice(i, 1);
                }
            }
            let str = JSON.stringify(jsonData);
            fs.writeFileSync(`./user/${name}.json`, str);
            res.writeHead(200, { 'Content-Type': 'text/plain,charset=utf-8' });
            res.end('succseed')
        })
    }
    // 返回商店物品
    if (URL.pathname == "/getthings") {
        fs.readFile('./shop.json', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/plain,charset=utf-8' });
            res.end(data)
        })
    }
    // 购买物品
    if (URL.pathname == "/buything") {
        let name = URL.query.name;
        let index = URL.query.index;
        let things = {};
        fs.readFile(`./shop.json`, function (err, data) {
            let thingsJson = JSON.parse(data.toString());
            things = thingsJson.wp[index];
            fs.readFile(`./user/${name}.json`, function (err, userbuffer) {
                let userJson = JSON.parse(userbuffer.toString());
                let star = userJson.star;
                if (star >= things.price) {
                    userJson.star = star - things.price;
                    userJson.thing.push(things);
                    let str = JSON.stringify(userJson);
                    fs.writeFileSync(`./user/${name}.json`, str);
                    res.writeHead(200, { 'Content-Type': 'text/plain,charset=utf-8' });
                    res.end('cg')
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain,charset=utf-8' });
                    res.end('sb')
                }
            })
        })
    }
    // 消费物品
    if (URL.pathname == "/usething") {
        let name = URL.query.name;
        let petindex = URL.query.petindex;  //宠物索引
        let thingindex = URL.query.thingindex;//物品索引
        fs.readFile(`./user/${name}.json`, function (err, data) {
            let userJson = JSON.parse(data.toString());
            //如果物品不是龙蛋
            if (userJson.thing[thingindex].jy != 'Uneatable') {

                userJson.pet[petindex].jy = parseInt(userJson.pet[petindex].jy) + parseInt(userJson.thing[thingindex].jy);  //使用物品，增加宠物经验
                userJson.thing.splice(thingindex, 1); //删除物品
            }
            if (userJson.thing.length == 0) {
                let str = JSON.stringify(userJson);
                fs.writeFileSync(`./user/${name}.json`, str);
                res.writeHead(200, { 'Content-Type': 'text/plain,charset=utf-8' });
                res.end()
                return
            }
            // 是龙蛋
            if (userJson.thing[thingindex].name == "Dragon Egg") {
                console.log('egg')
                userJson.thing.splice(thingindex, 1); //删除物品
                //随机生成宠物
                let dragJson
                if (Math.random() * 2 < 1) {
                    dragJson = {
                        "name": "two",
                        "jy": 0
                    }
                } else {
                    dragJson = {
                        "name": "one",
                        "jy": 0
                    }
                }
                userJson.pet.push(dragJson);
            }
            let str = JSON.stringify(userJson);
            fs.writeFileSync(`./user/${name}.json`, str);
            res.writeHead(200, { 'Content-Type': 'text/plain,charset=utf-8' });
            res.end()
        })

    }


})


app.listen(5004)
console.log('服务启动成功')
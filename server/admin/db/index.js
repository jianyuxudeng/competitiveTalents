const mysqle = require('mysql');

const mysql_query = function (info) {
    const db = {
        host: '106.14.113.100',
        user: 'root',
        password: '7P38jb1MJ65ab0gq',
        database: 'gamingArena',
        port:'3390'
    };
    const connection = mysqle.createConnection(db);
    connection.connect(function(err){
        if(err){
            console.log(err)
            console.log("connect error");
            return;
        }
    });
    if(info.data && typeof(info.data)!=="function"){
        connection.query(info.query, info.data, info.callback);
    }else{
        connection.query(info.query, info.callback);
    }
    connection.end();
};

module.exports = mysql_query;
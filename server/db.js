"use strict";
const sqlite3 = require('sqlite3').verbose();

class Db {
    constructor(file) {
        this.db = new sqlite3.Database(file);
        this.createTable();
    }

    createTable() {
        //const del = `DROP TABLE IF EXISTS user`
        const sql = `
            CREATE TABLE IF NOT EXISTS user (
                id integer PRIMARY KEY,
                name text,
                email text UNIQUE,
                user_pass text,
                is_admin integer,
                friends text)`
        return this.db.run(sql);
    }

    selectByEmail(email, callback) {
        return this.db.get(
            `SELECT * FROM user WHERE email = ?`,
            [email],function(err, row){
                callback(err, row)
            })
    }

    insertAdmin(user, callback) {
        return this.db.run(
            'INSERT INTO user (name,email,user_pass,is_admin) VALUES (?,?,?,?)',
            user, (err) => {
                callback(err)
            })
    }

    selectUser(id, callback) {
        return this.db.get(
          `SELECT * FROM user WHERE id = ?`,
          [id],function(err, rows){
            if(err){console.log(err);}
            if(rows){
                console.log('Запрошена полная информация на пользователя c id=' + id + ' : ');
                console.log(rows);
            }

            callback(err, rows)
        })
    }

    selectAllUsers(callback) {
        return this.db.all(`SELECT id, name FROM user`, function(err, rows){
            if(err){console.log(err);}
            // if(rows){
            //     console.log('Запрошен список следующих пользователей: ');
            //     rows.forEach(element => console.log(element));
            // }

            callback(err, rows)
        })
    }

    selectSearchUsers(name, callback) {
        return this.db.all(`SELECT id, name FROM user WHERE name LIKE '%` + name + `%'`, function(err, rows){
            if(err){console.log(err);}
            // if(rows){
            //     console.log('Произведен поиск следующих пользователей: ');
            //     rows.forEach(element => console.log(element));
            // }

            callback(err, rows)
        })
    }

    insert(user, callback) {
        return this.db.run(
            'INSERT INTO user (name,email,user_pass) VALUES (?,?,?)',
            user, (err) => {
                callback(err)
            })
    }

    addFriend(id, friendsId, callback) {
      if(friendsId == id) {
        console.log("Пользователь пытается добавить сам себя.");
        return;
      }

      this.getFriends(id, (err, users) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!users) return res.status(404).send('No user found.');
        if (users) {
          users = users.friends;

          if(users) {
            users = users.replace(/[{()}]/g, '');
            users = users.replace(/"/gi, '');
            users = users.split(','); // массив
            users = users.filter(element => element !== '');
          }else{
            users = [];
          }

          console.log('Получен список друзей: ' + users);

          let del = false;
          for(let k=0; k<users.length; k++) {
            if(users[k] == friendsId) {
              users.splice(k, 1);
              console.log('Друг с id: ' + friendsId + ' был удален.');
              del = true;
              break;
            }
          }

          if(!del) {
            users.push(friendsId);
            console.log('Друг с id: ' + friendsId + ' был добавлен.');
          }

          users = users.filter(function (item, pos) {
            return users.indexOf(item) == pos;
          });

          this.db.run(
            `UPDATE user SET friends = ? WHERE id = ?`,
            [users, id], function(err) {
              if (err) {return console.error(err.message);}
              console.log('Список друзей обновлен: ' + users);
            });

          return callback(users);
        }
      });
    }

    getFriends(id, callback) {
        return this.db.get(
            `SELECT friends FROM user WHERE id = ?`,
            [id], function(err, rows){
                if(err){console.log(err.message);}
                // if(rows){
                //     rows = Object.values(rows);
                //     console.log('Мои друзья: ' + rows);
                // }
                callback(err, rows)
            })
    }
}

module.exports = Db

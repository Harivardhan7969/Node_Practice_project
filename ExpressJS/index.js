const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes.js');

const app = express();
app.use('/', routes);
app.use(bodyParser.json());

const pool = require('./db');

async function connectdb() {
    await pool.connect();
    // await pool.query('create table TrisunEmployees3(id SERIAL, name VARCHAR,email VARCHAR,salary integer)')
    // await pool.query(`insert into trisunemployees3 values(3,'ravi','ravi@gmail.com',15000)`);
    //await pool.query(`update trisunemployees3 set  name='rani' where id=2`);
    // await pool.query(`delete from trisunemployees3 where id=3`);
   // console.log(await pool.query(`select * from TrisunEmployees3`));

}

connectdb();



app.listen(3000);
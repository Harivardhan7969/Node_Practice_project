const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');
const { initQuery } = require("./queries.js");
const router = require('./routes.js');

const app = express();
app.use(bodyParser.json());

initQuery().then().catch();

// async function connectDb() {
//     await pool.connect();
//     // await pool.query(`CREATE TABLE "TrisunEmployees" ("id" SERIAL,name VARCHAR(255), salary INTEGER )`)
//     // await pool.query(`INSERT INTO TrisunEmployees (id, name)
//     //   VALUES ($1, $hari)`);
//     // await pool.query(`select * from "TrisunEmployees"`);
//     console.log(pool.query(`select * from "TrisunEmployees"`));
// }

// connectDb();

app.use('/', router);


app.listen(3000);
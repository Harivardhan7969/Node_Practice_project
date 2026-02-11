const pool = require("./db.js");


const initQuery = async () => {
    const createQuery = `CREATE TABLE IF NOT EXISTS "employees2"("id" SERIAL,"name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,"role" VARCHAR(255) NOT NULL,
    "password" VARCHAR NOT NULL)`;
    try {
        console.log("1st connect");
        await pool.connect();
        console.log("connected");
        await pool.query(createQuery);
        console.log('initialized');
    } catch (error) {
        console.log("Failed to cretate table");
    }
}

const createEmployee = async (values) => {
    const createEmployee = `INSERT INTO employees2 (name,email,role,password)VALUES($1,$2,$3,$4) RETURNING *`;
    try {
        const response = await pool.query(createEmployee, values);
        console.log('created employee');
        return response.rows[0];
    } catch (error) {

        console.log('failed to create employee');
        console.log(error);
        return error;
    }
}
const getEmployees = async () => {
    const getEmployeesQuery = 'SELECT * FROM employees2';
    try {
        const response = await pool.query(getEmployeesQuery);
        return response.rows;
    } catch (error) {
        return error;
    }
}

const getEmployeeById = async (value) => {
    const getEmpByIdQuery = `SELECT * FROM employees2 WHERE id = $1 `;
    try {
        const response = await pool.query(getEmpByIdQuery, value);
        console.log(response);
        return response.rows[0];
    } catch (error) {
        return error;
    }
}

const getEmployeeByEmail = async (value) => {
    const getEmpByEmailQuery = `SELECT * FROM employees2 WHERE email = $1 `;
    try {
        const response = await pool.query(getEmpByEmailQuery, value);       
            return response.rows[0];      

    } catch (error) {
        console.log(error);
        console.log("Error");
        return error;
    }
}


const updateEmployee = async (values) => {
    const updateEmployeeQuery = `UPDATE employees2 SET name = $1, email = $2, role = $3, password = $4 WHERE id = $5`;
    try {
        const response = await pool.query(updateEmployeeQuery, values);
        console.log(response);
        console.log("updated");
        return response;
    } catch (error) {
        return error;
    }

}

const deleteEmployee = async (value) => {
    const deleteEmployeeQuery = `DELETE FROM employees2 WHERE id = $1`;
    try {
        const response = await pool.query(deleteEmployeeQuery, value);
        console.log("deleted");
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        return error;
    }
}


module.exports = { initQuery, createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee, getEmployeeByEmail };
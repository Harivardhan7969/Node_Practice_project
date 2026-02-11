const pool = require('./db.js')

const getEmployees = async () => {
    const query = {
        text: 'SELECT * FROM TrisunEmployees3', // assuming you want to retrieve data from the "TrisunEmployees3" table
    };
    pool.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching data' });
        }
        return result.rows;
    })
}


module.exports = { getEmployees }
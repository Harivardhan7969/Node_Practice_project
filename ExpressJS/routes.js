const express = require('express');
const router = express.Router();

const pool = require('./db.js');

const bodyParser = require('body-parser');
const { getEmployees } = require('./queries.js')

router.use(bodyParser.json());


router.post('/insert-data', (req, res) => {
    const { name, email, salary } = req.body; // assuming you want to insert name and email and salary
    const query = {
        text: `INSERT INTO TrisunEmployees3 (name, email,salary) VALUES ($1, $2, $3) RETURNING *`,
        values: [name, email, salary]

    };
    pool.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error inserting data' });
        }
        res.json(result.rows[0]);
    });
});

router.get('/get-data', (req, res) => {


    const query = {
        text: 'SELECT * FROM TrisunEmployees3', // assuming you want to retrieve data from the "TrisunEmployees3" table
    };
    pool.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching data' });
        }
        res.json(result.rows);
    });
});

router.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM TrisunEmployees3 WHERE id = $1`;

    pool.query(query, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result.rows[0]);
        }
    });
});

router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const { name, email, salary } = req.body;
    const query = `UPDATE TrisunEmployees3 SET name = $1, email = $2, salary = $3 WHERE id = $4 RETURNING *`;
    pool.query(query, [name, email, salary, id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result.rows[0]);
        }
    });
});

router.delete('/delete-data/:id', (req, res) => {
    const id = req.params.id;
    const query = {
        text: 'DELETE FROM TrisunEmployees3 WHERE id = $1', // assuming you want to delete data from the "users" table
        values: [id],
    };
    pool.query(query, (err, result) => {
        if (result) {
            return res.status(500).json({ message: 'Data deleted successfully' });
        } else if (err) {
            return res.json({ message: 'Error in deleteing data' });
        }
        //res.json({ message: 'Data deleted successfully' });
    });
});


router.get('/', (req, res) => {
    res.end('express js with get  request')
})
router.get('/user', (req, res) => {
    res.end(' user get  request')
})

router.post('/user', (req, res) => {
    console.log(req.body);
    res.send(req.body);
})

router.put('/user', (req, res) => {
    res.send('put request');
})
router.delete('/user', (req, res) => {
    res.send('delete request');
})
router.get('*', (req, res) => {
    res.send('404 found');
})

module.exports = router;
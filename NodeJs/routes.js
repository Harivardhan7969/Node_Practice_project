const express = require('express');
const router = express.Router();
const { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee, getEmployeeByEmail } = require('./queries.js');
const bcrypt = require('bcrypt');
const pool = require("./db.js");
const session = require('express-session');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const password = 's0/\/\P4$$w0rD';
router.use(express.json());
router.use(session({
    secret: 'abcdef',
    resave: false,
    saveUninitialized: false
}));
router.get('/', (req, res) => {
    res.send('Express router lication');
});
router.post('/employees', (req, res) => {
    let { name, email, role, password } = req.body;
    bcrypt.hash(password, saltRounds, function (err, hash) {

        createEmployee([name, email, role, hash]).then(dbresponse =>
            res.send(dbresponse)
        ).catch((error) => {
            console.log("inside post error");
            console.log(error);
            res.send(error);
        })
    });
});

router.post('/logout', (req, res) => {
    const { email } = req.body;
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send('Logged out successfully');
        }
    });
});
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    getEmployeeByEmail([email]).then((dbresponse) => {
        console.log(dbresponse);
        //res.send(dbresponse);
        if (dbresponse.email === email) {
            console.log("inside if");
            const hashedPassword = dbresponse.password;
            bcrypt.compare(password, hashedPassword, (err, isValid) => {
                if (isValid) {
                    console.log("inside password hashing");
                    const privateKey = "password";
                    const token = jwt.sign({ username: "hari" }, privateKey, { expiresIn: 60 * 60 });
                    res.send({
                        message: "logged in successfully", token
                    });
                } else {
                    res.send({ message: "password invalid" })
                }
            });
        } else {
            res.send({ message: "email invalid" })
        }
    }).catch(error => {
        console.log("Error: " + error);
        res.send(error);
    })

    // pool.query('SELECT * FROM employees2 WHERE email = $1', [email], (err, result) => {

    //     if (result.rows.length === 1) {
    //         const hashedPassword = result.rows[0].password;
    //         bcrypt.compare(password, hashedPassword, (err, isValid) => {
    //             if (isValid) {
    //                 const privateKey = "password";
    //                 const token = jwt.sign({ username: "hari" }, privateKey, { expiresIn: 60 * 60 });
    //                 res.send({
    //                     message: "logged in successfully", token
    //                 });
    //             } else {
    //                 res.send({ message: "password invalid" })
    //             }
    //         });
    //     } else {
    //         res.send({ message: "email invalid" })
    //     }


    // if (err) {
    //     res.status(500).send(err);
    // } else if (result.rows.length === 0) {
    //     console.log("result" + result);
    //     console.log("response" + res);
    //     res.status(401).send('email incorrect');
    // } else {
    //     const hashedPassword = result.rows[0].password;
    //     bcrypt.compare(password, hashedPassword, (err, isValid) => {
    //         if (err) {
    //             res.status(500).send(err);
    //         } else if (!isValid) {
    //             res.status(401).send('password incorrect');
    //         } else {
    //             const privateKey = "password";
    //             const token = jwt.sign({ username: "hari" },  privateKey,{ expiresIn: 60 * 60 });
    //             console.log(res);
    //             res.send({
    //                 message: "logged in successfully", token
    //             });
    //         }             
    //     });
    // }


    //});
});

router.get('/employees', (req, res) => {
    getEmployees().then(dbres => {
        console.log(dbres);
        res.send(dbres)
    }
    ).catch(error => {
        console.log("Error: " + error);
        res.send(error);
    })
})
router.get('/employees/:id', (req, res) => {
    const id = req.params.id;
    getEmployeeById([id]).then((dbresponse) => {
        console.log(dbresponse);
        res.send(dbresponse)
    }
    ).catch(error => {
        console.log("Error: " + error);
        res.send(error);
    })
})
router.put('/employees/:id', (req, res) => {
    const id = req.params.id;
    let { name, email, role, password } = req.body;
    updateEmployee([name, email, role, password, id]).then(
        (dbresponse) => {
            if (dbresponse.rowCount === 1) {
                res.send({ message: "updated successfully" });
            } else {
                res.send({ message: `id ${id} employee not available` });
            }
        }
    ).catch((error) => {
        console.log("inside put error");
        console.log(error);
        res.send(error);
    })

})
router.delete('/employees/:id', (req, res) => {
    const id = req.params.id;
    deleteEmployee([id]).then(dbresponse => {
        if (dbresponse.rowCount === 1) {
            res.send({ message: "deleted successfully" })
        } else {
            res.send({ message: "failed to delete" })
        }
    }
    ).catch(error => {
        console.log("Error: " + error);
        res.send(error);
    })
})


router.get('*', (req, res) => {
    res.send("404 not found");
});

module.exports = router;
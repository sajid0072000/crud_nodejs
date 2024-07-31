const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config');

const app = express();
app.use(bodyParser.json());

const port = 3000;
// Create new user
app.post('/createUser', async (req, res) => {
    try {
        const { name, email } = req.body;
        const sql = 'INSERT INTO user (name, email) VALUES (?, ?)';
        db.query(sql, [name, email], (err, result) => {
            if (err) {
                throw err;
            }
            res.send('User added successfully');
        });
    } catch (error) {
        res.status(500).send(`Error adding user: ${error.message}`);
    }
});

// getAll Users
app.post('/getallUsers', async (req, res) => {
    try {
        const sql = 'SELECT id AS userId,name,email FROM user';
        db.query(sql, (err, results) => {
            if (err) {
                throw err;
            }
            res.json(results);
        });
    } catch (error) {
        res.status(500).send(`Error fetching users: ${error.message}`);
    }
});

// get Indiviudal User BY ID
app.post('/getUser', async (req, res) => {
    try {
        const id  = req.body.id;
        const sql = 'SELECT * FROM user WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) {
                throw err;
            }
            res.json(result[0]);
        });
    } catch (error) {
        res.status(500).send(`Error fetching user: ${error.message}`);
    }
});

// Update a user by ID
app.post('/updateUser', async (req, res) => {
    try {
        const value = [req.body.name,req.body.email,req.body.id];
        const { name, email } = req.body;
        const sql = 'UPDATE user SET name = ?, email = ? WHERE id = ?';
        db.query(sql,value, (err, result) => {
            if (err) {
                throw err;
            }
            res.send('User updated successfully');
        });
    } catch (error) {
        res.status(500).send(`Error updating user: ${error.message}`);
    }
});

// Delete a user by ID
app.post('/deleteUser', async (req, res) => {
    try {
        const id  = req.body.id;
        const sql = 'DELETE FROM user WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) {
                throw err;
            }
            res.send('User deleted successfully');
        });
    } catch (error) {
        res.status(500).send(`Error deleting user: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

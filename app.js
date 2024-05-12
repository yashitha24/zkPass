const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 8080;

const path = require('path');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'web')));



// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'yashitha',
    password: 'password',
    database: 'sample'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());

// Registration route
app.post('/register', (req, res) => {
    const { name, dob, address, password, ethereumId } = req.body;
    
    // Insert user data into the database
    const query = `INSERT INTO users (name, dob, address, password, ethereumId) VALUES (?, ?, ?, ?, ?)`;
    connection.query(query, [name, dob, address, password, ethereumId], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Registration failed' });
            return;
        }
        
        const userId = results.insertId;
        res.json({ userId, ethereumId });
    });
});

// Login route for age-gated service
app.post('/age-gated-login', (req, res) => {
    const { userId, ethereumId } = req.body;
    
    // Fetch user from the database based on userId and ethereumId
    const query = `SELECT dob FROM users WHERE userId = ? AND ethereumId = ?`;
    connection.query(query, [userId, ethereumId], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Login failed' });
            return;
        }
        
        if (results.length === 0) {
            res.json({ message: 'User not found or details do not match' });
            return;
        }

        const userDob = results[0].dob;
        const userAge = calculateAge(userDob);

        if (userAge >= 21) {
            res.json({ message: 'Login successful for age-gated service' });
        } else {
            res.json({ message: 'You are not above 21' });
        }
    });
});

// Login route for non-age gated service
app.post('/non-age-gated-login', (req, res) => {
    const { userId, ethereumId } = req.body;
    
    // Fetch user from the database based on userId and ethereumId
    const query = `SELECT * FROM users WHERE userId = ? AND ethereumId = ?`;
    connection.query(query, [userId, ethereumId], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Login failed' });
            return;
        }
        
        if (results.length === 0) {
            res.json({ message: 'User not found or details do not match' });
            return;
        }

        res.json({ message: 'Login successful for non-age gated service' });
    });
});

// Function to calculate age based on date of birth
function calculateAge(dob) {
    const dobDate = new Date(dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dobDate.getFullYear();
    const dobMonth = dobDate.getMonth();
    const currentMonth = currentDate.getMonth();
    if (currentMonth < dobMonth || (currentMonth === dobMonth && currentDate.getDate() < dobDate.getDate())) {
        age--;
    }
    return age;
}

app.listen(port, () => {
    console.log(`Server is listening on port:  http://127.0.0.1:${port}`);
});
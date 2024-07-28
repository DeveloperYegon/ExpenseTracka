const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');

dotenv.config();
app.use(express.json());
app.use(cors());


// Serve a static HTML file from the root path
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });


// country api
app.get("/api/countries", async (req, res) => {
    try {
        const response = await fetch("https://restcountries.eu/rest/v2/all");
        const data = await response.json();
        //GET https://countryapi.io/api/all
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});

// Database connection
const db = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
});

// Test connection
db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Connected to database, ${db.threadId}`);
        
        // Create database
        db.query(`CREATE DATABASE IF NOT EXISTS Expense2024`, (err, result) => {
            if (err) {
                console.log(`Error creating database, ${err}`);
            } else {
                console.log(`Database created successfully, ${result}`);
                
                // Use database
                db.changeUser({ database: "Expense2024" }, (err) => {
                    if (err) {
                        console.log(`Error using database, ${err}`);
                    } else {
                        console.log(`Database changed successfully`);
                        
                        // Create categories table
                        const categoriestable = `
                            CREATE TABLE IF NOT EXISTS categories(
                                category_id INT PRIMARY KEY AUTO_INCREMENT,
                                category_name VARCHAR(100) NOT NULL
                            )`;
                        db.query(categoriestable, (err, result) => {
                            if (err) {
                                console.log(`Error creating table, ${err}`);
                            } else {
                                console.log(`Categories Table created successfully, ${result}`);
                                
                                // Create expenses table
                                const expensestable = `
                                    CREATE TABLE IF NOT EXISTS expenses (
                                        id INT PRIMARY KEY AUTO_INCREMENT,
                                        item VARCHAR(100) NOT NULL,
                                        amount INT NOT NULL,
                                        date DATE NOT NULL,
                                        category_id INT NOT NULL,
                                        FOREIGN KEY (category_id) REFERENCES categories(category_id)
                                    )`;
                                db.query(expensestable, (err, result) => {
                                    if (err) {
                                        console.log(`Error creating table: ${err}`);
                                    } else {
                                        console.log(`Expenses Table created successfully: ${result}`);
                                    }
                                });
                            }
                        });

                        // Create users table
                        const userstable = `
                            CREATE TABLE IF NOT EXISTS users(
                                id INT PRIMARY KEY AUTO_INCREMENT,
                                first_name VARCHAR(100) NOT NULL,
                                last_name VARCHAR(100) NOT NULL,
                                email VARCHAR(100) UNIQUE NOT NULL,
                                password VARCHAR(100) NOT NULL
                            )`;
                        db.query(userstable, (err, result) => {
                            if (err) {
                                console.log(`Error creating table, ${err}`);
                            } else {
                                console.log(`Users Table created successfully, ${result}`);
                            }
                        });
                    }
                });
            }
        });
    }
    });

        // Register user
        app.post("/api/register", async (req, res) => {
            const { first_name, last_name, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            db.query(
                `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`,
                [first_name, last_name, email, hashedPassword],
                (err, result) => {
                    if (err) {
                        console.log(`Error registering user, ${err}`);
                        res.status(500).send("Error registering user");
                    } else {
                        console.log(`User registered successfully, ${result}`);
                        res.status(200).send("User registered successfully");
                    }
                }
            );
        });
        //login user
        app.post("/api/login", async (req, res) => {
            const { email, password } = req.body;
            db.query(
                `SELECT * FROM users WHERE email = ?`,
                [email],
                async (err, result) => {
                    if (err) {
                        console.log(`Error logging in user, ${err}`);
                        res.status(500).send("Error logging in user");
                    } else {
                        if (result.length > 0) {
                            const user = result[0];
                            const validPassword = await bcrypt.compare(password, user.password);
                            if (validPassword) {
                                res.json({ success: true, message: 'Login successful!' });
                            } else {
                                res.json({ success: false, message: 'Invalid email or password.' });
                            }
                        } else {
                            res.status(401).send("User does not exist");
                        }
                    }
                }
            );
        });

        
app.listen(3002, () => {
    console.log("Server is running on port 3002");
});

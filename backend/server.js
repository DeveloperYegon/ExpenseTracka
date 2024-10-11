const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const { initializeTables } = require('./tables.js');
const cors = require("cors");
const jwt = require('jsonwebtoken'); // Import JWT
const path = require("path");
const bodyParser = require('body-parser');
const session = require('express-session');
//const morgan = require('morgan');
const {check, validationResult} = require('express-validator');


//initialize app
const app = express();

//middleware
//app.use(morgan('combined'));//morgan for logging
dotenv.config();
app.use(cors());

// Parse URL-encoded bodies (as sent by HTML forms) to handle incoming POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Serve static files (e.g., HTML and CSS files)
app.use(express.static(path.join(__dirname, "../frontend")));

//Serve a static HTML file from the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});
// Define routes

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/register.html'));
});
app.get("/contact", (request, response) => {
    response.sendFile(path.join(__dirname, "../frontend/contact.html"));
});
app.get("/newsletter", (request, response) => {
    response.sendFile(path.join(__dirname, "../frontend/newsletter.html"));
}
);

//configure session middleware
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }//true in production
}));

// Middleware to verify JWT
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Format: 'Bearer <token>'
    
    if (!token) {
        return res.status(403).json({ success: false, message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
        }
        
        req.user = user; // Save user information for later use
        next();
    });
}

// Example protected route
app.get('/protected-route', authenticateToken, (req, res) => {
    res.json({ success: true, message: 'This is a protected route', user: req.user });
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
        console.log("Error connecting to database");
    } else {
        console.log(`Connected to database successfully`);
    }
});

        // Create database
        db.query(`CREATE DATABASE IF NOT EXISTS Expense2024`, (err, result) => {
            if (err) {
                console.error(`Error creating database: ${err.message}`);
            } else {
                console.log(`Expense2024 Database created successfully `);
                
                // Use database
                db.changeUser({ database: "Expense2024" }, (err) => {
                    if (err) {
                        console.error(`Error using database Expense2024: ${err.message}`);
                    } else {
                        console.log(`Database changed successfully to Expense2024`);
                        initializeTables(db);
                    }
                });
            }
        });

    
        // Register user
        app.post("/register",[
            check("email").isEmail().withMessage("Please provide email"),
            check("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
            //custom check uniqueness
            check("email").custom((value) => {
                return new Promise((resolve, reject) => {
                    User.getUserByEmail(value, (err, user) => {
                        if (err) {
                            reject(new Error('Server Error'));
                        }
                        if (user && user.length > 0) {
                            reject(new Error('Email already in use'));
                        }
                        resolve(true);
                    });
                });
            })
        ], async (req, res) => {
            try{
                const { name,email, password,terms,country} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            db.query(
                `INSERT INTO users (name, email, password,terms_accepted,country) VALUES (?, ?, ?,?,?)`,
                [name,email, hashedPassword,terms,country],
                (err, result) => {
                    if (err) {
                        console.error(`Error registering admin: ${err}`);
                        return res.status(400).send('Error registering admin');
                    } else {
                        return res.status(201).send('Admin registered successfully');
                    }
                });

            }catch (error) {
            console.error(`Error in registration: ${err}`);
            return res.status(500).send('Internal Server Error');
            }
        });


        //login user
        app.post("/login", async (req, res) => {
            const { email, password } = req.body;
            db.query(
                `SELECT * FROM users WHERE email = ?`,
                [email],
                async (err, result) => {
                    try {
                        if (err) {
                            console.error("Error logging in user:", err);
                            return res.status(500).json({ success: false, message: "Internal server error" });
                        }
                
                        if (result.length === 0) {
                            return res.status(401).json({ success: false, message: "Invalid credentials" });
                        }
                
                        const user = result[0];
                        const validPassword = await bcrypt.compare(password, user.password);
                
                        if (!validPassword) {
                            return res.status(401).json({ success: false, message: "Invalid credentials" });
                        }
                
                        // Create a JWT token if the login is successful
                        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                
                        return res.status(200).json({ success: true, message: "Login successful", token });
                    
                    } catch (error) {
                        console.error(`Error logging in user: ${err}`);
                        return res.status(500).send('Internal Server Error');
                        
                    }
                   
                });
        });

        //newsletter subscription
        app.post("/newsletter", async (req, res) => {
            
            const { email,terms } = req.body;
            const termsValue = terms === true ? 1 : 0; // If terms is true, set to 1; otherwise, set to 0
            db.query(
                `INSERT INTO newsletter (email,terms) VALUES (?,?)`,
                [email,termsValue],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({ success: false, message: 'User Already subscribed!!' });
                    } else {
                        return res.status(200).json({ success: true, message: 'User subscriped successfully' });
                    }
                }
            );
        });

        //inserting contact form
        app.post("/requests", async (req, res) => {
            const { name, email, message,country } = req.body;
            db.query(
                `INSERT INTO contact (full_name, email, message,country) VALUES (?, ?,?, ?)`,
                [name, email, message,country],
                (err, result) => {
                    if (err) {
                        return res.status(400).json({ success: false, message: 'Error sending message' });
                    } else {
                        return res.status(200).json({ success: true, message: 'Message sent successfully' });
                    }
                }
            );
        });

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        db.end(() => {
            console.log('Database connection closed');
        });
    });
});

        
app.listen(3003, () => {
    console.log("Server is running on port 3003");
});
